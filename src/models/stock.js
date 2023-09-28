const mongoose = require('mongoose');
const Joi = require('joi');

const userIdType = mongoose.Schema.Types.ObjectId;

const stocksSchema = new mongoose.Schema({
    symbol:{
        type: String, required: true
    },
    price:{
        type: Number,
        required: true,
        default: 1
    },
    userId: {
        type: userIdType
    },
    quantity : {
        type: Number, 
        required: true,
        default: 1
    },
    date: { 
        type: Date, 
        //default: Date.now
    }
});



const Stock = mongoose.model('Stock', stocksSchema);

const validate = (data) => {
    const schema = Joi.object({
        symbol : Joi.string().required().label('Symbol'),
        price : Joi.number().min(0).label('Price'),
        userId: Joi.string().label('User Id'),
        quantity: Joi.number().label('Quantity'),
        date: Joi.date().label('Date'),
    });
    return schema.validate(data);
};


module.exports = {Stock, validate}