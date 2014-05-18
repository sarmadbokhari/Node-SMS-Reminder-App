var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var reminders = require('./routes/reminders');

var app = express();

Firebase = require('firebase');
userReminder = new Firebase('https://sarmad-reminder-app.firebaseio.com/Reminders');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/reminders', reminders);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

// Time Cron functionality here:
var CronJob = require('cron').CronJob;
// every 30 min === (0,30 * * * *)
var job = new CronJob('0 * * * * *', function(){
    console.log('this is running');

    userReminder.on('value', function(snapshot){
        if (snapshot.val() === null){
            console.log("No info exists in database, returning null");
        } else {
            var theTimeNow = Date.now();

            var theReminders = Object.keys(snapshot.val()); //Array with all reminders
            for (var i = 0; i < theReminders.length; i++){
                var theDate = theReminders[i]['date'];
                var theTime = theReminders[i]['time'];
                var timeObj = new Date("'" + theDate + " " + theTime + "'");

                if ((theTimeNow - timeObj) < 0){
                   console.log(theReminders[i]['content'] + " SENT FROM " + theReminders[i]['sender']);
                   // TWILIO CALL HERE
                   theReminder[i]['sent'] = "true";
                }
            }
        }
    }

});
},
null,
true);

// only needed if job.start set to false above
// job.start();
