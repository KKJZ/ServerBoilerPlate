'use strict';
const express = require("express");

const router = express.Router();

// const {} = require("../models/");

router.get('/', function (req, res) {
    res.send("Hello Asshole!")
});

module.exports = router;
