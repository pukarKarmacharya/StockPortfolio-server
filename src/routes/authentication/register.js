const router = require('express').Router();
const {User, validate} = require('../../models/user');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    let body = {...req.body}
    try{
        const {error} = validate(body);
        if(error){
            return res.status(400).send(error.details[0].message);
        }

        if(!body.role) body = {...body, role:'user'}

        const user = await User.findOne({email:body.email});
        if(user){
            return res.status(409).send({message:'User already registered.'});
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(body.password, salt);

        await new User({...body, password:hashedPassword}).save();
        res.status(201).send({message:'User registered successfully.'});
    }
    catch(error){
        res.status(500).send({message:'Internal server error'});
    }
})

module.exports = router;