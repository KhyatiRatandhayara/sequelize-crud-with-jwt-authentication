  module.exports = app =>{
    const user = require("../controllers/user.controller") 
    const authToken = require("../middleware/authJWT");
    var router = require("express").Router();

    //Authorization

    //for all public content
    router.get('/all',user.allAccess);

    //for userrole user
    router.get('/user',[authToken.verifyToken],user.userBoard);

    //for userrole moderators
    router.get('/moderator',[authToken.verifyToken,authToken.isModerator],user.moderatorBoard);

     //for userrole user
     router.get('/admin',[authToken.verifyToken,authToken.isAdmin],user.adminBoard);
  
    app.use('/api/test', router);

  }
  
