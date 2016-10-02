var express = require('express'),
    app = express(),
    bodyparser = require('body-parser'),
    config = require('./config.js'),
    userroute = require('./routes/user.js'),
    adminroute = require('./routes/admin.js'),
    loginroute = require('./routes/login.js'),
    triproute = require('./routes/trip.js'),
    chatroute = require('./routes/chat.js'),
    auth = require('./middlewares/authenticator.js');

app.use(bodyparser.json());
app.use(express.static('public'));
//app.use(auth);
app.use('/api/user', userroute);
app.use('/api/chat', chatroute);
app.use('/api/trip', triproute);
app.use('/api/user/admin', adminroute);
app.use('/api/login', loginroute);

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(5555, function () {
    console.log('Express app started')
});