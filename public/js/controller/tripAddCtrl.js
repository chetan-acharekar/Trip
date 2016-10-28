app.controller('tripAddController', function ($scope, sharedservice, textAngularManager, configservice, $location, httpservice, Upload) {
    $scope.isLoggedIn = sharedservice.isLoggedIn();
    $scope.trips = [];
    $scope.alerts = [];
    $scope.currentTrip = null;
    $scope.tags = [];
    $scope.addAlert = function (alertData) {
        $scope.alerts.push(alertData);
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
    $scope.createNew = function () {
        $location.path('/tripadd');
    };
    $scope.edit = function () {
        $location.path('/tripedit');
    };
    $scope.uploadImages = function () {
        $location.path('/upload');
    };

    httpservice.get(configservice.allImageTags).then(function (response) {
        $scope.tags = response.data;
    }, function (error) {

    });

    $scope.createTripWithImage = function () {
        Upload.upload({
            url: configservice.tripURL,
            data: {
                'title': $scope.title,
                'createdBy': sharedservice.username(),
                'description': $scope.htmlcontent,
                'intro': $scope.intro,
                'type': $scope.blogType
            },
            file: $scope.titleImage
        }).then(function (response) {
            $scope.title = "";
            $scope.htmlcontent = "";
            $scope.addAlert({
                msg: 'Trip Added',
                class: 'alert alert-success'
            })
        }, function (error) {
            $scope.addAlert({
                msg: 'Failed to add Trip',
                class: 'alert alert-danger'
            })
        })
    }
});