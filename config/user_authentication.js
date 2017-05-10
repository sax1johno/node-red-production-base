var when = require("when"),
    _ = require('underscore');

module.exports = function(seneca) {
    return {
        type: "credentials",
        users: function(username) {
            return when.promise(function(resolve, reject) {
                seneca
                  .client(
                         {
                             type: 'tcp', host: 'management_users'
                            //  pins: [{ role: "views", cmd: "*" }]
                         }
                     ) // Connects up with the "views" engine. 
                    .ready(function(err) {
                        if (err) {
                            reject(err);
                        }
                         seneca.act({
                             role: "Users",
                             cmd: "retrieve",
                             nick: username
                         }, function(err, result) {
                             if (err) reject(err);
                             else {
                                 resolve(result.user);
                             }
                         });
                        // if (err) reject(err);
                        // else {
                        //     var User = seneca.make("sys_user");
                        //     User.load$({
                        //         "username": username
                        //     }, function(err, user) {
                        //         if (err) reject(err);
                        //         resolve(user);
                        //     });
                        // }
                    });
            });
        },
        authenticate: function(username, password) {
            return when.promise(function(resolve, reject) {
                // Do whatever work is needed to validate the username/password
                // combination.
                seneca
                  .client(
                         {
                             type: 'tcp', host: 'management_users'
                            //  pins: [{ role: "views", cmd: "*" }]
                         }
                     ) // Connects up with the "views" engine. 
                    .ready(function(err) {
                        if (err) {
                            reject(err);
                        }
                         seneca.act({
                             role: "user",
                             cmd: "login",
                             nick: username,
                             password: password
                         }, function(err, result) {
                             if (err) reject(err);
                             else {
                                if (!result.ok) {
                                    resolve(null);
                                } else {
                                    resolve({"username": username, "permissions": "*"});
                                }
                             }
                         });
                        // if (err) reject(err);
                        // else {
                        //     var User = seneca.make("sys_user");
                        //     User.load$({
                        //         "username": username
                        //     }, function(err, user) {
                        //         if (err) reject(err);
                        //         resolve(user);
                        //     });
                        // }
                    });                
                // if (valid) {
                //     // Resolve with the user object. Equivalent to having
                //     // called users(username);
                //     var user = { username: "admin", permissions: "*" };
                //     resolve(user);
                // } else {
                //     // Resolve with null to indicate the username/password pair
                //     // were not valid.
                //     resolve(null);
                // }
            });
        },
        default: function() {
            return when.promise(function(resolve, reject) {
                // Resolve with the user object for the default user.
                // If no default user exists, resolve with null.
                // resolve({anonymous: true, permissions:"read"});
                resolve(null);
            });
        }
    };
};