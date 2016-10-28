app.controller('mainController', function ($scope, sharedservice, httpservice, allEventService, configservice) {

    $scope.tagline = 'Only if you have been in the deepest valley, can you ever know how magnificent it is to be on the highest mountain. — Richard M. Nixon';
    $scope.isLoggedIn = sharedservice.isLoggedIn();
    $scope.isAdmin = false;
    $scope.username = sharedservice.username();
    $scope.trips = [];
    $scope.currentTrip = {};

    $scope.$on('userLoggedin', function () {
        $scope.username = sharedservice.username();
        $scope.isAdmin = false;
    });

    $scope.$on('adminLoggedin', function () {
        $scope.username = sharedservice.username();
        $scope.isAdmin = true;
    });

    $scope.treks = [];
    $scope.blogs = [];

    allEventService.getBlogs().then(function (response) {
        $scope.blogs;
        response.data.map(function (blog) {
            if (blog.type == "BLOG") {
                $scope.blogs.push(blog);
            } else if (blog.type == "TREK") {
                $scope.treks.push(blog);
            }
        });
    }, function (error) {

    })




    //    $scope.updateID = function (tripID) {
    //        for (var i = 0; i < $scope.trips.length; i++) {
    //            if ($scope.trips[i]._id == tripID) {
    //                $scope.currentTrip = $scope.trips[i];
    //                break;
    //            }
    //        };
    //    }

});