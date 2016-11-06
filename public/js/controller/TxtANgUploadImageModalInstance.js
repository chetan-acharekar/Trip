//TxtANgUploadImageModalInstance

app.controller('UploadImageModalInstance', function ($scope, $uibModalInstance, Upload, configservice) {

    $scope.image = "";
    $scope.progress = 0;
    $scope.files = [];
    $scope.upload = function () {
        Upload.upload({
            url: '/api/image',
            file: $scope.file,
            method: 'POST'
        }).progress(function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        }).success(function (response) {
            $scope.progress = 0;
            $scope.image = configservice.host + "/uploads/" + response.Data[0].name;
            $scope.insert();
        });
    };

    $scope.insert = function () {
        if ($scope.image != "") {
            $uibModalInstance.close($scope.image);
        }
    };
})