var express= require('express');
router= express.Router(),
    user= require('../models/UserSchema');
    task= require('../models/TaskSchema');
    router.get('/', function(req,res) {
        task.find({}, function (err, tasks) {
            if (err) {
                res.status(500).send({
                    message: err,
                    data: []
                });
            } else {
                res.status(200).send({
                    message: 'OK',
                    data: tasks
                });
            }

        });
    });
    router.post('/', function(req,res)
    {
        var taskPost=
            {
            name: req.body.name,
            description: req.body.description,

            deadline: req.body.deadline,
            completed: req.body.completed,

            dateCreated: req.body.dateCreated
           }
        task.create(taskPost, function(err, tasks)
        {
            if (err){
                res.status(500).send({
                    message: err,
                    data: []
                });
            }else{
                res.status(201).send({
                    message: 'OK',
                    data: tasks
                });
            }
        }) ;
    });

router.get('/:id', function(req,res) {
    task.findById(req.params.id, function (err, tasks) {
        if (err) {
            res.status(500).send({
                message: err,
                data: []
            });
        } else {
            res.status(200).send({
                message: 'OK',
                data: tasks
            });
        }

    });
});

    //update  cannot hardcode
    router.put('/:id', function(req,res)
    {
        var taskPost =
            {
            name: req.body.name,
            description: req.body.description,

            deadline: req.body.deadline,
            completed: req.body.completed,

            dateCreated: req.body.dateCreated
            }
        task.findByIdAndUpdate(req.params.id, taskPost, function(err, tasks)
        {
            if (err)
            {
                res.status(500).send({
                    message: err,
                    data: []
                });
            }else
            {
                res.status(201).send({
                    message: 'OK',
                    data: tasks
                });
            }
        });
    });

router.delete('/:id', function(req,res)
{
    task.findByIdAndRemove(req.params.id, function(err,tasks){
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
// router.post('/:id/task', function(req, res){
//     var taskPost= {
//         name: req.body.name,
//         description: req.body.description,
//
//         deadline: req.body.deadline,
//         completed: req.body.completed
//
//     }
//     task.findById(req.params.id, function(err, user){
//         if (err){
//             res.status(500).send({
//                 message:err,
//                 data: []
//             });
//
//         }else{
//             task.create(taskPost, function(err, task){
//                 if (err){
//                     res.status(500).send({
//                         message: err,
//                         data:[]
//                     });
//                 }else{
//                     user.pendingTasks.push(task);
//                     user.save();
//                     res.status(200).send({
//                         message: 'OK',
//                         data: user
//                     });
//
//                 }
//
//             });
//
//         }
//     });
//
//
// });

   module.exports = router;