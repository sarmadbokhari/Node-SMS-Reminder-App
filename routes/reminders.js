var express = require('express');
var router = express.Router();

/* GET reminders page. */
router.get('/', function(req, res) {
  res.render('reminders', { title: 'Your Reminders' });
});

router.post('/add', function(req, res) {
  var remindText = req.body.reminder;
  var number = req.body.number;

  userReminder.push({from: "user"});

  res.render('confirm');
  console.log('post received', remindText, number);

});

router.get('/update/:id', function(req, res){
  var remRef = new Firebase(firebase_api_here + req.params.id);
  console.log(req.params.id);
  remRef.once('value', function(data){
    console.log(data.val().text);
    res.render("confirm");
  });
});

// router.post('/update', function(req, res) {
//   var remindText = req.body.reminder;
//   var number = req.body.number;
//   res.render('confirm');
//   console.log('post received', remindText, number);

//   // firebase
// });

module.exports = router;
