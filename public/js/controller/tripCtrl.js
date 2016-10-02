app.controller('tripController', function ($scope, $timeout, sharedservice, configservice, httpservice) {
    $scope.enableForm = false;
    $scope.enableChat = false;
    $scope.chats = [];
    $scope.isLoggedIn = sharedservice.isLoggedIn();
    $scope.trips = [];
    $scope.currentTrip = null;

    $scope.getAlltrips = function () {
        $scope.trip = [];
        httpservice.get(configservice.tripURL)
            .then(function (response) {
                //$scope.currentTrip = response.data[response.data.length - 1];
                $scope.trips = response.data;
                //$timeout($scope.$apply(), 0);
            }, function (error) {

            })
    };

    $scope.getchats = function (tripID) {
        httpservice.get(configservice.getTripChats + tripID)
            .then(function (response) {
                $scope.chats = $scope.chats.concat(response.data);
            }, function (error) {

            });
    };

    $scope.updateID = function (tripID) {
        $scope.enableChat = true;
        $scope.chats = [];
        for (var i = 0; i < $scope.trips.length; i++) {
            if ($scope.trips[i]._id == tripID) {
                $scope.currentTrip = $scope.trips[i];
                break;
            }
        };

        $scope.getchats(tripID);
    }

    $scope.createChat = function () {
        var chatmessage = {
            'message': $scope.chatMessage,
            'creator': sharedservice.username(),
            'tripID': $scope.currentTrip._id
        };
        $scope.chats.push(chatmessage);
        $scope.chatMessage = "";
        httpservice.post(configservice.chatURL, chatmessage)
            .then(function (response) {

            }, function (error) {

            })
    };

    $scope.getAlltrips();
});