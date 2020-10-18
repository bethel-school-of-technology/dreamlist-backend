var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth'); 

router.get('/', (req, res) => {

    let token = req.cookies.token;
    authService.verifyUser(token).then(user => {

        if(user == null){
            return res.json({message: "User not logged in."})
        }

        models.dreams.findAll({ where: {
            UserId: user.UserId
        }}).then(result =>{
            res.json({ dreams: result});
        })
    });
})

router.get('/:id', (req, res) => {

    let token = req.cookies.token;
    authService.verifyUser(token).then(user => {

        if(user == null){
            return res.json({message: "User not logged in."})
        }

        models.dreams
        .findOne({
            where: {
                UserId: parseInt(req.params.UserId),
                UserId: user.UserId
            }
        }).then(dreamFound => {
            res.json({dream: dreamFound})
        })
    })
})

router.post('/add', (req, res) => {
    let token = req.cookies.token;
    authService.verifyUser(token).then(user => {

        if(user == null){
            return res.json({message: "User not logged in."})
        }
        models.dreams.create({...req.body, UserId: user.UserId}).then(newDream =>{
            res.json({dream: newDream});
        }).catch(err => {
            res.status(400);
            res.send(err.message);
        });
    });
})

router.put('/:id', (req, res) => {
    let token = req.cookies.token;
    authService.verifyUser(token).then(user => {

        if(user == null){
            return res.json({message: "User not logged in."})
        }
        models.dreams.update(req.body, { where: { UserId: parseInt(req.params.UserId), UserId: user.UserId}})
        .then(result => res.json({message: "Quote has been updated!"}))
        .catch(err =>{
            res.status(400);
            res.json({message: "There was an error updating the quote!"})
        })
    });
})

router.delete('/:id', (req, res) => {
    let token = req.cookies.token;
    authService.verifyUser(token).then(user => {

        if(user == null){
            return res.json({message: "User not logged in."})
        }
        models.dreams.destroy({ where: { UserId: parseInt(req.params.Userid), UserId: user.UserId}})
        .then(result => res.json({message: "Quote has been deleted!"}))
        .catch(err =>{
            res.status(400);
            res.json({message: "There was an error deleting the quote!"})
        })
    });
});

module.exports = router;