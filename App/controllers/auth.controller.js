const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Session = db.session;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });
    user.save((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
    
        if (req.body.roles) {
          Role.find(
            {
              name: { $in: req.body.roles }
            },
            (err, roles) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
        Role.findOne({ name: "user" }, (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = [role._id];
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
  
            res.send({ message: "User was registered successfully!" });
          });
        });
      }
    });
  };

  exports.signin = (req, res) => {
    User.findOne({
      username: req.body.username
    })
      .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!"
            });
          }
    
          var token = jwt.sign({ user }, config.secret, {
            expiresIn: 86400 // 24 hours
          });

          Session.create({
            user_id:user._id,
            token:token,
          }).then(sessions=>{
            //res.send({ message: "sessions was created" });
            Session.findOne({
              where: {
                token: token
              }
            })
            .then(sessions => {
    
          var authorities = [];
    
          for (let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
          }

          res.status(200).send({
            _id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
          });
        });
      });
    });
    };
  
    exports.logout = (req, res) => {
      if (!req.headers["authorization"]) {
        return res.status(404).send({ message: "Authorization token can not be empty." });
      }
      else{
      const token = req.headers["authorization"];
      Session.findOneAndRemove(token).then((data) => {
        if (data) {
          res.status(200).send({
            message: "Logout Successfully",
          });
          
        } else {
          res.status(500).send({
            message: `Cannot delete User with id=${id}`,
          });
        }
      });
    }
         
    };