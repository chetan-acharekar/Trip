app.controller('adminMenuController', function ($scope, $location, sharedservice) {
    $scope.isLoggedIn = sharedservice.isLoggedIn();
    $scope.createNew = function () {
        $location.path('/tripadd');
    };
    $scope.edit = function () {
        $location.path('/tripedit');
    };
    $scope.uploadImages = function () {
        $location.path('/upload');
    };
});