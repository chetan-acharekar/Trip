app.controller('mainController', function ($scope, $interval, sharedservice, httpservice, allEventService, configservice) {

    $scope.isLoggedIn = sharedservice.isLoggedIn();
    $scope.isAdmin = false;
    $scope.username = sharedservice.username();
    $scope.trips = [];
    $scope.currentTrip = {};

    $scope.$on('userLoggedin', function () {
        $scope.username = sharedservice.username();
        $scope.isAdmin = false;
        $scope.isLoggedIn = true;
    });

    $scope.$on('adminLoggedin', function () {
        $scope.username = sharedservice.username();
        $scope.isAdmin = true;
        $scope.isLoggedIn = true;
    });

    $scope.$on('logout', function () {
        $scope.isAdmin = false;
        $scope.isLoggedIn = false;
        $scope.username = null;
    });

    $scope.treks = [];
    $scope.blogs = [];
    var greetTextArray = ["CAMPING", "ADVENTURE", "BIKERIDING"],
        greetcount = 0;
    $scope.greetText = greetTextArray[greetcount];
    $interval(function () {
        if (greetcount < greetTextArray.length) {
            greetcount++;
        } else {
            greetcount = 0;
        }
        $scope.greetText = greetTextArray[greetcount];
    }, 2000);

    allEventService.getBlogs().then(function (response) {
        httpservice.post(configservice.host + configservice.logCount, {
            count: 0.5
        });
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