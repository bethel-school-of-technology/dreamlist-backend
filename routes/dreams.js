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
        models.dreams.create({...req.body, UserId: users.UserId}).then(newDream =>{
            res.json({dreams: newDream});
        }).catch(err => {
            res.status(400);
            res.send(err.message);
        });
    });
})
// router.post('/add', function(req, res, next) {
//     models.dreams
//     .findOrCreate({
//         where: {
//             DreamId: req.body.DreamId
//         },
//         defaults: {
//             DreamTitle: req.body.DreamTitle,
//             DreamBody: req.body.DreamBody
//         }
//       })
//       .spread(function(result, created) {
//         if (created) {
//           res.send('Dream successfully created');
//         } else {
//           res.send('There was a problem creating this dream');
//         }
//       });
//   });


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
