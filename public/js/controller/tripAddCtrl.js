app.controller('tripAddController', function ($scope, sharedservice, textAngularManager, configservice, $location, httpservice, Upload) {
    $scope.isLoggedIn = sharedservice.isLoggedIn();
    $scope.trips = [];
    $scope.alerts = [];
    $scope.currentTrip = null;
    var galleryFiles = null;
    $scope.tags = [];
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
    //
    //    httpservice.get(configservice.allImageTags).then(function (response) {
    //        $scope.tags = response.data;
    //    }, function (error) {
    //
    //    });

    $scope.createTripWithImage = function () {
        galleryFiles = $scope.GalleryFiles;
        Upload.upload({
            url: configservice.tripURL,
            data: {
                'title': $scope.title,
                'createdBy': sharedservice.username(),
                'description': $scope.htmlcontent,
                'intro': $scope.intro,
                'type': $scope.blogType
            },
            file: $scope.titleImage
        }).then(function (response) {
            if (galleryFiles && galleryFiles.length > 0) {
                uploadGalleryImages(galleryFiles, response.data.Result._id);
            }
            $scope.title = "";
            $scope.htmlcontent = "";
            $scope.intro = "";
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
    }




    function uploadGalleryImages(files, inputTag) {
        Upload.upload({
            url: configservice.uploadImage,
            data: {
                'tag': inputTag
            },
            file: files
        }).then(function (response) {

        }, function (error) {

        });
    }

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



    // TRIX

    // $scope.trixAttachmentAdd = function (e) {
    //     let attachment;
    //     attachment = e.attachment;
    //        Upload.upload({
    //         url: configservice.uploadImage,
    //         data: {
    //             'createdBy': sharedservice.username()
    //         },
    //         file: attachment.file
    //     }).then(function (response) {
    //         attachment.url = "/uploads/"+response.data.Data[0].name;
    //     })
    // }
});