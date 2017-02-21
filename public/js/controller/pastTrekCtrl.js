app.controller('pastTrekController', function ($scope, allEventService) {
    $scope.text = "test";
        $scope.pastTreks = [];
    allEventService.getBlogs().then(function (response) {
        response.data.map(function (blog) {
            if (blog.type == "TREK" && !blog.date || new Date(blog.date) <= new Date()) {
                $scope.pastTreks.push(blog);
            }
        });
    }, function (error) {

    })
});