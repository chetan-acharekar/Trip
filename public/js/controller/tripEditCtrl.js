app.controller('tripEditController', function ($scope, $timeout, sharedservice, configservice, httpservice) {
    $scope.enableForm = false;
    $scope.enableChat = false;
    $scope.isLoggedIn = sharedservice.isLoggedIn();
    $scope.trips = [];

    $scope.currentTrip = null;


    $scope.createTrip = function () {
        httpservice.post(configservice.tripURL, {
                'title': $scope.title,
                'createdBy': sharedservice.username(),
                'description': $scope.description
            })
            .then(function (response) {
                //alert('Trip Created!');
                $scope.title = "";
                $scope.description = "";
                $scope.trips.push(response.data.Result);
            }, function (error) {
                error.log('failed ' + error);
            })
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
                break;
            }
        }
    };

    $scope.editFields = function () {
        $scope.editable = true;
    };

    $scope.updateTrip = function () {
        $scope.editable = false;
        var updatedTrip = {
                'title': $scope.currentTrip.title,
                'updatedBy': sharedservice.username(),
                'lastUpdatedon': new Date(),
                'participants': [],
                'description': $scope.currentTrip.description
            },
            tripURL = configservice.tripURL + '/' + $scope.currentTrip._id;
        httpservice.put(tripURL, updatedTrip).then(function (response) {

        }, function (error) {

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