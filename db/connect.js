const mongoose = require("mongoose");
//3 changes done in this link to get connected: usename, password, ? wala part..
// const connectionString = 'mongodb+srv://mittalmayank036:hf3nPuKOhd2KtXw8@nodeexpressproject1.wrswebo.mongodb.net/03-task-manager?retryWrites=true&w=majority';

const connectDB =(url) => {
    return mongoose.connect(url,{
         useNewUrlParser : true,
         useCreateIndex: true,
         useFindAndModify: false,
         useUnifiedTopology: true, }
         )
}
module.exports = connectDB;
