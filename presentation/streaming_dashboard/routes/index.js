const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (request, res, next) => {
	res.render('index');
});

module.exports = router;
