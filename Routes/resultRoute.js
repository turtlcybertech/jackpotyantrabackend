const express = require('express');
const { Authentication } = require('../middleware/Auth');
const { generateMultipleResult, getResultForClient, getResultForAdmin, getResultForSpecificDate, updateResultForAdmin } = require('../controllers/resultController');
const router = express.Router();


router.post("/setresultbyid/:resultid", Authentication, updateResultForAdmin);

router.get("/generateMultipleRecord",Authentication, generateMultipleResult);
router.get("/getclientresult", getResultForClient);
router.get("/getadminresult", Authentication, getResultForAdmin);
router.get("/getresultfordate/:date", getResultForSpecificDate);

router.get("/", (req,res) => {
  res.status(200).send({message:"Server is running fine"});
})

// router.get("/getallresult", addAfield);

module.exports = router;
