const express = require('express');
const app = express();
const petsJSON = require('./pets.json')
const PORT = process.env.PORT || 8000

app.get('/pets', function(req,res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.send(petsJSON)
    console.log('working')
})

app.get('/pets/:id', function(req,res) {
    if (petsJSON[req.params.id] === undefined) {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end('Not Found')
    }
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.send(petsJSON[req.params.id])
    console.log("still working")
})

app.listen(PORT, function() {
    console.log('server is running on', PORT)
})