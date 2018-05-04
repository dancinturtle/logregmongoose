const mongoose = require('mongoose');
const bcrypt = require('bcrypt-as-promised');
var User = mongoose.model('User');
module.exports = {

  show: function (req, res) {

    User.find({}, function (err, users) {
      if (err) {
        res.render('index', { error: "There was an error getting the users" })
      }
      res.render('index', { users: users });
    });
  },
  register: function (req, res) {
    let newuser = new User(req.body);
    newuser.validate()
      .then(data => {
        bcrypt.hash(req.body.password, 10)
        .then(hashed_pw => {
          console.log("the hash", hashed_pw);
          newuser.password = hashed_pw;
          newuser.save();
          req.session.userid = newuser._id;
          res.redirect('/success');
        })
        .catch(err => {
          console.log("problem with bcrypt");
          res.redirect("/");
        })
      })
      .catch(err => {
        for (var key in err.errors) {
          req.flash(key, err.errors[key].message);
        }
        for (var key in req.body) {
          if (key != 'password' && key != 'conpassword') {
            req.flash("old" + key, req.body[key]);
          }
        }
        res.redirect('/')
      })
  },
  success: function (req, res) {
    if (req.session.userid) {
      User.findById(req.session.userid)
        .then(data => {

          res.render('success', { name: data.first_name })
        })
    }
    else {
      req.flash("malicious", "You must be logged in to view the requested page")
      res.redirect('/')
    }
  },
  logout: function (req, res) {
    req.session.destroy();
    res.redirect('/')
  },
  login: function (req, res) {
    // find the given user by email
    User.findOne({email: req.body.email})
      .then(data => {
        console.log("data", data, req.body)
        bcrypt.compare(req.body.password, data.password)
        .then(result => {
          console.log("result", result)
          req.session.userid = data._id;
          res.redirect('/success');
        })
        .catch(err => {
          console.log("err", err)
          req.flash('badlogin', "We could not log you in")
          res.redirect('/')
        })
      })
      .catch(err => {
        console.log("well this is bad", err)
        req.flash('badlogin', "we could not log you in")
        res.redirect('/');
      })
  }
  //   showOne: function(req, res, id){
  //     User.find({_id: id}, function(err, mollusk){

  //       res.render('user', {response: mollusk});

  //     }); //closes Mollusk.find

  //   },//closes showOne: function(req, res, id)
  //   edit: function(req, res, id){
  //     User.find({_id: id}, function(err, mollusk){
  //   		console.log("One mollusk", mollusk);
  //   		res.render('editmollusk', {response: mollusk});
  //   	});//closes Mollusk.find
  //   }, //closes edit: function(req, res, id)

  //   create: function(req, res){
  //     console.log("POST DATA", req.body);
  //   	var mollusk = new Mollusk({name: req.body.name,
  //   							common_name: req.body.common_name,
  //   							other_common_name: req.body.other_text_input,
  //   							dish: req.body.dish,
  //   							mucus: req.body.mucus,
  //   							habitats: req.body.livingspot,
  //   							description: req.body.description
  //   							});
  //   	mollusk.save(function(err){
  //   		if(err){
  //   			console.log("Something went wrong!");
  //   			res.render('newmollusk', {title: 'you have errors!', errors: mollusk.errors})
  //   		} else {
  //   			console.log("Successfully added the quote!");
  //   			res.redirect('/');
  //   		}
  //   	})//closes mollusk.save
  //   },//closes post: function(req, res)

  //   update: function(req, res, id){
  //     Mollusk.update({_id: id}, {name: req.body.name,
  //   							common_name: req.body.common_name,
  //   							other_common_name: req.body.other_text_input,
  //   							dish: req.body.dish,
  //   							mucus: req.body.mucus,
  //   							habitats: req.body.livingspot,
  //   							description: req.body.description
  //   							}, function(err){
  //   					//Code to run when database has attempted to update the matching record
  //   		if(err){
  //   			console.log("Updating went wrong!");
  //   			res.redirect('/');
  //   		}
  //   		else {
  //   			console.log("Update successful!");
  //   			res.redirect('/mollusk/'+id);
  //   		}

  //   	})//closes Mollusk.update

  //   },//closes update: function(req, res, id)

  //   destroy: function(req, res, id){
  //     Mollusk.remove({_id: id}, function(err){
  //   		if(err){
  //   			console.log("Deleting went wrong!");
  //   			res.redirect('/');
  //   		}
  //   		else {
  //   			console.log("Deletion successful!");
  //   			res.redirect('/');
  //   		}
  //   	}); //closes Mollusk.remove
  //   } //closes destroy: function(req, res, id)


}//closes module.exports
