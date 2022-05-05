const http = require('http')
const fs = require('fs')
const path = require('path')
const dataPath = path.join(__dirname, 'pets.json')

const port = 8000

const server = http.createServer(function(req ,res) {
    if (req.method === 'GET' && req.url === '/pets') {
      fs.readFile(dataPath, 'utf8', function(err, petsJSON) {
        if(err) {
            console.error(err.stack)
            res.statusCode = 500;
            res.setHeader('Content-Type', 'plain/text')
            return res.end('Internal Server Error');
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.end(petsJSON);
      })
    } else if (req.method === 'GET' && req.url === '/pets/0') {
        fs.readFile(dataPath, 'utf8', function(err, petsJSON) {
            if(err) {
                console.error(err.stack)
                res.statusCode = 500;
                res.setHeader('Content-Type', 'plain/text')
                return res.end('Internal Server Error');
            }
            var pets = JSON.parse(petsJSON);
            var petsJSON = JSON.stringify(pets[0]);
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json');
            res.end(petsJSON);
        })
    } else if (req.method === 'GET' && req.url === '/pets/1') {
        fs.readFile(dataPath, 'utf8', function(err, petsJSON) {
            if(err) {
                console.error(err.stack)
                res.statusCode = 500;
                res.setHeader('Content-Type', 'plain/text')
                return res.end('Internal Server Error');
            }
            var pets = JSON.parse(petsJSON);
            var petsJSON = JSON.stringify(pets[1]);
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json');
            res.end(petsJSON);
        })
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Not Found');
    }
})

server.listen(port, function() {
    console.log('Listening on port', port);
})