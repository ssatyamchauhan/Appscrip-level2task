
module.exports = (mongoose) => {

    // structure of data 
    const dataSchema = new mongoose.Schema({

        currency: {
            type: String
        },
        symbol: {
            type: String
        },
        logo: {
            type: String
        },
        rank: {
            type: String
        },
        price: {
            type: String
        }, 
        priceDate: {
            type: String
        }, 
        marketCap: {
            type: String
        }, 
        circulatingSupply: {
            type: String
        }, 
        maxSupply: {
            type: String
        }, 
        high: {
            type: String
        }, 
        highTimestamp: {
            type: String
        }, 

    })

    return dataSchema;


}