app.controller('uploadController', function ($scope, sharedservice, configservice, Upload) {
    $scope.alerts = [];
    $scope.addAlert = function (alertData) {
        $scope.alerts.push(alertData);
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.uploadPic = function (files) {
        Upload.upload({
            url: configservice.uploadImage,
            data: {
                'createdBy': sharedservice.username()
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