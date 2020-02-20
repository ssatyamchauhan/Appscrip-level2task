const Data = require('../../database')().data;
const axios = require('axios')



exports.store = (req, res) => {

    // 
    
    function callingApi() {
        let listofdata = []
    axios
      .get("https://api.nomics.com/v1/currencies/ticker?key=f18f5cd0afd42cbfd6f6359510d62ebc&ids")
      .then(data => {
        let listofdata = []
        for(var i of data.data){
          listofdata.push({
            currency: i.currency, 
            symbol: i.symbol, 
            logo: i.logo_url,
            rank: i.rank,
            price: i.price,
            priceDate: i.price_date,
            marketCap: i.market_cap,
            circulatingSupply: i.circulating_supply,
            maxSupply: i.max_supply,
            high: i.high,
            highTimestamp: i.high_timestamp,
          })
        }
        Data.insertMany(listofdata, (err, data) => {
            if(err) return res.json({status:400})
            else{
                Data.find({}, null,{limit: 10}, (err,result) => {
                    if(err) console.log(err)
                    return res.json(result);
                });
            }
        })
        
      })
      .catch(err => {
        console.log(err)
      })
    }

    if(req.query.limit) {
        console.log('inside ')
        Data.find({}, null,{limit: 10, skip: req.query.limit-10}, (err,result) => {
            if(err) console.log(err)
            else{
                if(!result.length) {
                    return callingApi()
                }
                return res.json(result);
            }
        });
    }

    else{
    Data.find({}, null,{limit: 10}, (err,result) => {
        if(err) console.log(err)
        else{
            if(!result.length) {
                return callingApi()
            }
            return res.json(result);
        }
    });
}

    }