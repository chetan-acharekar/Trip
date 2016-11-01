app.controller('loginController', function ($scope, $window, $location, httpservice, configservice, sharedservice, $rootScope, socialLoginService) {


    $scope.isLoggedIn = sharedservice.isLoggedIn();
    $scope.username = sharedservice.username();
    if ($scope.username == null) {
        $scope.isLoggedIn = false;
    }

    $scope.login = function () {
        httpservice.post(configservice.loginURL, {
            'username': $scope.username,
            'password': $scope.password
        }).then(function (response) {
            if (!response.data.IsError) {
                sharedservice.setuserlogin(response.data.user.username);
                if (response.data.user.IsAdmin) {
                    $scope.$emit('adminLoggedin');
                    $location.path('/menu');
                } else {
                    $scope.$emit('userLoggedin');
                    $location.path('/blogs');
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

    $scope.signOut = function () {
        $scope.$emit('logout');

        sharedservice.logout();
        $scope.isLoggedIn = false;
    }

    $rootScope.$on('event:social-sign-in-success', function (event, userDetails) {
        sharedservice.setuserlogin(userDetails.name.split(" ")[0]);
        $scope.$emit('userLoggedin');
        $location.path('/blogs');
        $scope.$apply()
    });

});