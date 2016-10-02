app.controller('loginController', function ($scope, $location, httpservice, configservice, sharedservice) {

    $scope.tagline = 'To the moon and back!from login';
    $scope.login = function () {
        httpservice.post(configservice.loginURL, {
            'username': $scope.username,
            'password': $scope.password
        }).then(function (response) {
            if (!response.data.IsError) {
                sharedservice.setuserlogin(response.data.user.username);
                if (response.data.IsAdmin) {
                    $location.path('/tripedit');
                } else {
                    $location.path('/trip');
                }
                //$scope.$apply();
            } else {
                alert('User Validation Failed')
            }

        }, function (error) {

        })
    }

});