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

router.get("/details/:productID", async (req,res) => {
    const productID = req.params.productID
    const product = await ProductModel.findById(productID)
    res.json({product: product})
})
export {router as productRouter}
