app.factory('sharedservice', function ($http, $window) {
    var self = this;
    return {
        'isLoggedIn': function () {
            return $window.sessionStorage.getItem('isLoggedIn');
        },
        'username': function () {
            return $window.sessionStorage.getItem('username');
        },
        'setuserlogin': function (username) {
            $window.sessionStorage.setItem('isLoggedIn', true);
            $window.sessionStorage.setItem('username', username);
        }
    }
});