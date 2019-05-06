const request = require('request')

const forcast = (latitude, longtitude, callback) => {
    const url = 'https://api.darksky.net/forecast/4a25d3a630feb718bbe53da8173ed962/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longtitude) + '?units=si'
    
    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to forecast service', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary}. The highest temperature will be ${body.daily.data[0].temperatureHigh} degrees and the lowest will be ${body.daily.data[0].temperatureLow} degrees. It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forcast