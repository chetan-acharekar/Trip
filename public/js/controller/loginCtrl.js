// public/js/controllers/MainCtrl.js
app.controller('loginController', function ($scope, $location, httpservice, configservice, sharedservice) {

    $scope.tagline = 'To the moon and back!from login';
    $scope.login = function () {
        httpservice.post(configservice.loginURL, {
            'username': $scope.username,
            'password': $scope.password
        }).then(function (response) {
            if (!response.data.IsError) {
                sharedservice.isLoggedIn = true;
                sharedservice.username = response.data.user.username;
                $location.path('/trips');
                //$scope.$apply();
            } else {
                alert('User Validation Failed')
            }

        }, function (error) {

        })
    }

});