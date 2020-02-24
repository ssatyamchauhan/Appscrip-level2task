const express = require('express')
const router = express.Router();
const data = require('../controllers/dataController');
const sort = require('../controllers/sortController')

router.route('/getData')

    // creates a data 
    .get((req, res) => {
        data.store(req, res)
    })


router.route('/getSort')

    // get sort data
    .get((req,res) => {
        sort.sort(req,res)
    })


module.exports = router;