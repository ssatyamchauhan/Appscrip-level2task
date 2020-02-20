const express = require('express')
const router = express.Router();
const data = require('../controllers/dataController');

router.route('/getData')

    // creates a blog 
    .get((req, res) => {
        data.store(req, res)
    })


module.exports = router;