app.controller('tripEditController', function ($scope, $timeout, $window, sharedservice, textAngularManager, configservice, httpservice) {
    $scope.enableForm = false;
    $scope.enableChat = false;
    $scope.isLoggedIn = sharedservice.isLoggedIn();
    $scope.trips = [];
    $scope.alerts = [];
    $scope.picFile = null;
    $scope.currentTrip = null;


    $scope.addAlert = function (alertData) {
        $scope.alerts.push(alertData);
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.getAlltrips = function () {
        $scope.trip = [];
        httpservice.get(configservice.tripURL)
            .then(function (response) {
                $scope.currentTrip = response.data[response.data.length - 1];
                $scope.trips = response.data;
                //$timeout($scope.$apply(), 0);
            }, function (error) {

            })
    };

    $scope.updateID = function (tripID) {
        $scope.enableChat = true;
        $scope.chats = [];
        for (var i = 0; i < $scope.trips.length; i++) {
            if ($scope.trips[i]._id == tripID) {
                $scope.currentTrip = $scope.trips[i];
                $scope.contenthtml = $scope.trips[i].description;
                break;
            }
        }
    };

    $scope.editFields = function () {
        $scope.editable = true;
    };

    $scope.updateTrip = function (file) {
        $scope.editable = false;
        var updatedTrip = {
                'title': $scope.currentTrip.title,
                'updatedBy': sharedservice.username(),
                'lastUpdatedon': new Date(),
                'participants': [],
                'description': $scope.currentTrip.description
            },
            tripURL = configservice.tripURL + '/' + $scope.currentTrip._id;
        httpservice.put(tripURL, updatedTrip)
            .then(function (response) {
                $scope.addAlert({
                    msg: 'Trip Updated',
                    class: 'alert alert-success'
                })

            }, function (error) {
                $scope.addAlert({
                    msg: 'Failed to update Trip',
                    class: 'alert alert-danger'
                })
            });
    };


    $scope.deletetrip = function () {
        var tripURL = configservice.tripURL + '/' + $scope.currentTrip._id;
        httpservice.delete(tripURL).then(function (response) {
            if (!response.data.IsError) {
                $scope.getAlltrips();
            }
        }, function (error) {

        });
    }

    $scope.getAlltrips();
});