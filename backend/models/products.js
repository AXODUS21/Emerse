import mongoose, { mongo } from "mongoose";

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    ratings:{
        type:Number,
        required: true
    },
    imageURL:{
        type:String,
        required: true
    }
})

export const ProductModel = mongoose.model("products", ProductSchema)