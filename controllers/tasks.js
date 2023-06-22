   const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async');


const getAllTasks =asyncWrapper( async (req,res) =>{
    // res.send("All items from controllers task");
   
        const tasks = await Task.find({});
        res.status(200).json( {tasks} );
        // res.status(200).json( {tasks,amount: tasks.length } );
        // res.status(200).json( {status:'Success',data:{tasks, nbHits:tasks.length} } );
})
//Apply asyncWrapper in other fun()  -createTask,editTask,updateTask,deleteTask.
const createTask = async (req,res)=>{
    try{
        const task = await Task.create(req.body)
        res.send(201).json( {task})
    }
    catch(err)
    {
        // Console.log(err);
        res.status(500).send( {msg: err});
    }
}
const getTask = asyncWrapper(async (req,res,next)=>{ 
        const{ id: taskID} = req.params;
        const task = await Task.findOne({_id: taskID });
        if(!task)  {
            const error = new Error('Not Found');
            error.status =404;
            return next(error);
            return res.status(404).json({ msg: `No task with ID : ${taskID}` });
        }
        res.status(200).json( {task});
    
})

const deleteTask = async (req,res)=>{
    // res.send('Delete Task');
    try {
        const {id:taskID}  = req.params;
        const task = await Task.findOneAndDelete( {_id: taskID});
        if(!task)  {
            return res.status(404).json({ msg: `No task with ID : ${taskID}` });
        }
        res.status(200).json({task: null, status: 'success'}); //check once
    }
    catch(err)   {
        console.log(err);
        res.status(500).send( {msg: err});
    }
}

const updateTask = async (req,res)=>{
    // res.send('Update Task');
    try {
        const{ id: taskID} = req.params;
        const task = await Task.findOneAndUpdate( {_id: taskID}, req.body, {
            new: true,runValidators: true,
        })
        if(!task)  {
            return res.status(404).json({ msg: `No task with ID : ${taskID}` });
        }
        res.status(200).json( {task});
    }
    catch(err) {
        res.status(500).send( {msg: err});
    }
}

const editTask = async (req,res)=>{
    // res.send('Update Task');
    try {
        const{ id: taskID} = req.params;
        const task = await Task.findOneAndUpdate( {_id: taskID}, req.body, {
            new: true,runValidators: true,
            overWrite: true,
        })
        if(!task)  {
            return res.status(404).json({ msg: `No task with ID : ${taskID}` });
        }
        res.status(200).json( {task});
    }
    catch(err) {
        res.status(500).send( {msg: err});
    }
}



module.exports = {
    getAllTasks,createTask, getTask, updateTask, deleteTask,editTask
}