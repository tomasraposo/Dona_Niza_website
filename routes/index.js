var express = require('express');
var router = express.Router();
var path = require("path");

var filePath = path.join(process.cwd(), "index.html");

/* GET 'home' page */
router.get("/", (req, res) => {
    res.sendFile(filePath);
});

module.exports = router;
