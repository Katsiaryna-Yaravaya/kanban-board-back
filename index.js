const express = require('express');
const Datastore = require('nedb');
const app = express();
const cors = require('cors')

app.use(cors())

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/', function (request, response) {
    response.send(database.getAllData());
});

app.post('/', async (request, response) => {
    let body = [];

    request.on('data', chunk => {
        body += chunk.toString()
    })

    request.on('end', () => {
        database.insert(JSON.parse(body))
        response.send(database.getAllData());
    })
});

app.listen(8080, () => console.log('Server is up and running on port 8080'));

// nodemon