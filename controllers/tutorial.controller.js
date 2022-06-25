const { sequelize } = require("../models");
const db = require("../models");
const { Op } = require("sequelize");
const Tutorial = db.tutorials;

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  //validate body
  if(!req.body.title){
      res.status(400).send({
          message : "Title cannot be empty!."
      })
      return false;
  }

  //create a tutorial 
  const tutorial = {
      title : req.body.title,
      description : req.body.description,
      published : req.body.published
  }

  try{
    const newTutorial = await Tutorial.create(tutorial);
    return res.status(200).send({message : "Tutorial Created Successfully!."});

  } catch (error) {
    return res.status(500).send({error : `Error occured while creating tutorial due to : ${error.message}`});
  }
};

// Fetch All Tutorial
exports.findAll = async (req, res) => {
  //fetch a tutorials
  try{
    const allTutorials = await Tutorial.findAll();
    return res.status(200).send(allTutorials);

  } catch (error) {
      return res.status(500).send({error : `Error occured while fetching tutorial due to : ${error.message}`});
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
  const tutorial =  await Tutorial.findByPk(id);

  return res.status(200).send(tutorial);
   
  } catch(err){
    return  res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    } 
};


exports.findByQueryParams = async (req, res) => {
  const title = req.query.title;
  try {
  const tutorial =  await Tutorial.findAll({
    where : {
      title : {
        [Op.like] :`%${title}%`
      }
    }
  });

  return res.status(200).send(tutorial);
   
  } catch(error){
    return  res.status(500).send({
        message: "Error retrieving Tutorial with title =" + error.message
      });
    } 
};

exports.findAndCountAllData = async (req, res) => {
  const title = req.query.title;
  console.log(title);
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  try {
  const data = await Tutorial.findAndCountAll({
    where: condition, 
    limit: 5,
    offset: 0,
    });
    return res.status(200).send(data);

  } catch (error) {
    return res.status(500).send({message : `Error occured in paging the data due to : ${error.message}`})
  }

};

// get pagination when limit and offset is not set
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page*limit : 0;
  return { limit, offset };
};

//get paging data
exports.getPagingData = async (req,res) => {
  const { page, size } = req.query;
  const receiveData = getPagination(page, size);

  try {
    const data = await Tutorial.findAndCountAll({
      offset : receiveData.offset,
      limit : receiveData.limit, 
     });
     return res.status(200).send(data);

  } catch(error) {
    return res.status(500).send({message : `Error in paging data : ${error.messages}`});
  }
}