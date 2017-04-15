// public/js/appRoutes.js
app.config(['$routeProvider', '$locationProvider', 'LightboxProvider', '$provide', '$authProvider', function ($routeProvider, $locationProvider, LightboxProvider, $provide, $authProvider) {

    LightboxProvider.fullScreenMode = true;

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
        }).when('/:param1/:slug', {
            //template: '<div>Hi {{param1}}</div>',
            templateUrl: '/views/specificBlog.html',
            controller: 'specificBlogController'
        }).when('/treks', {
            templateUrl: 'views/treks.html',
            controller: 'treksController'
        }).when('/gallery', {
            templateUrl: 'views/gallery.html',
            controller: 'galleryController'
        }).when('/pasttreks', {
            templateUrl: 'views/pastTreks.html',
            controller: 'pastTrekController'
        }).otherwise({
            redirectTo: '/'
        });


    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });



    // Google
    $authProvider.google({
        clientId: '930983681431-o1gr6t3ubvjefoi45ehijih08p6g95ma',
        scope: ['profile', 'email']
    });


    $provide.decorator('taOptions', ['taRegisterTool', '$delegate', '$uibModal', function (taRegisterTool, taOptions, $uibModal) {
        taRegisterTool('uploadImage', {
            buttontext: 'Upload Image',
            iconclass: "fa fa-image",
            action: function (deferred, restoreSelection) {
                $uibModal.open({
                    controller: 'UploadImageModalInstance',
                    templateUrl: '/views/textangularImageUpload.html'
                }).result.then(
                    function (result) {
                        restoreSelection();
                        document.execCommand('insertImage', true, result);
                        deferred.resolve();
                    },
                    function () {
                        deferred.resolve();
                    }
                );
                return false;
            }
        });
        taOptions.toolbar[1].push('uploadImage');
        return taOptions;
    }]);


}]);