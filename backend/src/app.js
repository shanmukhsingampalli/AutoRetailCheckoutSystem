import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors({
    origin: process.env.ORIGIN_CORS,
    credentials: true 
}))

app.use(
  session({
    secret: process.env.SESSION_SECRET || "replace-with-secure-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

export { app }