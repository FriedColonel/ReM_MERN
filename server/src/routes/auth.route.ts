import express from 'express'
import { getCurrentUser, login, logout, refresh } from '~/controllers/auth.controller'
import loginLimiter from '~/middleware/loginLimiter'
import verifyJWT from '~/middleware/verifyJWT'

const router = express.Router()

router.route('/').post(loginLimiter, login)

router.route('/me').get(getCurrentUser)

router.route('/refresh').get(refresh)

router.route('/logout').post(logout)

export default router
