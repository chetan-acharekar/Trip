app.controller('loginController', function ($scope, $location, httpservice, configservice, sharedservice) {


    $scope.tagline = 'To the moon and back!from login';
    $scope.login = function () {
        httpservice.post(configservice.loginURL, {
            'username': $scope.username,
            'password': $scope.password
        }).then(function (response) {
            if (!response.data.IsError) {
                sharedservice.setuserlogin(response.data.user.username);
                if (response.data.user.IsAdmin) {
                    $location.path('/menu');
                } else {
                    $location.path('/chat');
                }
                //$scope.$apply();
            } else {
                alert('User Validation Failed')
            }

        }, function (error) {

        });
    };

    $scope.register = function () {
        $scope.enableRegistration = true;
    };

    $scope.confirmAndRegister = function () {
        if ($scope.password != $scope.confirmpassword) {
            alert('Check passwords');
        } else {
            httpservice.post(configservice.postUser, {
                'username': $scope.username,
                'password': $scope.password
            }).then(function (response) {
                if (!response.data.IsError) {
                    sharedservice.setuserlogin(response.data.user.username);
                    $location.path('/trip');
                } else {
                    alert('User Validation Failed,try other username please')
                }

            }, function (error) {

            });
        }
    };

});