var express = require('express');
var router = express.Router();

/* GET reminders page. */
router.get('/', function(req, res) {
  res.render('reminders', { title: 'Your Reminders' });
});

router.post('/add', function(req, res) {
  var remindText = req.body.reminder;
  var number = req.body.number;
  var sender = req.body.sender;
  var date = req.body.date;
  var time = req.body.time;
  var theTime = new Date("'" + date + " " + time + "'");

  // sending data to firebase here (see app.js for userReminder)
  var servedReminder = userReminder.push({sender: sender, to_number: number, content: remindText, theTime: theTime});
  // Get id of reminder:
  var reminderID = servedReminder.name();


  console.log('post received', sender, number, remindText, theTime);
  res.render('confirm', {theID: reminderID, content: remindText, number: number, theTime: theTime});

});

router.get('/update/:id', function(req, res){
  var remRef = new Firebase("https://sarmad-reminder-app.firebaseio.com/Reminders/" + req.params.id);
  // get reminder from firebase


  console.log(req.params.id);
  remRef.once('value', function(data){
    if (!data.val()){
      res.render("error",  { message: "Invalid Reminder", error: { stack: null, status: null}});
    }
    else {
      console.log(data.val().text);
      res.render("update", {theReminder: data.val(), theID: req.params.id});
    }

  });
});

router.post('/update', function(req, res){
  var updatedText = req.body.reminder;
  var updatedNumber = req.body.number;
  var date = req.body.date;
  var time = req.body.time;
  var theTime = new Date("'" + date + " " + time + "'");

  var updateRem = new Firebase("https://sarmad-reminder-app.firebaseio.com/Reminders/" + req.body.id);

  updateRem.update({content: updatedText, to_number: updatedNumber, theTime: theTime});

  console.log('post received', updatedText, updatedNumber, theTime);

  res.render('confirm', {content: updatedText, number: updatedNumber, theID: req.body.id, theTime: theTime});
});

// router.post('/update', function(req, res) {
//   var remindText = req.body.reminder;
//   var number = req.body.number;
//   res.render('confirm');
//   console.log('post received', remindText, number);

//   // firebase
// });

module.exports = router;
