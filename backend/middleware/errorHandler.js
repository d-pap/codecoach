const { logEvents } = require('./logger')

const errorHandler = (err, req, res, next) => {
    // make an error log file to see errors - errLog.log in /logs
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
    console.log(err.stack)

    const status = res.statusCode ? res.statusCode : 500 // if res has code, return it. if not, return 500 (server error)

    res.status(status)

    res.json({ message: err.message })
}

module.exports = errorHandler