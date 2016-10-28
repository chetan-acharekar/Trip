// public/js/appRoutes.js
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'mainController'
        }).when('/blogs', {
            templateUrl: 'views/blogs.html',
            //template: 'hi',
            controller: 'blogsController'
        }).when('/login', {
            templateUrl: 'views/login.html',
            controller: 'loginController'
        }).when('/tripadd', {
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
        }).when('/specificblogs/:param1', {
            //template: '<div>Hi {{param1}}</div>',
            templateUrl: '/views/specificBlog.html',
            controller: 'specificBlogController'
        }).when('/treks', {
            templateUrl: 'views/treks.html',
            controller: 'treksController'
        }).otherwise({
            redirectTo: '/'
        });




    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

}]);