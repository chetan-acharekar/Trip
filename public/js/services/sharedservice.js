app.factory('sharedservice', function ($http, $window) {
    var self = this;
    return {
        'isLoggedIn': function () {
            return $window.sessionStorage.getItem('isLoggedIn');
        },
        'username': function () {
            return $window.sessionStorage.getItem('username');
        },
        'userId': function () {
            return $window.sessionStorage.getItem('userId');
        },
        'setuserlogin': function (username, userId) {
            $window.sessionStorage.setItem('isLoggedIn', true);
            $window.sessionStorage.setItem('username', username);
            $window.sessionStorage.setItem('userId', userId);
        },
        'logout': function () {
            $window.sessionStorage.removeItem('isLoggedIn');
            $window.sessionStorage.removeItem('username');
            $window.sessionStorage.removeItem('userId');
        }
    }
});