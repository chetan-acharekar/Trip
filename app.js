var express = require('express'),
    app = express(),
    bodyparser = require('body-parser'),
    config = require('./config.js'),
    userroute = require('./routes/user.js'),
    adminroute = require('./routes/admin.js'),
    loginroute = require('./routes/login.js'),
    triproute = require('./routes/trip.js'),
    chatroute = require('./routes/chat.js'),
    auth = require('./middlewares/authenticator.js'),
    socialAuth = require('./routes/auth.js'),
    logroute = require('./routes/logger'),
    imageuploadroute = require('./routes/imageupload.js'),
    http = require('http').Server(app),
    MobileDetect = require('mobile-detect'),
    io = require('socket.io')(http);


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(bodyparser.json());
app.use(express.static('public'));



//app.use(auth);
app.use('/api/user', userroute);
app.use('/api/chat', chatroute);
app.use('/api/trip', triproute);
app.use('/api/user/admin', adminroute);
app.use('/api/login', loginroute);
app.use('/api/image', imageuploadroute);
app.use('/api/log', logroute);
app.use('/auth', socialAuth);


app.get('*', function (req, res) {
    var md = new MobileDetect(req.headers['user-agent']);
    if (md.mobile() == null) {
        res.sendFile(__dirname + '/public/desktop.html');
    } else {
        res.redirect('http://m.trekkingtoads.com')
    }
});

http.listen(8080, function () {
    console.log('Express app started')
});

io.on('connection', function (socket) {
    socket.on('chatupdated', function () {
        io.emit('updatechatlist', 'msg');
    })
});
