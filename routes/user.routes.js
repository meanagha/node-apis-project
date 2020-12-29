const {check, validationResult} = require('express-validator');
const db = require("../models");
const User = db.user;
const logger = require("../config/logger");
const users = require("../controllers/user.controller.js");

module.exports = app => {
  var router = require("express").Router();
  // Create a new User
  router.post("/",[    
    check('password').not().isEmpty().withMessage('Password is required.'),
    check('cpassword').not().isEmpty().withMessage('Confirm Password is required.')
      .custom(async (cpassword, {req}) => { 
        const password = req.body.password        
        if(password !== cpassword){ 
         logger.error("Passwords must be same")
          throw new Error('Passwords must be same') 
        } 
    }),
    check('email').not().isEmpty().withMessage('Email is required.')
    .custom((value, {req}) => {
      return new Promise((resolve, reject) => {
        User.findOne({
          where : {
            email:req.body.email
          }
        }).then(data => {          
            if(data){
              logger.error("E-mail already in use")
              reject("E-mail already in use")
            }else{
              resolve(true)
            }                      
          })
          .catch(err => {
            reject("Server Error")
          });                    
      });    
    }),
    check('mobile').not().isEmpty().withMessage('Mobile is required.'),
    check('items.*.name').not().isEmpty().withMessage('Product Name is required.'),
    check('items.*.manufacture_date').not().isEmpty().withMessage('Manufacture date is required.')

  ],
  users.create);

  // Retrieve all users
  router.get("/users", users.findAll);

  // Retrieve a single User with id
  router.get("/:id", users.findOne);

  // Update a Tutorial with id
  router.put("/:id",[    
    check('password').not().isEmpty().withMessage('Password is required.'),
    check('cpassword').not().isEmpty().withMessage('Confirm Password is required.')
      .custom(async (cpassword, {req}) => { 
        const password = req.body.password        
        if(password !== cpassword){ 
         logger.error("Passwords must be same")
          throw new Error('Passwords must be same') 
        } 
    }),
    check('email').not().isEmpty().withMessage('Email is required.')
    .custom((value, {req}) => {
      return new Promise((resolve, reject) => {
        User.findOne({
          where : {
            email:req.body.email
          }
        }).then(data => {          
            if(data){
              
              logger.error("E-mail already in use")
              reject("E-mail already in use")
            }else{
              resolve(true)
            }                      
          })
          .catch(err => {
            reject("Server Error")
          });                    
      });    
    }),
    check('mobile').not().isEmpty().withMessage('Mobile is required.'),    
  ],users.update);


  app.use(router);
};