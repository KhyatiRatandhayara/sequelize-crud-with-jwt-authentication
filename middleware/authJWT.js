const { TokenExpiredError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

exports.verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];
    if(!token){
        return res.status(400).send({message : "User token is not provided!."});
    }
    jwt.verify(token, config.secret,(err, decoded) => {
      if(err) {
          if(err instanceof TokenExpiredError) {
            return res.status(401).send({message : "Your Token is expired Please Signin yourself!."});
          } else {
            return res.status(401).send({message : "Unauthorized!."});
          }
      }
      req.userId = decoded.id;
      next();
    });
}

exports.isModerator = async (req, res, next) => {

    let currentUser = await User.findByPk(req.userId);
    if(currentUser){
    const currentUserRole = await currentUser.getRoles();
    for(let i=0; i< currentUserRole.length; i++){
        if(currentUserRole[i].name == 'moderator'){
            next();
        }
    }
    return res.status(403).send({message : "Require a Moderator Role!."});
    }
}
exports.isAdmin = async (req, res, next) => {

    let currentUser = await User.findByPk(req.userId);
    if(currentUser){
    const currentUserRole = await currentUser.getRoles();
    for(let i=0; i< currentUserRole.length; i++){
        if(currentUserRole[i].name == 'admin'){
            next();
        }
    }
    return res.status(403).send({message : "Require a Admin Role!."});
    }
}
exports.isModeratorOrAdmin = async (req, res, next) => {

    let currentUser = await User.findByPk(req.userId);
    if(currentUser){
    const currentUserRole = await currentUser.getRoles();
    for(let i=0; i< currentUserRole.length; i++){
        if(currentUserRole[i].name == 'moderator'){
            next();
        }
        if(currentUserRole[i].name == 'admin'){
            next();
        }
    }
    return res.status(403).send({message : "Require a Moderator Role!."});
    }
}