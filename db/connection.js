//  importing mongoose
const mongoose = require('mongoose');

// connecting mongodb to app
mongoose.connect(`mongodb://127.0.0.1:27017/bookselling`).then(()=>{
    console.log("connected successfully");
})