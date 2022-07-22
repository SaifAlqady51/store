import express, { Application, Request, Response } from 'express'

const app : Application= express();


app.get('/', (req:Request,res:Response)=>{
    res.send('HELLLLLLOOO')
})

app.listen(3000,() => {
    console.log('Listening on port 3000')
})

export default app;