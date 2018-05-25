const handleProfileFunc = (req, res, db) => {
	const { id } = req.params;
	//let found = false;
	db.select('*').from('users')
	.where({
		id: id 
	})
	.then(user => {
		if (user.length){
			res.status(400).json(user[0]);
		} 
		//even the profile id doesn't exists, the program above outputs an empty array
		// Boolean ([]) is still true so we need an if (user.length)
		//console.log(user[0]);
		else {
			res.json('Not found');
		}
	})
	//this will result to status 200 OK since even the profile id doesn't exists, the program above outputs an empty array
/*	database.users.forEach(user => {
		if (user.id == id){
			found = true;
			return res.json(user);
		} 
	})
	if (!found) {
		res.status(400).json('not found');
	}*/
};

module.exports = {
	handleProfile: handleProfileFunc
};