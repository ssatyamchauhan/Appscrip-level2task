
module.exports = (mongoose) => {

    const eachDaySchema = new mongoose.Schema({
        price_change: {
            type: String
        },
        price_change_pct: {
            type: String
        },
        volume: {
            type: String
        },
        volume_change: {
            type: String
        },
        volume_change_pct: {
            type: String
        },
        market_cap_change: {
            type: String
        },
        market_cap_change_pct: {
            type: String
        }
    })
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
            type: Number
        },
        price: {
            type: Number
        },
        priceDate: {
            type: Date
        },
        marketCap: {
            type: Number
        },
        circulatingSupply: {
            type: Number
        },
        maxSupply: {
            type: Number
        },
        high: {
            type: Number
        },
        highTimestamp: {
            type: Date
        },
        d1: eachDaySchema,
        d7: eachDaySchema,
        d30: eachDaySchema,
        d365: eachDaySchema

    })

    return dataSchema;


}