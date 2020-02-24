const Data = require('../../database')().data;
const axios = require('axios')



exports.store = (req, res) => {

    // 
    
    function callingApi() {
    let listofdata = []
    axios
      .get("https://api.nomics.com/v1/currencies/ticker?key=3556183991bb6b24cedcb82096b73a9b")
      .then(data => {
        let listofdata = []
        for(var i of data.data){
          listofdata.push({
            currency: i.currency, 
            symbol: i.symbol, 
            logo: i.logo_url,
            rank: i.rank,
            price: parseInt(i.price),
            priceDate: i.price_date,
            marketCap: i.market_cap,
            circulatingSupply: i.circulating_supply,
            maxSupply: i.max_supply,
            high: i.high,
            highTimestamp: i.high_timestamp,
            d1: i['1d'],
            d7: i['7d'],
            d30: i['30d'],
            d365: i['365d']
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