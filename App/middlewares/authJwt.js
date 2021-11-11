const jwt = require("jsonwebtoken");
const { rawListeners } = require("../models/user.model");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Session = db.session;

verifyToken = (req,res,next) => {
    let token1 = req.headers["x-access-token"];
    let token;
    if (!token1) {
        return res.status(403).send({message: "No token provided!"});
    }
    console.log(token)
    Session.find({
          token: token1
        
      })
      .then(sessions => {
        if(sessions.length === 0)
        {
          token='nothing';
        }
        else
        {
          token=token1;
        }
        console.log(sessions)
        
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({message: "Unauthorized!"});
        }
        req.userId = decoded.id;
        next();
    });
});
};

isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        Role.find(
            {
                _id: {$in: user.roles}
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }
                for (let i = 0; i<roles.length; i++) {
                    if (roles[i].name ==="admin") {
                        next();
                        return;
                    }
                }
                res.status(403).send({message: "Require admin role!"});
                return;
            }
        );
    });
};

isModerator = (req, res, next) => {
    User.findByOne(req,userId).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        Role.find(
            {
                _id: {$in: user.roles}
            },
            (err,roles) => {
                if (err){
                    res.status(500).send({message: err});
                    return;
                }
                for (let i=0; i<roles.length; i++) {
                    if (roles[i].name === "moderator") {
                        next();
                        return;
                    }
                }
                res.status(403).send({message:"Require Moderator Role!"});
                return;
            }
        );
    });
};
const authJwt = {
    verifyToken,
    isAdmin,
    isModerator
};
module.exports = authJwt;