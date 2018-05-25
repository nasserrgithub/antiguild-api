const handleRegisterFunc = (req, res, db, bcrypt) => {
	const { email, name, password } = req.body;
	if (!email || !name || !password){
		return res.status(400).json('incorrect form submission');
	}
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
				.insert({
					email:loginEmail[0],
					name: name,
					joined: new Date()
				})
				.returning('*')
				.then(user => {
					res.json(user[0]);
				})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('unable to register'));
	/*return db('users')
		.insert({
			email: email,
			name: name,
			joined: new Date() 
		})
		.returning('*') //what should be returned after the insert method
		.then(user => {
			res.json(user[0]);
		})
		.catch(err => res.status(400).json('unable to register'));*/
/*	bcrypt.hash(password, null, null, function(err, hash) {
		console.log(hash);
    // Store hash in your password DB.
	});
	database.users.push({
		id: '125',
		name: name,
		email: email,
		//password: password,
		entries: 0,
		joined: new Date()
	})
	console.log(req.body);
	res.json(database.users[database.users.length-1]);*/
}


module.exports = {
	handleRegister: handleRegisterFunc
};