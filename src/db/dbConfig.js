import mongoose from 'mongoose';


//Mongoose
const URI = 'mongodb+srv://leonardotaverna:Abc123456@cluster0.yvwzayr.mongodb.net/MyEbookStoreDB?retryWrites=true&w=majority';
mongoose.connect(URI)
.then (() => console.log('Connected to DB'))
.catch (error => console.log(error));