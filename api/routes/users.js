var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {

    var db = req.app.locals.db.db("beTranslations").collection("demoCollection");

    await db.find( {code: {$lt: 15} })
            .toArray(function (err, result) {
			    if (err) res.status(400).json("Error" + e);
                res.json(result);
		    });

});

module.exports = router;
