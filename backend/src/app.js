import express from 'express'
import cors from 'cors'
import adminRouter from './routes/admin.routes.js'
import productRouter from './routes/product.routes.js'
import billRouter from './routes/bill.routes.js'

const app = express()

app.use(cors({
    origin: process.env.ORIGIN_CORS || "*",
    credentials: true 
}))

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/admin", adminRouter);
app.use("/product", productRouter);
app.use("/bill", billRouter);

export { app }