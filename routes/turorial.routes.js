module.exports = app => {

    const tutorials = require("../controllers/tutorial.controller.js");

    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", tutorials.create);

    router.get('/tutorials',tutorials.findAll);

    router.get('/:id',tutorials.findOne);

    router.get('/',tutorials.findByQueryParams);

    router.get('/page/data',tutorials.findAndCountAllData);

    router.get('/page/tutorialdata',tutorials.getPagingData);

    app.use('/api/tutorials', router);
  };
 