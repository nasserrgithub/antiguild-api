const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const db = knex({
  client: 'pg',
  connection: {
  	connectionString: process.env.DATABASE_URL,
  	ssl: true,
    //host : 'postgresql-concave-46441'/*'127.0.0.1'*/, //this is equal to your localhost
    //user : 'postgres',
    //password : '22JuLy20',
    //database : 'smartbrain'
  }
});

/*db.select('*').from('users').then(data => {
	console.log(data);
});*/
 
const app = express();

app.use(bodyParser.json());
app.use(cors());

/*const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},

		{
			id: '124',
			name: 'Nass',
			email: 'nass@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}
	],
	login: [
		{
			id: '987',
			hash: '',
			email: 'john@gmail.com'
		}
	]
}*/

/*app.get('/', (req, res) => {
	db.select('*').from('users').then(users => res.send(JSON.stringify(users)));
})*/

app.get('/', (req, res) => res.send('it is working'));
app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt));
// could be app.post('/signin', (req, res) => signin.handleSignin(db, bcrypt)); , look at signin.js for changes

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt)); //dependency injection

app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, db));

app.put('/image', (req, res) => image.handleImage(req, res, db));

app.post('/imageurl', (req, res) => image.handleApiCall(req, res));
 

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
});


/*
/ -> res = this is working
/signin -> POST = success/fail
/register -> POST = user
/profile/:userId -> GET = user
/image -> PUT = user (for the rank)

*/



















































































