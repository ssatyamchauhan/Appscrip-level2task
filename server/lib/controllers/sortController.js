const Data = require('../../database')().data;
const axios = require('axios')


exports.sort = (req, res) => {

    if (req.query.sortby) {
        let column_name = req.query.sortby
        Data.find({}, null, { limit: 10, skip: req.query.limit - 10 }).sort(column_name).exec(function (err, listings) {
            if (err) {
                console.log(err);
            } else {
                res.json({ status: 200, message: "okay now ", data: listings });
            }
        })
    }
    else {
        Data.find({}, null, { limit: 10 }, (err, result) => {
            if (err) console.log(err)
            else {
                return res.json(result)
            }
        });
    }
}