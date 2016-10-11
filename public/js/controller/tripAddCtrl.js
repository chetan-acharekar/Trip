app.controller('tripAddController', function ($scope, sharedservice, textAngularManager, configservice, httpservice) {
    $scope.isLoggedIn = sharedservice.isLoggedIn();
    $scope.trips = [];
    $scope.alerts = [];
    $scope.currentTrip = null;

    $scope.addAlert = function (alertData) {
        $scope.alerts.push(alertData);
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.createTrip = function () {
        httpservice.post(configservice.tripURL, {
                'title': $scope.title,
                'createdBy': sharedservice.username(),
                'description': $scope.htmlcontent
            })
            .then(function (response) {
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
    };

});