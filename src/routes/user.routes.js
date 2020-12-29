import { Router } from "express"
import { createUser } from "../controllers/user.controller"
import { authJwt, verifySignup } from "../middlewares"

const router = Router()

router.route("/")
    .post([
        authJwt.verifyToken, 
        authJwt.isAdmin, 
        verifySignup.checkExistedRoles,
        verifySignup.checkDuplicateUsernameOrEmail
    ], createUser)

export default router