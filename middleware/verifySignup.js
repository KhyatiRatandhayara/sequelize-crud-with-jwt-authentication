const db = require("../models");
const User = db.user;

exports.checkUsernameOrEmailExist = async (req, res, next) => {
    try{
        const isUsernameExist = await User.findOne({
            where : {
                username :req.body.username
            }
        });
        if(isUsernameExist != null){
           return  res.status(400).send({message : 'Username Already Exist!.'});
        }
        const isEmailExist = await User.findOne({
            where : {
                email :req.body.email
            }
        });
        if(isEmailExist != null){
            return  res.status(500).send({message : 'Email Already Exist!.'});
        }
        next();
    } catch(error) {
        next(error);
    }
       
}

