var express = require('express');
var router = express.Router();
var path = require("path");

var filePath = path.join(process.cwd(), "mobile-menu.html");

/* GET 'mobile-menu' page */
router.get("/", (req, res) => {
    res.sendFile(filePath);
});

module.exports = router;
