const express = require('express')
const app = express()
const port = 3000
const { Sequelize, DataTypes } = require('sequelize');

// Option 1: Passing a connection URI
const sequelize = new Sequelize('postgres://admin:admin@database:5432/test');

const Words = sequelize.define('words', {
    value: DataTypes.STRING,
    category: DataTypes.STRING,
},{
    timestamps: false
});

app.use(express.json());

app.all('*', (req, res, next) => {
    console.log(req.method, req.url);
    res.setHeader('Access-Control-Allow-Origin', process.env.NODE_ENV === 'development' ? '*' : env.frontUrl);
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

// Always return 200 for CORS preflight request
app.options('*', (req, res, next) => {
    res.status(200);
    res.send();
})


app.get('/words', async (req, res) => {

    try {
        const  {limit, random, category} = req.query;

        let words = [];

        if (!category) {
            words = await Words.findAll({limit});
        } else {
            words = await Words.findAll({limit, where: {category}});
        }

        console.log(words);

        if (words.length === 0) {
            res.status(404).send("Not found");

            return;
        }

        res.status(200).json(words);
    } catch (e) {
        res.status(500).send('Internal server error');
    }
})

app.post('/words', async (req, res) => {
    try {
        console.log(req.body);

        if (!req.body.value || !req.body.category) {
            res.status(422).send('Malformed request');

            return;
        }

        const {value, category} = req.body;

        await Words.create({
            value,
            category
        });

        res.status(201).send("word created")
    } catch (e) {
        console.error(e);
        res.status(403).send("Word already added");
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})