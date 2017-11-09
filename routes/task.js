var express= require('express');
router= express.Router(),
    user= require('../models/UserSchema');
    task= require('../models/TaskSchema');
    router.get('/', function(req,res) {
       var query;
        if (req.query.count && req.query.count=="true"){

            query= task.count({});

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
            query.skip(req.query.skip)
        }
        if (req.query.limit){
            query.limit(req.query.limit);
        }

        query.exec( function (err, tasks){
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
            assignedUser: req.body.assignedUser,
            assignedUserName: req.body.assignedUserName,
            dateCreated: req.body.dateCreated
           }

        if (req.body.name==null || req.body.deadline==null){
        res.status(400).send({
            message: 'task could not be created without a name or deadline',
            data:[]
        });
      }else{
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
        }

    });

router.get('/:id', function(req,res) {

    var query;
    if (req.query.count && req.query.count=="true"){

        query= task.count({});

    }
    else   query= task.findById(req.params.id, {});

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
        query.skip(req.query.skip)
    }
    if (req.query.limit){
        query.limit(req.query.limit);
    }

    query.exec( function (err, tasks){
        if (err) {
            res.status(500).send({
                message: err,
                data: []
            });
        } else if (tasks==null){
            res.status(404).send({
                message: 'Task does not exist ',
                data:[]
            })
        }else {
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
        task.findByIdAndSave(req.params.id, taskPost, function(err, tasks)
        {
            if (err)
            {
                res.status(500).send({
                    message: err,
                    data: []
                });
            }else if (tasks==null){
                res.status(404).send({
                    message: 'Task does not exist ',
                    data:[]
                })
            }else if (req.body.name===null || req.body.deadline===null){
                res.status(400).send({
                    message: 'task could not be created without a name or deadline',
                    data:[]
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
        }else if (tasks==null){
            res.status(404).send({
                message: 'Task does not exist ',
                data:[]
            })
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