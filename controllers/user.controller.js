const db = require("../models");
const User = db.user;
const Item = db.item;

const { check, validationResult } = require('express-validator');
const fs = require('fs');
const mime = require('mime');
const logger = require("../config/logger");

const Op = db.Sequelize.Op;

exports.create = (req, res) => {   

    const users = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
    } else {        
        User.create(users, {
            include: [
            {          
                model: Item, 
                as: "items"            
            }]
        })
        .then(data => {
            logger.info("Inserted succssfully")
            res.send(data);
        })
        .catch(err => {
            logger.error("CATCH :: Some error occurred while creating the USER.")        
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the User."
            });
        });
    }
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    User.findAll({        
         attributes: ['id','name','email','mobile','password'],
         include: [
            {          
                model: Item, 
                as: "items",
                attributes: ['id','name','rent_price','actual_price','rent_status','manufacture_date'],            
            }]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

exports.findOne = (req, res) => {
  
};

// Update a User by the id in the request
exports.update = (req, res) => {

    const users = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
    } else { 
        const id = req.params.id;
        User.update(users, {
        where: { id: id },
        })
        .then(num => {            
            if (num == 1) {
            res.send({
                message: "User was updated successfully."
            });
            } else {
            res.send({
                message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
            });
            }
        })
        .catch(err => {
            res.status(500).send({
            message: "Error updating User with id=" + id
            });
        });
    }
  };

