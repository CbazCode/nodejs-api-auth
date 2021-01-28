const express = require('express');
const { dbConnection } = require('./database/config.js');

// Intializations
const app = express();

dbConnection();

//Middlewares
app.use(express.json());

//Settings
app.set('port', process.env.PORT || 3000);

//Routes
app.use('/api/user',require('./routes/auth.js'));
app.use('/api/posts',require('./routes/posts.js'));

app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
})