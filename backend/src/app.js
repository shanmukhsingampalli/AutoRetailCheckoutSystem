import express from 'express'
import cors from 'cors'
import adminRouter from './routes/admin.routes.js'

const app = express()

app.use(cors({
    origin: process.env.ORIGIN_CORS || "*",
    credentials: true 
}))

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/admin", adminRouter);

export { app }