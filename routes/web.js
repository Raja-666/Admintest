const Web3 = require('web3');
const mongoose = require('mongoose');
const express = require('express');

const app = express();
const router = express.Router();

router.get('/', (req,res) =>{
    res.send("success")
})

router.get('/ethacc',(req,res) =>{
const acc = web3.eth.accounts.create()
    res.status(200).json(acc);
});

app.listen(3500);