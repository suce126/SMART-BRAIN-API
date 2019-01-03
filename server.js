const express = require('express');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser');
const cros = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();
app.use(cros());
app.use(bodyParser.json());

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'Tian',
        password: '',
        database: 'smart-brain'
    }
});

const database = {
    users: [
        {
            id: '123',
            name: 'Su',
            email: 'suce126@126.com',
            password: '1234567',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Ce',
            email: 'ce126@126.com',
            password: '1234567',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'suce126@126.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req,res) => {profile.handleProfile(req, res, db)})

app.put('/image',(req,res) => {image.handleImage(req, res, db)})





app.listen(3000, () => {
    console.log('app is running')
})

