const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

const routes = require('./routes/routes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);