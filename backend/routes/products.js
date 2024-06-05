import {ProductModel} from "../models/products.js";
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

export {router as productRouter}
