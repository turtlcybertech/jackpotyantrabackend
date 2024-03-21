const express = require('express');
const { Authentication } = require('../Routes/resultRoute');
const { adminLogin, createAdmin } = require('../controllers/adminController');
const router = express.Router();

router.post("/login", adminLogin);
router.post("/createAdmin/:secretKey", createAdmin);



module.exports = router;