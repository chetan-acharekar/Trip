app.controller('tripEditController', function ($scope, $timeout, $window, sharedservice, configservice, httpservice, Upload) {
    $scope.enableForm = false;
    $scope.enableChat = false;
    $scope.isLoggedIn = sharedservice.isLoggedIn();
    $scope.trips = [];
    $scope.picFile = null;
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

    $scope.updateTrip = function (file) {
        $scope.editable = false;
        var updatedTrip = {
                'title': $scope.currentTrip.title,
                'updatedBy': sharedservice.username(),
                'lastUpdatedon': new Date(),
                'participants': [],
                'description': $scope.currentTrip.description,
                'image': file ? null : $scope.currentTrip.image
            },
            tripURL = configservice.tripURL + '/' + $scope.currentTrip._id;
        Upload.upload({
            url: tripURL,
            data: updatedTrip,
            file: file,
            method: "PUT"
        }).then(function (response) {

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



    $scope.uploadPic = function (file) {
        Upload.upload({
            url: configservice.tripURL,
            data: {
                'title': $scope.title,
                'createdBy': sharedservice.username(),
                'description': $scope.description
            },
            file: file
        }).then(function (response) {
            $scope.title = "";
            $scope.description = "";
            $scope.picFile = null;
            $scope.trips.push(response.data.Result);
            $timeout(function () {
                file.result = response.data;
            });
        }, function (error) {
            error.log('failed ' + error);
            //            if (response.status > 0)
            //                $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            //file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    }

    $scope.getAlltrips();
});