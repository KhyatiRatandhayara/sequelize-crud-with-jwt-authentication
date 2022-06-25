const db = require("../models");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

exports.createUser = async (req, res) => {
    try {
     let newUser = await  User.create({...req.body});

     if(newUser){
       let isRoleExist = await Role.findAll({
            where : {
                name : {
                    [Op.or] : req.body.roles
                }
            }
         });
         console.log(isRoleExist);
        if(isRoleExist.length == 0){
            return res.status(404).send({message : "Role does'nt Exists!."});
        } else {
          const roleSet = await newUser.setRoles(isRoleExist);
          return res.status(200).send({message : "User Created successfully!."});
        }
     }

    } catch(error){
      return res.status(500).send({message : `Enable to create User due to!.${error.message}`});
    }
}

exports.signinUser = async (req, res) => {
    console.log(req.body);
    let isUserSignUp = await User.findOne({
        where : {
            [Op.and] : {
                username : req.body.username,
                password : req.body.password
            }
        }
    });
    console.log(isUserSignUp);
    if(!isUserSignUp){
        return res.status(400).send({message : "User Not found.Please Sign Up in the System!."});
    }
    let token = jwt.sign({id : isUserSignUp.id},config.secret,{
     expiresIn : 60 //24 hours
    });
    console.log(token);
    return res.status(200).send({
        id : isUserSignUp.id,
        username : isUserSignUp.username,
        email : isUserSignUp.email,
        accessToken : token
    });
    
    
}
