const express = require('express')
const app = express()
const connectDB = require('./config/db')
const path = require('path')

//Connect DB
connectDB()


// PORT
const PORT = process.env.PORT || 5000 

//Init Middleware
app.use(express.json({limit: '50mb',extended:true}))

// Users routes
app.use('/api/users',require('./routes/users'))

// Auth routes
app.use('/api/auth',require('./routes/auth'))

// Post routes
app.use('/api/posts',require('./routes/posts'))

// Comments routes
app.use('/api/comments',require('./routes/comments'))

// Notifications routes
app.use('/api/notifications',require('./routes/notifications'))


//Serve static assets in production

if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build'))

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname,'client','build','index.html')))
}



// App listening to the port
app.listen(PORT, () => console.log(`Server started on port : ${PORT}`))