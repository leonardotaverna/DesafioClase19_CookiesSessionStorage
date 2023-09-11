import { cartsModel } from './db/models/carts.model.js';

class CartsManagerMongoDB {
    constructor(path) {
        this.path = path;
    }

    async getCarts() {
        try {
            const carts = await cartsModel.find({}).populate('products.product');
            return carts;
        } catch (error) {
            return error
        }
    };

    async getCartById(cid) {
        try {
            const cart = await cartsModel.findById(cid).populate('products.product')
            return cart
        } catch (error) {
            return error
        }
    };

    async createCart(obj) {
        try {
            const newCart = await cartsModel.create(obj)
            return newCart
        } catch (error) {
            return error
        }
    };

    async addProductToCart(cid, pid) {
        try {
            const cart = await cartsModel.findById(cid);

            if (!cart) {
                throw new Error('Cart not found');
            }

            const productIndex = cart.products.findIndex(prod => prod.product.toString() === pid.toString());

            if (productIndex === -1) {
                cart.products.push({ product: pid, quantity: 1 });
            } else {
                cart.products[productIndex].quantity++;
            }

            await cart.save();

            return cart;
        } catch (error) {
            return error
        }
    };

    async deleteCart(cid) {
        try {
            const deleteCart = await cartsModel.findByIdAndDelete(cid)
            return deleteCart
        } catch (error) {
            return error
        };
    };

    async deleteProductFromCart(cid, pid) {
        try {
            const cart = await cartsModel.findById(cid)
            if (!cart) throw new Error('Cart not found')

            const deletedProduct = await cartsModel.updateOne({ _id: cid }, { $pull: { products: { product: pid } } })

            return deletedProduct

        } catch (error) {
            return error
        }
    };

    async updateProductQuantity(cid, pid, quantity) {
        try {
            const cart = await cartsModel.findById(cid);
    
            if (!cart) {
                throw new Error('Cart not found');
            }
    
            const productIndex = cart.products.findIndex(prod => prod.product.toString() === pid.toString());
    
            if (productIndex === -1) {
                return null;
            }
    
            cart.products[productIndex].quantity = quantity;
            await cart.save();
    
            return cart;
        } catch (error) {
            return error;
        }
    };
    
};

const cartsManagerMongoDB = new CartsManagerMongoDB()

export default cartsManagerMongoDB