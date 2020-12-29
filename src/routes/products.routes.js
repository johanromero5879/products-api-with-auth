import { Router } from "express"
import { authJwt } from "../middlewares"

import {
 createProduct,
 deleteProductById,
 getProductById,
 getProducts,
 updateProductById
} from "../controllers/products.controller"

const router = Router()

router.route('/')
    .post([authJwt.verifyToken, authJwt.isModerator], createProduct)
    .get(getProducts)

router.route("/:id")
    .get(getProductById)
    .put([authJwt.verifyToken, authJwt.isAdmin], updateProductById)
    .delete([authJwt.verifyToken, authJwt.isAdmin], deleteProductById)

export default router