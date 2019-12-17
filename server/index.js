require('dotenv').config();
const express = require('express'),
      session = require('express-session'),
      massive = require('massive'),
      authCtrl = require('./controllers/authController'),
      treasureCtrl = require('./controllers/treasureControllers'),
      auth = require('./middleware/authMiddleware'),
      {SERVER_PORT,CONNECTION_STRING,SESSION_SECRET} = process.env,
      PORT = SERVER_PORT,
      app = express()

app.use(express.json());

massive(CONNECTION_STRING).then(db=>{
    app.set('db',db);
    console.log('db connected')
})

app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
}))

//endpoints
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)

app.get('/api/treasure/dragon',treasureCtrl.dragonTreasure)
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure)
app.post('/api/treasure/user', auth.usersOnly, treasureCtrl.addUserTreasure)
app.get ('/api/treasure/all', auth.usersOnly,auth.adminsOnly,treasureCtrl.getAllTreasure)

app.listen(PORT,() => console.log(`running on ${PORT}`))
      