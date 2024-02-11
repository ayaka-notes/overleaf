#!/usr/bin/env Rscript

require('stringr');

# Function adapted from https://github.com/EmmanuelCharpentier/patchSynctex
patchSynctex <-
function (nwfile, syncfile=NULL, verbose=FALSE, ...){
    ## require(tools)
    f=paste0(tools::file_path_sans_ext(nwfile), "-concordance.tex")
    if (!file.exists(f))
        stop(f,"-concordance.tex file not found.", call.=TRUE)
    text<-readChar(f, file.info(f)$size);
    text<-gsub(" \\%\\n"," ",text)
    ## require(stringr)
    ## re="\\\\Sconcordance\\{concordance:([^:]*):([^\\%]*):\\%\\r?\\n(\\d+)(( \\d+ \\d+)*)\\}";
    ## Daniel Hicks :
    re="\\\\Sconcordance\\{concordance:([^:]*):([^\\%]*):\\%\\r?\\n(\\d+ )((\\d+ \\d+[ \\}]\\%?\\r?\\n?)*)";
    parsed=str_match_all(text,re);
    for(i in seq(1,nrow(parsed[[1]]))){
        texF=parsed[[1]][i,2];
        rnwF=parsed[[1]][i,3];
        startLine=as.integer(parsed[[1]][i,4]);
        ## rleValues <- read.table(textConnection(parsed[[1]][i,5]));
        ## Daniel Hicks :
        ## Clean newlines and braces from the line concordance data
        parsedi5_clean <- gsub('[^[:digit:] ]', '', parsed[[1]][i,5])
        ## Coerce cleaned line concordance data to table of values
        rleValues <- read.table(textConnection(parsedi5_clean));
        rleO = rle(0);
        rleO$values=as.numeric(rleValues[seq(2,length(rleValues),2)]);
        rleO$lengths=as.integer(rleValues[seq(1,length(rleValues),2)]);
        diffs=inverse.rle(rleO);
        mapping_=c(startLine,startLine+cumsum(diffs[-1]));

        basename <- tools::file_path_sans_ext(rnwF);
        if(is.null(syncfile)) {
          syncF = paste0(basename,".synctex");
        } else {
          syncF = paste0(syncfile,".synctex");
        }

        compressed <- FALSE
        if (file.exists(syncF)) {
            sf=file(syncF);
        } else{
            syncF <- paste(syncF, ".gz", sep = "")
            if (file.exists(syncF)) {
                compressed <- TRUE
                sf <- gzfile(syncF);
            }
        }
        lines <- try(readLines(syncF, warn = FALSE), silent = TRUE)
        if (inherits(lines, "try-error"))
            stop(f, "cannot be read, no patching done.", call.=TRUE)
        close(sf)
        postemble =grep("^Postamble:",lines,perl=T)
        re=paste0("^Input:([^:]+):(.*", basename(texF), ")");
        toRepl=grep(re,lines[seq(1,postemble)],perl=T);
        inputs=str_match(lines[toRepl],re);
        if (length(inputs)>0){
            tag=inputs[,2];
            inputs[,3]=paste0(tools::file_path_sans_ext(inputs[,3]), ".Rtex"); ## CHANGED FROM .Rnw
            lines[toRepl]=paste0("Input:",inputs[,2],":",inputs[,3]);
            re=paste0("^([xkgvh\\$\\(\\[]", tag ,"\\,)(\\d+)([\\,:].*)");
            needReplacment=grep(re,lines[seq(1,postemble)],perl=T);
            toRepl=str_match(lines[needReplacment],re);
            toRepl[,3]=as.character(mapping_[as.integer(toRepl[,3])]);
            newlines=paste0(toRepl[,2],toRepl[,3],toRepl[,4]);
            lines[needReplacment]=newlines;
            if (!compressed) {
                sf=file(syncF,"wb");
            } else{
                sf <- gzfile(syncF,"wb");
            }
            writeLines(lines, sf, sep = "\n")
            close(sf);
            if (verbose) {
                message(length(needReplacment), " patches made to ",
                        syncF, appendLF=TRUE);
            }
        }else{
            warning(paste("No patches made to",syncF,"."));
        }
    }
}

### CLI argument parsing
args <- commandArgs(trailingOnly=TRUE);
sourceFile <- args[1];
outputFile <- args[2];
patchSynctex(sourceFile, syncfile=outputFile);
