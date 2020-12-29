import { Router } from "express"
import { signin, signup } from "../controllers/auth.controller"
import { verifySignup } from "../middlewares"

const router = Router()

router.post('/signup', [
    verifySignup.checkExistedRoles,
    verifySignup.checkDuplicateUsernameOrEmail
], signup)


router.post('/signin', signin)

export default router