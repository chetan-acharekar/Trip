// public/js/controllers/MainCtrl.js
app.controller('tripController', function ($scope, $timeout, sharedservice, configservice, httpservice) {
    $scope.enableForm = false;
    $scope.enableChat = false;
    $scope.chats = [];
    $scope.isLoggedIn = sharedservice.isLoggedIn;
    $scope.trips = [];

    $scope.currentTrip = null;


    $scope.createTrip = function () {
        httpservice.post(configservice.tripURL, {
                'title': $scope.title,
                'createdBy': sharedservice.username,
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
        httpservice.get(configservice.tripURL)
            .then(function (response) {
                $scope.currentTrip = response.data[response.data.length - 1];
                $scope.trips = $scope.trips.concat(response.data);
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
            'creator': sharedservice.username,
            'tripID': $scope.currentTrip._id
        };
        $scope.chats.push(chatmessage);
        $scope.chatMessage = "";
        httpservice.post(configservice.chatURL, chatmessage)
            .then(function (response) {

            }, function (error) {

            })
    };

    $scope.editFields = function () {
        $scope.editable = true;
    };

    $scope.updateTrip = function () {
        $scope.editable = false;
        var updatedTrip = {
                'title': $scope.currentTrip.title,
                'updatedBy': sharedservice.username,
                'lastUpdatedon': new Date(),
                'participants': [],
                'description': $scope.currentTrip.description
            },
            tripURL = configservice.tripURL + '/' + $scope.currentTrip._id;
        httpservice.put(tripURL, updatedTrip).then(function (response) {

        }, function (error) {

        });
    };

    $scope.getAlltrips();
});