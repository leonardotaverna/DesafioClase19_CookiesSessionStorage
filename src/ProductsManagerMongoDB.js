import { query } from 'express';
import { productsModel } from './db/models/products.model.js';


class ProductsManagerMongoDB {
    constructor(path) {
        this.path = path;
    }

    async getProducts(obj) {
        const {limit=10, page=1,sortPrice, ...query} = obj
        try {
            const prod = await productsModel.paginate(query, {limit,page,sort:{price:sortPrice}});
            const info = {
                status: 'success',
                payload: prod.docs,
                totalPages: prod.totalPages,
                prevPage: prod.hasPrevPage ? prod.prevPage : null,
                nextPage: prod.hasNextPage ? prod.nextPage : null,
                page: prod.page,
                hasPrevPage: prod.hasPrevPage,
                hasNextPage: prod.hasNextPage,
                prevLink: prod.hasPrevPage ? `/api/products?page=${prod.prevPage}` : null,
                nextLink: prod.hasNextPage ? `/api/products?page=${prod.nextPage}` : null,
            };
            return info;
        } catch (error) {
            return error
        }
    }

    async addProduct(obj) {
        try {
            const newProduct = await productsModel.create(obj)
            return newProduct
        } catch (error) {
            return error
        }
    }

    async getProductById(id) {
        try {
            const product = await productsModel.findById(id)
            return product
        } catch (error) {
            return error
        }
    }

    async updateProduct(id, objProd) {
        try {
            const product = await productsModel.findOneAndUpdate(id, objProd)
            return product
        } catch (error) {
            return error
        }
    }

    async deleteProduct(id) {
        try {
            const deleteProduct = await productsModel.findByIdAndDelete(id)
            return deleteProduct
        } catch (error) {
            return error
        };
    };
};

const productsManagerMongoDB = new ProductsManagerMongoDB()

export default productsManagerMongoDB