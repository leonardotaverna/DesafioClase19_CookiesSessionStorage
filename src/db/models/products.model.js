import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true, 
        index: true
    },
    
    description: {
        type: String,
        required: true,
        unique: true
    },
    
    price:{
        type: Number,
        required: true
    },
    
    thumbnail:{
        type: String,
        unique: true
    },
    
    code:{
        type: String,
        required: true,
        unique: true,
        index: true
    },
    
    stock:{
        type: Number,
        required: true,
        default: 0
    },

})

productsSchema.plugin(mongoosePaginate)

export const productsModel = mongoose.model('Products', productsSchema)