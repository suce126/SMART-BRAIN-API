const express = require('express');
const knex = require('knex')

const database = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'Tian',
        password: '',
        database: 'smart-brain '
    }
});
database.select('*').from('users').then(data => {
    console.log(data);
});

const app = express();

app.get('/', (req, res) => {
    res.send('this is working ')
})

app.post('/signin', (req, res) => {
    res.json('It is working');
})
app.listen(3000, () => {
    console.log('app is running')
})

