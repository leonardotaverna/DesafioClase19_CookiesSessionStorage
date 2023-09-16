import { Router } from "express";
import __dirname from '../utils.js';

const router = Router ()

router.post('/',(req,res) =>{
    const {username,password} = req.body
    //req.session ['username'] = username
    //req.session ['password'] = password
    console.log(req);
    res.send ('Checking sessions')
})

export default router