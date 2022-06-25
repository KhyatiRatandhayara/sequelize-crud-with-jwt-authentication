module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    const verifySignUp = require("../middleware/verifySignup");
    const authToken = require("../middleware/authJWT");

    var router = require("express").Router();

    //Authentication

    router.post('/signup',verifySignUp.checkUsernameOrEmailExist, auth.createUser);

    router.post('/signin', auth.signinUser);

    app.use('/api/auth', router);
  };
 