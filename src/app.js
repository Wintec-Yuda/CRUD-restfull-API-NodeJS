import express from 'express'
import router from './router/user.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(router)

const server = app.listen(port)

export { app, server }