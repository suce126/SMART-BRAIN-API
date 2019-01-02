const express = require('express');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser');
const cros = require('cors');

const app = express();
app.use(cros());
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

app.post('/signin', (req, res) => {
    // Load hash from your password DB.
// bcrypt.compare("1234567", '$2a$10$ntX.mdEc7PeJ7obiJgNHCOL5908cyY6.bBrczN19ZKEFWMY/mm7fi', (err, res)=> {
//     console.log('first guess',res);
// });
// bcrypt.compare("veggies", '$2a$10$ntX.mdEc7PeJ7obiJgNHCOL5908cyY6.bBrczN19ZKEFWMY/mm7fi', (err, res)=> {
//     console.log('2 guess',res);
//     // res = false
// });
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
        res.json('sucess');
    } else {
        res.status(400).json('error logging in')
    }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    // bcrypt.hash(password, null, null, (err, hash) => {
    //     console.log(hash);
    // });
    database.users.push({
        id: '123',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        } else {
            res.status(404).json('Error');
        }
    })
    if (!found) {
        res.status(400).json('Not found');
    }
})

app.post('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(400).json('Not found');
    }
})





app.listen(3000, () => {
    console.log('app is running')
})

