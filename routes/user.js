var express= require('express');
    router= express.Router(),
    user= require('../models/UserSchema');
    task= require('../models/TaskSchema');
   router.get('/', function(req,res)
   {

       var query;
       if (req.query.count && req.query.count=="true"){

           query= user.count({});

       }
       else   query= task.find({});

       if (req.query.where){
           query.where(JSON.parse(req.query.where));

       }
       if (req.query.sort){
           query.sort(JSON.parse(req.query.sort));
       }

       if (req.query.select){
           query.select(JSON.parse(req.query.select));
       }

       if (req.query.skip){
           query.skip(Number(req.query.skip))
       }
       if (req.query.limit){
           query.limit(Number(req.query.limit));
       }

       query.exec( function (err, users){
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
       user.count({email: req.body.email}, function (err, count){
           if(count>0){
               res.status(400).send({
                   message: 'email already exist',
                   data:[]
               });
           }else
               {
               if (req.body.name===null || req.body.email===null) {
                   res.status(400).send({
                       message: 'user could not be created without a name or email',
                       data: []
                   });
               }else
                   {user.create(userPost, function(err, users)
               {
                   if (err){
                       res.status(500).send({
                           message: err,
                           data: []
                       });
                   }
                   else{
                       res.status(201).send({
                           message: 'OK',
                           data: users
                       });
                       }
               });
                     }

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
       if (req.body.name===null || req.body.email===null){
           res.status(400).send({
               message: 'user could not be updated without a name or email',
               data:[]
           });
       }
       else{
           user.count({email: req.body.email}, function (err, count) {
               if (count > 0) {
                   res.status(400).send({
                       message: 'email already exist',
                       data: []
                   });
               }
               else {
                   user.findByIdAndSave(req.params.id, userPost, function (err, users) {
                       if (err) {
                           res.status(500).send({
                               message: err,
                               data: []
                           });
                       } else if (users === null) {
                           res.status(404).send({
                               message: 'User does not exist ',
                               data: []
                           })
                       } else {
                           res.status(200).send({
                               message: 'OK',
                               data: users
                           });
                       }
                   });
               }

           });
       }

   });

   router.delete('/:id', function(req,res){
       user.findByIdAndRemove(req.params.id, function(err,users){
           if (err){
               res.status(500).send({
                   message: err,
                   data: []
               });
           }else if (users===null){
               res.status(404).send({
                   message: 'User does not exist ',
                   data:[]
               })
           }else{
               res.status(200).send({
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

           }else if (users===null){
               res.status(404).send({
                   message: 'User does not exist ',
                   data:[]
               })
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
                 }else if (req.body.name===null || req.body.deadline===null){
                     res.status(404).send({
                         message: 'task could not be created without a name or deadline',
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