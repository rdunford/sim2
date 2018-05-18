const express = require('express')
, bodyParser = require('body-parser')
, cors = require('cors')
, session = require('express-session')
, massive = require('massive')

//  Middleware
, checkForSession = require('./middleware/checkForSession')

//  Controllers
, auth_ctrl = require('./controller/user_controller')
, prop_ctrl = require('./controller/property_controller')

require('dotenv').config();

let app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: 2299000000
}));
app.use(checkForSession);

massive(process.env.CONNECTION_STRING).then( dbInstance =>{
    app.set('db', dbInstance);
});



// User Endpoints
app.post(`/api/auth/login`, auth_ctrl.login)
app.post(`/api/auth/register`, auth_ctrl.register)
app.post(`/api/auth/logout`, auth_ctrl.logout)
// app.get(`/api/auth/`)


// Proptery Endpoints
app.post(`/api/properties`, prop_ctrl.createProperty)
app.get(`/api/properties`, prop_ctrl.getProperty)
app.delete(`/api/properties/:id`, prop_ctrl.deleteProperty)





const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`${new Date()}, Server listening on: ${PORT}`));