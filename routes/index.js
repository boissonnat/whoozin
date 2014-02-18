/*
 * GET home page.
 */

exports.index = function (Parse) {
  return function (req, res) {
    if (Parse.User.current()) {
      // There is a connected user.
      // grab all activities for the current user
      var Activity = Parse.Object.extend("Activity");
      var query = new Parse.Query(Activity);
      query.equalTo("author", Parse.User.current().get("username"));
      query.find().then(function(results) {
        console.log("Results = " + results)
        res.render('registered/index', { title: 'Whoozin', user: Parse.User.current(), activities: results});
      }, function(error) {
        console.log("Error: " + error.code + " " + error.message);
        res.render('registered/index', { title: 'Whoozin', user: Parse.User.current(), activities: null});
      });

    } else {
      // No user found, display regular HomePage
      res.render('guest/index', { title: 'Whoozin' });
    }

  };
}