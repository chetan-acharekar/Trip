app.controller('blogsController', function ($scope, $timeout, $window, sharedservice, configservice, httpservice, allEventService) {
    $scope.blogs = [];
    allEventService.getBlogs().then(function (response) {
        $scope.blogs;
        response.data.map(function (blog) {
            if (blog.type == "BLOG") {
                $scope.blogs.push(blog);
            }
        });
    }, function (error) {

    })
})