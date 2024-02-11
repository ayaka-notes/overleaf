#! /bin/bash

# Wrap chktex with ulimit
# Usage:
#   run-chktex.sh <orig_dir> <target_file>


function _main () {
    if [[ "$#" -lt "2" ]]; then
        echo ">> Error: too few arguments"
        echo ">> Usage: run-chktex.sh <orig_dir> <target_file> <opts...>"
        exit 1
    fi
    orig_dir="$1"
    target_file="$2"

    # set ulimit
    if [[ "${CHKTEX_ULIMIT_OPTIONS}" ]]; then
        ulimit -SH ${CHKTEX_ULIMIT_OPTIONS}
    fi

    # run chktex (note: bash magic $'...\n' to embed newline in string, chktex does not interpret \n itself)
    chktex -b0 -f $'%f:%l:%c: %k: %m %r%s%t\n' -o "$orig_dir/output.chktex" ${CHKTEX_OPTIONS} "$target_file"
    chktex_exit_code="$?"
    echo "chktex exit: $?"
    exit $chktex_exit_code
}


_main "$@"
