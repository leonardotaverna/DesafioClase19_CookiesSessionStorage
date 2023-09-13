import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
//import productsManager from './ProductsManager.js';
import productsManagerMongoDB from './ProductsManagerMongoDB.js';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import { Server } from 'socket.io'; 
import './db/dbConfig.js';
import cookieParser from 'cookie-parser';

const app = express();

//Express
app.use (express.json());
app.use (express.urlencoded({extended:true}));
app.use (express.static(__dirname + '/public'));

//Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//Routes
app.use ('/api/views',viewsRouter);
app.use ('/api/products', productsRouter);
app.use ('/api/carts', cartsRouter);

//Cookies
app.use (cookieParser('secretKeyCookies'));

app.get ('/saveCookie',(req, res) => {
    res.cookie ('cookie1','First cookie',{maxAge:60000}).send()
});

app.get ('/readCookie', (req,res) => {
    console.log(req.cookies);
    const {cookie1} = req.cookies
    res.json ({message: 'Reading cookie', ...req.cookies, ...req.signedCookies})
});

app.get ('/deleteCookie', (req,res) => {
    res.clearCookie('cookie2').send ('Deleting cookie')
});

app.get ('/saveSignedCookie',(req, res) => {
    res.cookie ('cookie2','Second cookie',{signed:true}).send()
});


const PORT = 8080

const httpServer = app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`);
});

const socketServer = new Server (httpServer);

socketServer.on ('connection', socket =>{
    console.log("New client connected:", socket.id);

    socketServer.on('disconnect', () => {
        console.log('Client', socket.id, 'disconneted');
    });

    socketServer.emit('bienvenida',`Bienvenido a My E-book Store usuario ${socket.id}`);

    socket.on('addProd', async (obj) => {
        console.log('Received data from client:', obj);
        
        const newProduct = await productsManagerMongoDB.addProduct(obj);

        if (!(newProduct instanceof Error)){
            const newProductsArray = await productsManagerMongoDB.getProducts();
            socketServer.emit ("addedProd", newProductsArray);
        } else{
            console.error(newProduct);
        }
    });

    socket.on('deleteProd', async (id) => {
        await productsManagerMongoDB.deleteProduct(Number (id));

        const newProductsArray = await productsManagerMongoDB.getProducts();

        socketServer.emit("deletedProd",await newProductsArray);
    });
    
});