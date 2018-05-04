const users = require('../controllers/users.js');
module.exports = function(app){

  app.get('/', users.show);
  app.get('/success', users.success);
  app.get('/logout', users.logout);
  app.post('/login', users.login);
  app.post('/register', users.register);


//   app.get('/user/:id', function(req, res){
//   	var id = req.params.id;
//     users.showOne(req, res, id)
//   });

//   app.get('/users/new', function(req, res){
//   	res.render('newuser');
//   });

//   app.get('/users/:id/edit', function(req, res){
//   	var id = req.params.id;
//    users.edit(req, res, id)

//   });
//   //post route for adding a mollusk
//   app.post('/users', function(req, res){
//   	users.create(req, res)
//   });
//   //post route for editing a mollusk
//   app.post('/users/:id', function(req, res){
//   	var id=req.params.id;
//     users.update(req, res, id)

//   });

//   app.post('/users/:id/destroy', function(req, res){
//   	var id = req.params.id;
//     users.destroy(req, res, id)

//   });

} //closes module.exports
