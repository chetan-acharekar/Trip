app.controller('treksController', function ($scope, $timeout, $window, sharedservice, configservice, httpservice, allEventService) {
    $scope.blogs = [];
    allEventService.getBlogs().then(function (response) {
        $scope.blogs;
        response.data.map(function (blog) {
            if (blog.type == "TREK") {
                $scope.blogs.push(blog);
            }
        });
    }, function (error) {

    })
})