// public/js/appRoutes.js
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'mainController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'loginController'
        })
        .when('/trips', {
            templateUrl: 'views/trip.html',
            controller: 'tripController'
        })




    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

}]);