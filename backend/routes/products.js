import {ProductModel} from "../models/products.js";
import {UserModel} from "../models/user.js";
import express from "express"
import mongoose from "mongoose";

const router = express.Router()

router.get("/", async (req,res) => {
    try{
        const response = await ProductModel.find({})
        res.json(response)
    } catch (err){
        console.log(err)
    }
})
router.post("/", async (req,res) => {
    const product = new ProductModel(req.body);
    try{
        const response = await product.save()
        res.json(response)
    }catch(err){
        console.log(err)
    }
})
router.put("/", async (req,res) => {
    try{
        const product = await ProductModel.findById(req.body.id);
        const user = await UserModel.findById(req.body.userID);
        user.userCart.push(product)
        await user.save()
        res.json({userCart: user.userCart})
    } catch (err){
        console.log(err)
    }
})
router.put("/number", async (req,res) => {
    try{
        const user = await UserModel.findById(req.body.userId);
        const number = req.body.number
        user.contactNumber = number
        await user.save()
        res.json({contactNumber: user.contactNumber})
    } catch (err){
        console.log(err)
    }
})
router.put("/address", async (req,res) => {
    try{
        const user = await UserModel.findById(req.body.userId);
        const address = req.body.address
        user.address = address
        await user.save()
        res.json({address: user.address})
    } catch (err){
        console.log(err)
    }
})

export {router as productRouter}
