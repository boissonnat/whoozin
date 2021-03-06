exports.create = function (Parse) {
  return function (req, res) {
    res.render('registered/activities/create', { title: 'Create a new activity', user: Parse.User.current() });
  }
};

exports.save = function (Parse) {
  return function (req, res) {
    var post = req.body;

    // Create a Parse object
    var Activity = Parse.Object.extend("Activity");
    var activity = new Activity();
    activity.set("title", post.title);
    activity.set("description", post.description);
    activity.set("minParticipant", post.minParticipant);
    activity.set("maxParticipant", post.maxParticipant);
    activity.set("author", Parse.User.current().get("username"));

    // And save it
    activity.save(null, {
      success: function(activity) {
        // Saved with success, return to the home page...
        res.redirect("/")

      },
      error: function(activity, error) {
        res.render('registered/activities/create', {title: 'Create new activity', error: error.message, user: Parse.User.current()})
      }
    });
  }
};

exports.edit = function (Parse) {
  return function (req, res) {
    var activityId = req.params.id;
    // Get activity from Parse
    var Activity = Parse.Object.extend("Activity");
    var query = new Parse.Query(Activity);
    query.get(activityId).then(function(activity) {
      // Activity found
      res.render('registered/activities/edit', { title: 'Edit a new activity' + activity.get("title"),activity: activity, user: Parse.User.current() });
    },function(object, error) {
      // Activity not found
      console.log("Unable to find this activity");
      res.redirect("/")
    });
  }
};


exports.update = function (Parse) {
  return function (req, res) {
    var post = req.body;

    // Create a Parse object
    var activityId = post.id;
    // Get activity from Parse
    var Activity = Parse.Object.extend("Activity");
    var query = new Parse.Query(Activity);
    query.get(activityId).then(function(activity) {
      // Activity found, set its properties
      activity.set("title", post.title);
      activity.set("description", post.description);
      activity.set("minParticipant", post.minParticipant);
      activity.set("maxParticipant", post.maxParticipant);
      activity.save();
      res.redirect("/")

    },function(object, error) {
      // Activity not found
      console.log("Unable to find this activity");
      res.redirect("/")
    });
  }
};

exports.destroy = function (Parse) {
  return function (req, res) {
    var activityId = req.params.id;
    // Get activity from Parse
    var Activity = Parse.Object.extend("Activity");
    var query = new Parse.Query(Activity);
    query.get(activityId).then(function(activity) {
      // Activity found -> delete it
      activity.destroy();
      res.redirect("/")
    },function(object, error) {
      // Activity not found
      console.log("Unable to find this activity");
      res.redirect("/")
    });
  }
};



exports.show = function (Parse) {
  return function (req, res) {
    var activityId = req.params.id;
    // Get activity from Parse
    var Activity = Parse.Object.extend("Activity");
    var query = new Parse.Query(Activity);
    query.get(activityId).then(function(activity) {
      // Activity found
      res.render('registered/activities/show', {title: activity.get("title"), activity: activity, user: Parse.User.current()})
    },function(object, error) {
      // Activity not found
      console.log("Unable to find this activity");
      res.redirect("/")
    });
  }
};
