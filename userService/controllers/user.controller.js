const user = require('../server/models').user;

module.exports = {
  create(req, res) {
    return user
      .create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        category: req.body.category,
        salt: req.body.salt
      })
      .then(user => res.status(201).send(user))
      .catch(error => {
          res.status(400).send(error)
        });
  },

  login(req, res) {
    var message = [];
    var success = false;
    var status = 404;
    let category;
    user.findOne({
       where:{
        email: req.body.email
       }
    }).then(function (user) {
        if (user) {
            message.push("user found");
            if(user.validPassword(req.body.password)) {
                status=200;
                success = true
                console.log("ategary:", user.category)
                category = user.category; 
                message.push("You are authorised");
            }else{
                message.push("Check Credentials");
            }
        }else{
            message.push("Check Credentials");
        }
       
        category ? res.json({status, success, category, message}): res.json({status, success, message});
    });
    }
};
