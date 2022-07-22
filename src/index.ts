import express, { Application, Request, Response } from 'express'
import morgan from 'morgan';
import helmet from 'helmet';
import  { rateLimit } from 'express-rate-limit'
import errorMiddleware from './middleware/error.middleware';

const app : Application= express();

app.use(express.json())

app.use(morgan('common'))

app.use(helmet())

app.use(
    rateLimit({
        windowMs: 60 * 1000, // 15 minutes
        max: 2, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers  
        message: "to many requests"  
}))

app.get('/', (req:Request,res:Response)=>{
    throw new Error('Error exist')
    res.json({
        message:"hello world"
    })
})

app.post('/',(req:Request, res:Response) => {
    res.json({
        message: "hello world from post",
        data:req.body
    })
})

app.use(errorMiddleware)

app.use((_req:Request,res:Response) =>{
    res.json({
        message:"you are lost, check out the API documentation"
    })
})

app.listen(3000,() => {
    console.log('Listening on port 3000')
})

export default app;