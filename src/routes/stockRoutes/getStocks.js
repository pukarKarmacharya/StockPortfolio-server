const router = require("express").Router();
const { Stock } = require("../../models/stock");
const VerifyToken = require('../../helperFunctions/verifyToken');

router.get("/", VerifyToken, async (req, res) => {
	try {
	const stocks = await Stock.find({}, { email: 0, userId: 0 });
	if (stocks.length === 0) {
	return res.status(401).send({ message: "Sorry no any available stocks at the moment. " });
	}
	if (req.authenticated) {
	return res.status(200).send(stocks);
	} else {
	const stocksWithoutSensitiveInfo = await Stock.find({}, {  symbol: 0, email: 0, userId: 0 });
	return res.status(200).send(stocksWithoutSensitiveInfo );
	}
	} catch (error) {
	res.status(500).send({ message: "Internal Server Error" });
	}
	});

module.exports = router;