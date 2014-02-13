var Parse = require('parse').Parse;

var PARSE_APP_KEY = process.env.PARSE_WHOOZIN_APP_KEY;
var PARSE_SDK_KEY = process.env.PARSE_WHOOZIN_SDK_KEY;

Parse.initialize(PARSE_APP_KEY, PARSE_SDK_KEY);

describe('User', function(){

    after(function(done){
        console.log("Delete foobar after tests...")
        var userQuery = new Parse.Query(Parse.User);
        userQuery.equalTo("username", "foobar");
        userQuery.first({
            success: function(user){
                user.destroy({
                    success: function(object){
                        console.log("...User foobar successfully deleted");
                        done();
                    },
                    error: function(object, error){
                        console.log("...Unable to delete foobar ! Fix it now to be able to run the tests again");
                        throw error;
                    }
                })
            },
            error: function(error){
                console.log("...Weird : No user corresponding to foobar");
                throw error;
            }
        })
    })

    describe('#save()', function(){
        it('should save without error', function(done){
            var user = new Parse.User();
            user.set('username', 'foobar');
            user.set('email', 'foo@bar.com');
            user.set('password', 'foobar');
            user.signUp(null, {
                success: function(user) {
                    done();
                },
                error: function(user, error) {
                    console.log("...Unable to create foobar user")
                    throw error;
                }
            });
        })
        it('should not be able to save foobar again', function(done){
            var user = new Parse.User();
            user.set('username', 'foobar');
            user.set('email', 'foo@bar.com');
            user.set('password', 'foobar');
            user.signUp(null, {
                success: function(user) {
                    throw 'Foobar saved again ! This should not append';
                },
                error: function(user, error) {
                    done();
                }
            });
        })
    })

    describe('#logIn()', function(){
        it('should be log in foobar', function(done){
            Parse.User.logIn("foobar", "foobar", {
                success: function(user) {
                    done();
                },
                error: function(user, error) {
                    throw error;
                }
            });
        })
    })
})