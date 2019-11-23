const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
const PORT = 2000

app.get('/', (req, res) => {
    res.send("Welcome to JWT Auth")
})

app.get('/secrets', verifyToken, (req, res) => {
    jwt.verify(req.token, 'itsasecret', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        }
        else {
            res.json({
                message: "The joke's on you, there is no secret",
                authData
            })
        }
    })
})

app.post('/login', (req, res) => {
    const user = {
        user_id: "riturajman",
        passwd: "1234"
    }
    jwt.sign({ user }, 'itsasecret', (err, token) => {
        if (err) {
            res.send(err)
        }
        else {
            res.json(token)
        }
    })
})


function verifyToken(req, res, next) {
    const authToken = req.headers['auth'];
    if (authToken === undefined) {
        res.sendStatus(403)
    }
    else {
        req.token = authToken
        next()
    }
}


app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})