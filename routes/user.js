var express= require('express');
    router= express.Router(),
    user= require('../models/UserSchema');
    task= require('../models/TaskSchema');
   router.get('/', function(req,res)
   {
       user.find({}, function (err, users) {
           if (err) {
               res.status(500).send({
                   message: err,
                   data: []
               });
           } else {
               res.status(200).send({
                   message: 'OK',
                   data: users
               });
           }

       });
   });
   router.post('/', function(req,res){
       var userPost= {
           name: req.body.name,
           email: req.body.email,
           pendingTasks: req.body.pendingTasks,
           dateCreated: req.body.dateCreated
       };
       user.create(userPost, function(err, users){
           if (err){
               res.status(500).send({
                   message: err,
                   data: []
               });
           }else{
               res.status(201).send({
                   message: 'OK',
                   data: users
               });
           }
       });
   });

   router.get('/:id', function(req, res){
       user.findById(req.params.id, function(err, users){
           if (err){
               res.status(500).send({
                   massage: err,
                   data:[]
               });
           }else{
               res.status(200).send({
                   massage:'OK',
                   data: users
               })
           }
       })
   });
   //update  cannot hardcode
   router.put('/:id', function(req,res){
       var userPost ={
           name: req.body.name,
           email: req.body.email,
           //pendingTasks: req.body.pendingTasks,
               dateCreated: req.body.dateCreated
       }
       user.findByIdAndUpdate(req.params.id, userPost, function(err, users){
           if (err){
               res.status(500).send({
                   message: err,
                   data: []
               });
           }else{
               res.status(201).send({
                   message: 'OK',
                   data: users
               });
           }
       });
   });

   router.delete('/:id', function(req,res){
       user.findByIdAndRemove(req.params.id, function(err,users){
           if (err){
               res.status(500).send({
                   message: err,
                   data: []
               });
           }else{
               res.status(201).send({
                   message: 'resources deleted',
                   data:[]
               });
           }
       })
   });

 /* add one task to pendingtask of a user given its userid*/
 /* right now the pendingtasks of user in userlist is added*/
   router.post('/:id/task', function(req, res){

       user.findById(req.params.id, function(err, user){
           if (err){
               res.status(500).send({
                   message:err,
                   data: []
               });

           }else{

               var taskPost= {
                   name: req.body.name,
                   description: req.body.description,
                   assignedUser: req.params.id,
                   assignedUserName: user.name,
                   deadline: req.body.deadline,
                   completed: req.body.completed

               }

               task.create(taskPost, function(err, task){
                 if (err){
                     res.status(500).send({
                         message: err,
                         data:[]
                     });
                 }else{
                     user.pendingTasks.push(task);
                     user.save();
                     res.status(200).send({
                         message: 'OK',
                         data: user

                     });


                 }

               });

           }
       });


   });

   module.exports = router;