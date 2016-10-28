app.controller('uploadController', function ($scope, sharedservice, $location, configservice, Upload) {
    $scope.alerts = [];
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

    $scope.uploadPic = function (files) {
        Upload.upload({
            url: configservice.uploadImage,
            data: {
                'createdBy': sharedservice.username(),
                'tag': $scope.tag
            },
            file: files
        }).then(function (response) {
            $scope.picFiles = null;
            $scope.addAlert({
                msg: 'Image Uploaded',
                class: 'alert alert-success'
            })
        }, function (error) {
            $scope.addAlert({
                msg: 'Image Upload Failed ',
                class: 'alert alert-danger'

            })

        }, function (evt) {

        });
    }
});