import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model";


const userModel = new UserModel();


export const create = async (req:Request, res: Response, next:NextFunction) =>{
    try{
        const user =  userModel.create(req.body)
        res.json({
            status:'success',
            data:{...user},
            message: 'user created successfully'
        })
    }
    catch(error){
        next(error)
    }
}