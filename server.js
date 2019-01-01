const express = require('express');
const knex = require('knex');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// const database = knex({
//     client: 'pg',
//     connection: {
//         host: '127.0.0.1',
//         user: 'Tian',
//         password: '',
//         database: 'smart-brain '
//     }
// });
// database.select('*').from('users').then(data =>   {
//     console.log(data);
// });
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
    ]
}

app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
        res.json('sucess');
    } else {
        console.log(req.body.email);
        console.log(req.body.password);
        res.status(400).json('error logging in')
    }
})

app.post('/register', (req, res) => {
    const {email,name,password} = req.body;
    database.users.push({
        id: '123',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
})

app.listen(3000, () => {
    console.log('app is running')
})

