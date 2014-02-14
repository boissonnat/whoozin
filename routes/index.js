/*
 * GET home page.
 */

exports.index = function (Parse) {
  return function (req, res) {
    if (Parse.User.current()) {
      res.render('registered/index', { title: 'Whoozin', user: Parse.User.current()});
    } else {
      res.render('guest/index', { title: 'Whoozin' });
    }

  };
}