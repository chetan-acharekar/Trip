app.controller('mainController', function ($scope, sharedservice, httpservice, configservice) {

    $scope.tagline = 'Only if you have been in the deepest valley, can you ever know how magnificent it is to be on the highest mountain. — Richard M. Nixon';
    $scope.isLoggedIn = sharedservice.isLoggedIn();
    $scope.username = sharedservice.username();
    $scope.trips = [];
    $scope.currentTrip = {};
    $scope.getAlltrips = function () {
        $scope.trips = [];
        httpservice.get(configservice.tripURL)
            .then(function (response) {
                $scope.currentTrip = response.data[response.data.length - 1];
                $scope.trips = $scope.trips.concat(response.data);
                //$timeout($scope.$apply(), 0);
            }, function (error) {

            })
    };

    $scope.updateID = function (tripID) {
        for (var i = 0; i < $scope.trips.length; i++) {
            if ($scope.trips[i]._id == tripID) {
                $scope.currentTrip = $scope.trips[i];
                break;
            }
        };
    }


    $scope.getAlltrips();

});