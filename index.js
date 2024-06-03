const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const {connection} = require('./config/db')
const {userModel} =require ('./model/userModel')

app.use(express.json())

app.get('/home', (req, res) => {
    res.send('Home')
})

app.get('/allproducts', async (req, res) => {
    try {
        let allproducts = await userModel.find()
        res.send({
            "Msg": "List of all products",
            "Data": allproducts
        })
    } catch (error) {
        res.send({
            "msg": "error",
            "errror": error.message
        })
    }
})

app.post('/addproduct', async (req, res) => {
    let productDetail = req.body;
    try {
        let product = new userModel(productDetail)
        await product.save()
        res.send({
            "msg": "product added successfully!",
            "Data": product
        })
    } catch (error) {
        res.send({
            "msg": "errror",
            "errror": error.message
        })
    }
})


app.patch('/updateproduct/:id', async(req, res) => {
    let id = req.params.id
    let updation = req.body

    try {
        let updateData = await userModel.findById({_id:id})
        if(!updateData){
            res.send("Product ID Not Found")
        } else {
            await updateData.findByIdAndUpdate({_id:id}, updation)
            res.send({
                "Msg": "Data Updated Successfully",
                "Data": updateData
            })
        }
    } catch (error) {
        res.send({
            "Msg": "Error", 
            "Error": error.message
        })
        
    }
})

app.delete('/deleteproduct/:id', async(req,res) =>{
    let id = req.params.id

    try {
        let delData = await userModel.findByIdAndDelete({_id:id})
        res.send("Data Deleted Successfully")
    } catch (error) {
        res.send({
            "Msg": "Error", 
            "Error": error.message
        })
    }
})


app.listen(8080, async () => {
    try {
        await connection
        console.log('connected')
    } catch (error) {
        console.log('not connected')
    }
    console.log('running')
})

