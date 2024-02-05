const logger = require('@overleaf/logger')
const TrackChangesController = require('./TrackChangesController')
const AuthorizationMiddleware = require('../../../../app/src/Features/Authorization/AuthorizationMiddleware')


module.exports = {
    apply(webRouter) {
        logger.debug({}, 'Track Changes router')
        webRouter.get('/ayaka', (req, res) => {
            res.json({ message: 'Dev by ayaka-notes' })
        })

        // review apis
        // Thanks to ertuil for the following code
        webRouter.get(
            '/project/:project_id/threads',
            AuthorizationMiddleware.blockRestrictedUserFromProject,
            AuthorizationMiddleware.ensureUserCanReadProject,
            TrackChangesController.getThreads
        )

        webRouter.post(
            '/project/:project_id/thread/:thread_id/messages',
            AuthorizationMiddleware.blockRestrictedUserFromProject,
            AuthorizationMiddleware.ensureUserCanReadProject,
            TrackChangesController.sendComment
        )

        webRouter.post(
            '/project/:project_id/thread/:thread_id/resolve',
            AuthorizationMiddleware.blockRestrictedUserFromProject,
            AuthorizationMiddleware.ensureUserCanReadProject,
            TrackChangesController.resolveThread
        )

        webRouter.post(
            '/project/:project_id/thread/:thread_id/reopen',
            AuthorizationMiddleware.blockRestrictedUserFromProject,
            AuthorizationMiddleware.ensureUserCanReadProject,
            TrackChangesController.reopenThread
        )

        webRouter.post(
            '/project/:project_id/thread/:thread_id/messages/:message_id/edit',
            AuthorizationMiddleware.blockRestrictedUserFromProject,
            AuthorizationMiddleware.ensureUserCanReadProject,
            TrackChangesController.editMessage
        )

        webRouter.delete(
            '/project/:project_id/thread/:thread_id/messages/:message_id',
            AuthorizationMiddleware.blockRestrictedUserFromProject,
            AuthorizationMiddleware.ensureUserCanReadProject,
            TrackChangesController.deleteMessage
        )

        webRouter.delete(
            '/project/:project_id/thread/:thread_id',
            AuthorizationMiddleware.blockRestrictedUserFromProject,
            AuthorizationMiddleware.ensureUserCanReadProject,
            TrackChangesController.deleteThread
        )

        //review apis end

    }
}