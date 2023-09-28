require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const connection = require('./db');
const cors = require('cors');

const registerRoutes = require('./routes/authentication/register');
const loginRoutes = require('./routes/authentication/login');
const addStockRoutes = require('./routes/stockRoutes/buyStock');
const stocksRoutes = require('./routes/stockRoutes/getStocks');

connection();

const app = express();

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

//Middlewares
app.use(helmet());
app.use(express.json());
app.use(cors(corsOptions));

//routes
app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/stock/buy', addStockRoutes);
app.use('/api/stocks', stocksRoutes);

/* const data =[
    {
        id:1,
        name: 'a',
        position:'x'
    },
    {
        id:2,
        name: 'b',
        position:'y'
    },
    {
        id:3,
        name: 'c',
        position:'z'
    }
    
] */
/* app.get('/', (req, res) =>{
    //res.send('GETT')
    res.send(data)
    
}) */

app.listen(8000, () => {
    console.log('server is running')
})

