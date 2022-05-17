const express = require('express');
const app = express();
const fs = require('fs');
const petsJSON = require('./pets.json');

const PORT = process.env.PORT || 5555
app.use(express.json());

app.post('/pets/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    petsJSON.push(req.body);
    console.log(petsJSON);
    let resultJSON = JSON.stringify(petsJSON);
    fs.writeFile('pets.json', resultJSON, (error) => {
        if (error) {
            res.send(error)
        } else {
            res.send(req.body);
        }
    })
})

app.get('/pets/', (req, res) => {
    res.statusCode = 200
    res.send(petsJSON);
})

app.get('/pets/:id', (req, res) => {

    if (!petsJSON[req.params.id]) {
        res.statusCode = 404;
        res.send("Not found")
    }
    res.statusCode = 200;
    res.send(petsJSON[req.params.id])
})

app.patch('/pets/:id', (req, res) => {
    res.statusCode = 200;
    let index = req.params.id
    petsJSON[index].name = req.body.name || petsJSON[index].name
    petsJSON[index].age = req.body.age || petsJSON[index].age
    petsJSON[index].kind = req.body.kind || petsJSON[index].kind
    res.send(petsJSON);
    let resultJSON = JSON.stringify(petsJSON);
    fs.writeFile('pets.json', resultJSON, (error) => {
        if (error) {
            res.send(error)
        } else {
            res.send(req.body);
        }
    })
})

app.delete('/pets/:id', (req, res) => {
    res.statusCode = 200;
    let index = req.params.id;
    petsJSON.splice(index, 1);
    fs.writeFile('pets.json', JSON.stringify(petsJSON), (error) => {
        if (error) {
            res.send(error)
        } else {
            res.send(petsJSON)
        }
    })
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})