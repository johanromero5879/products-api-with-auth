import express, { json } from "express"
import morgan from "morgan"
import pkg from "../package.json"

import { createRoles } from "./libs/initialSetup"

import productsRoutes from "./routes/products.routes"
import authRoutes from "./routes/auth.routes"
import userRoutes from "./routes/user.routes"

const app = express()
createRoles()

app.set('pkg', pkg)
app.set('port', process.env.PORT || 3000)

/**
 * Middlewares
 */
app.use(morgan('dev'))
app.use(json())

/**
 * Routes
 */

app.get("/", (req, res) => {
    const { name, author, description, version } = app.get("pkg")
    res.json({ name, author, description, version })
})


app.use('/api/products', productsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

export default app

