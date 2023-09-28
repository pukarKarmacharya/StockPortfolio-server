const router = require('express').Router();
const {Stock, validate} = require('../../models/stock');
const strictVerifyToken = require('../../helperFunctions/strictVerification');

router.post('/',strictVerifyToken, async (req, res) => {
    let body = {...req.body}
    try{
        const {error} = validate(body);
        if(error){
            return res.status(400).send(error.details[0].message);
        }

        const userId = req.decoded._id; // Extract userId from decoded object

        const stock = await Stock.findOne({ symbol: body.symbol });

        // if(stock && stock.symbol === body.symbol && JSON.stringify(stock.userId) === JSON.stringify(userId)  && stock.price === body.price){
        //     return res.status(404).send({message:'Stock already exists with all the matching constraints. Please edit the quantity of existing stock.'});
        // }

        const data = await new Stock({...body, userId: userId}).save();
        res.status(201).send({message:'Stock added successfully.', data: data});
    }
    catch(error){
        res.status(500).send({message:'Internal server error'});
    }
})

module.exports = router;