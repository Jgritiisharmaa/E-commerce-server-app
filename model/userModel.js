const mongoose = require('mongoose')

const userSchema = mongoose.Schema(  
   
    
    {
      "name":String,
      "category":String,
      "price": Number,
      "description": String,
      "quantity": Number,
    
    }
    
    )

const userModel = mongoose.model('product', userSchema)

module.exports = { userModel }