let TrackChangesController
const ChatApiHandler = require('../../../../app/src/Features/Chat/ChatApiHandler')
const EditorRealTimeController = require('../../../../app/src/Features/Editor/EditorRealTimeController')
const SessionManager = require('../../../../app/src/Features/Authentication/SessionManager')
const UserInfoManager = require('../../../../app/src/Features/User/UserInfoManager')
const UserInfoController = require('../../../../app/src/Features/User/UserInfoController')
const async = require('async')

module.exports = TrackChangesController = {
    sendComment(req, res, next) {
        const { project_id, thread_id } = req.params
        const { content } = req.body
        const user_id = SessionManager.getLoggedInUserId(req.session)
        if (user_id == null) {
            const err = new Error('no logged-in user')
            return next(err)
        }

        return ChatApiHandler.sendComment(
            project_id,
            thread_id,
            user_id,
            content,
            function (err, message) {
                if (err != null) {
                    return next(err)
                }
                return UserInfoManager.getPersonalInfo(
                    user_id,
                    function (err, user) {
                        if (err != null) {
                            return next(err)
                        }
                        message.user = user
                        EditorRealTimeController.emitToRoom(
                            project_id,
                            'new-comment',
                            thread_id, message
                        )
                        return res.sendStatus(204)
                    }
                )
            }
        )
    },

    resolveThread(req, res, next) {
        const { project_id, thread_id } = req.params
        const { client_id } = req.body
        const user_id = SessionManager.getLoggedInUserId(req.session)
        if (user_id == null) {
            const err = new Error('no logged-in user')
            return next(err)
        }
        return ChatApiHandler.resolveThread(
            project_id,
            thread_id,
            user_id,
            function (err, message) {
                if (err != null) {
                    return next(err)
                }
                return UserInfoManager.getPersonalInfo(
                    user_id,
                    function (err, user) {
                        if (err != null) {
                            return next(err)
                        }
                        EditorRealTimeController.emitToRoom(
                            project_id,
                            'resolve-thread',
                            thread_id,
                            user
                        )
                        return res.sendStatus(204)
                    }
                )
            }
        )
    },

    reopenThread(req, res, next) {
        const { project_id, thread_id } = req.params
        const { client_id } = req.body
        const user_id = SessionManager.getLoggedInUserId(req.session)
        if (user_id == null) {
            const err = new Error('no logged-in user')
            return next(err)
        }
        return ChatApiHandler.reopenThread(
            project_id,
            thread_id,
            function (err, message) {
                if (err != null) {
                    return next(err)
                }
                return UserInfoManager.getPersonalInfo(
                    user_id,
                    function (err, user) {
                        if (err != null) {
                            return next(err)
                        }
                        EditorRealTimeController.emitToRoom(
                            project_id,
                            'reopen-thread',
                            thread_id
                        )
                        return res.sendStatus(204)
                    }
                )
            }
        )
    },

    deleteThread(req, res, next) {
        const { project_id, thread_id } = req.params
        const user_id = SessionManager.getLoggedInUserId(req.session)
        if (user_id == null) {
            const err = new Error('no logged-in user')
            return next(err)
        }

        return ChatApiHandler.deleteThread(
            project_id,
            thread_id,
            function (err, message) {
                if (err != null) {
                    return next(err)
                }
                EditorRealTimeController.emitToRoom(
                    project_id,
                    'delete-thread',
                    thread_id
                )
                return res.sendStatus(204)
            }
        )
    },

    editMessage(req, res, next) {
        const { project_id, thread_id, message_id } = req.params
        const { content, client_id } = req.body
        const user_id = SessionManager.getLoggedInUserId(req.session)
        if (user_id == null) {
            const err = new Error('no logged-in user')
            return next(err)
        }
        return ChatApiHandler.editMessage(
            project_id,
            thread_id,
            message_id,
            user_id,
            content,
            function (err, message) {
                if (err != null) {
                    return next(err)
                }
                EditorRealTimeController.emitToRoom(
                    project_id,
                    'edit-message',
                    thread_id,
                    message_id,
                    content
                )
                return res.sendStatus(204)
            }
        )
    },

    getThreads(req, res, next) {
        const { project_id } = req.params
        return ChatApiHandler.getThreads(
            project_id,
            function (err, messages) {
                if (err != null) {
                    return next(err)
                }
                return TrackChangesController._injectUserInfoIntoThreads(
                    messages,
                    function (err) {
                        if (err != null) {
                            return next(err)
                        }
                        return res.json(messages)
                    }
                )
            }
        )
    },

    deleteMessage(req, res, next) {
        const { project_id, thread_id, message_id } = req.params
        const { client_id } = req.body
        const user_id = SessionManager.getLoggedInUserId(req.session)
        if (user_id == null) {
            const err = new Error('no logged-in user')
            return next(err)
        }
        return ChatApiHandler.deleteMessage(
            project_id,
            thread_id,
            message_id,
            function (err, message) {
                if (err != null) {
                    return next(err)
                }
                EditorRealTimeController.emitToRoom(
                    project_id,
                    'delete-message',
                    thread_id,
                    message_id,
                )
                return res.sendStatus(204)
            }
        )
    },


    _injectUserInfoIntoThreads(threads, callback) {
        // There will be a lot of repitition of user_ids, so first build a list
        // of unique ones to perform db look ups on, then use these to populate the
        // user fields
        let message, thread, threadId, userId
        if (callback == null) {
            callback = function () { }
        }
        const userIds = {}
        for (threadId in threads) {
            thread = threads[threadId]
            if (thread.resolved) {
                userIds[thread.resolved_by_user_id] = true
            }
            for (message of Array.from(thread.messages)) {
                userIds[message.user_id] = true
            }
        }

        const jobs = []
        const users = {}
        for (userId in userIds) {
            const _ = userIds[userId]
                ; (userId =>
                    jobs.push(cb =>
                        UserInfoManager.getPersonalInfo(userId, function (error, user) {
                            if (error != null) return cb(error)
                            user = UserInfoController.formatPersonalInfo(user)
                            users[userId] = user
                            cb()
                        })
                    ))(userId)
        }

        return async.series(jobs, function (error) {
            if (error != null) {
                return callback(error)
            }
            for (threadId in threads) {
                thread = threads[threadId]
                if (thread.resolved) {
                    thread.resolved_by_user = users[thread.resolved_by_user_id]
                }
                for (message of Array.from(thread.messages)) {
                    message.user = users[message.user_id]
                }
            }
            return callback(null, threads)
        })
    },
}