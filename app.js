
const express = require("express");
const app = express();
const connectDB = require('./db/connect');
require('dotenv').config()

const tasks = require('./routes/tasks')
const notFound = require('./middleware/Not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//Middlewares
app.use(express.json() );
app.use(express.static('./public'));
app.use('/api/v1/tasks', tasks);

//routes
// app.get('/api/v1/tasks')         -get all the tasks
// app.post('api/v1/tasks')         -create a new task
// app.get('api/v1/tasks/:id')      -get single task
// app.patch('/api/v1/tasks/:id')   -update task
// app.delete('/api/v1/tasks/:id')  -delete task 
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3001
const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, ()=>{
            console.log(`Server is listening on port ${port}`);
        })
    }
    catch(err)   {
        console.log(err);
    }

}
start();