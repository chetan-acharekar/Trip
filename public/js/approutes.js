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
        .when('/tripadd', {
            templateUrl: 'views/tripadd.html',
            controller: 'tripAddController'
        }).when('/chat', {
            templateUrl: 'views/chat.html',
            controller: 'chatController'
        }).when('/menu', {
            templateUrl: 'views/adminmenu.html',
            controller: 'adminMenuController'
        }).when('/upload', {
            templateUrl: 'views/uploadimages.html',
            controller: 'uploadController'
        }).when('/tripedit', {
            templateUrl: 'views/tripedit.html',
            controller: 'tripEditController'
        })





    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

}]);