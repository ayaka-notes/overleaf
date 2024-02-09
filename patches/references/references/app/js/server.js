import * as Metrics from '@overleaf/metrics'
import logger from '@overleaf/logger'
import express from 'express'
import bodyParser from 'body-parser'
// import * as HttpController from './HttpController.js'
import * as Errors from './Errors.js'
import bibtexParse from '@orcid/bibtex-parse-js'


logger.initialize('reference')
Metrics.event_loop?.monitor(logger)
Metrics.open_sockets.monitor()

export const app = express()
app.use(Metrics.http.monitor(logger))
Metrics.injectMetricsRoute(app)


app.get('/status', (req, res) => res.send('reference is alive'))

// url: `${settings.apis.references.url}/project/${projectId}/index`,
app.post('/project/:project_id/index',
  bodyParser.json(),
  (req, res) => {
    const projectId = req.params.project_id
    const { docUrls: docUrls } = req.body

    // 对 docUrls 发出请求
    fetch(docUrls)
      .then(res => res.text())
      .then(bibTex => {
        // logger.debug("这是什么" + bibTex);
        let result = bibtexParse.toJSON(bibTex);

        // logger.debug("这是什么" + JSON.stringify(result));

        // 遍历result，把每个entry的citationKey push到keys里
        let keys = [];
        for (let i = 0; i < result.length; i++) {
          if (result[i].citationKey)
            keys.push(result[i].citationKey);
        }

        // 返回给前端
        return res.json({
          projectId, keys: keys
        })
      });
  })

app.use(function (error, req, res, next) {
  logger.error({ err: error }, 'request errored')
  if (error instanceof Errors.NotFoundError) {
    return res.sendStatus(404)
  } else {
    return res.status(500).send('Oops, something went wrong')
  }
})
