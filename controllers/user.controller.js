const express=require("express");
const app=express();
const apiResponse=require("../apiResponse/apiResponse");
const userModel=require("../models/userModel");
exports.createUser=async (req,res)=>{
    const {name,password,country} =req.body;
    const user = await userModel.create({name,password,country});
    return apiResponse.success(res,req,user)
}