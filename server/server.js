const path = require('path'); //path is built-in
const express = require('express'); //import express
const app = express(); //create an instance of express
const publicPath = path.join(__dirname, '..', 'public'); //just like we did for webpack config
const port = process.env.port || 3000; // use Heroku's provided env variable, if avaialable

//tell where our files live & what port to listen on 
app.use(express.static(publicPath));
app.listen(port,() => {
    console.log('Server is up!');
} ); //port to listen to and the callback function that gets called when server is up

// the following lets us a set up a function to run when someone makes a GET req to our server. eg: '/create'. for everything unmatched, denoted by '*', we want to serve the indeex.html
// this is doing the same thing we did for webpack dev server (historApiFallback)
app.get('*' , (req, res) => { // req & res are request and response OBJECTS
    res.sendFile(path.join(publicPath, 'index.html')); 
});