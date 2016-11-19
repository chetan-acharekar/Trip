app.controller('loginController', function ($scope, $window, $location, httpservice, configservice, sharedservice, $route, $auth) {


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
        $auth.logout();
    };


    $scope.authenticate = function (provider) {
        $scope.username = null;
        $scope.password = null;
        $auth.authenticate(provider).then(function (response) {
                // Signed in with Google.
                $scope.username = response.data.userObject.firstname;
                sharedservice.setuserlogin(response.data.userObject.firstname, response.data.userObject._id);
                $scope.$emit('userLoggedin');
                $scope.isLoggedIn = true;
                $location.path('/blogs');
            })
            .catch(function (response) {
                // Something went wrong.
            });;
    };


    //    $scope.options = {
    //        'onsuccess': function (response) {
    //            sharedservice.setuserlogin(response.w3.ig.split(" ")[0]);
    //            $scope.$emit('userLoggedin');
    //            //$location.path('/blogs');
    //            console.log(response.w3.U3);
    //            $scope.isLoggedIn = true;
    //            $scope.$apply();
    //        },
    //        'theme': 'dark',
    //        'longtitle': false
    //    };

});