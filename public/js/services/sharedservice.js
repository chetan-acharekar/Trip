app.factory('sharedservice', function ($http) {
    return {
        'isLoggedIn': false,
        'username': null
    }
});