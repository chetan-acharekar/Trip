app.controller('specificBlogController', function ($scope, httpservice, $timeout, configservice, $routeParams, allEventService, $timeout, textAngularManager, sharedservice, socket, Lightbox) {
    //$scope.param1 = $routeParams.param1;
    $scope.blogid = $routeParams.param1;
    $scope.blog = {};
    $scope.chats = [];
    $scope.currentuser = sharedservice.username();
    $scope.isLoggedIn = sharedservice.isLoggedIn();
    $scope.galleryPicsExists = false;
    $scope.chatwindowEnabled = false;

    allEventService.getSpecificBlog($scope.blogid).then(function (response) {
        $scope.blog = response.data;
        for (var count = 0; count < response.data.participants.length; count++) {
            if (sharedservice.userId() == response.data.participants[count]) {
                $scope.updateFlag = true;
                break;
            }
        };
    }, function (error) {

    });

    $scope.images = [];


    $scope.openLightboxModal = function (index) {
        var test = Lightbox.openModal($scope.images, index);
    };


    socket.on('updatechatlist', function (data) {
        $scope.getchats($scope.blog._id);
    });

    $scope.getchats = function (tripID) {
        $scope.chats = [];
        httpservice.get(configservice.getTripChats + tripID)
            .then(function (response) {
                $scope.chats = response.data;
                $timeout(function () {
                    var scroller = document.getElementById("autoscroll");
                    scroller.scrollTop = scroller.scrollHeight;
                }, 0, false);
            }, function (error) {

            });
    };


    $scope.createChat = function () {
        var chatmessage = {
            'message': $scope.chatMessage,
            'creator': $scope.currentuser ? $scope.currentuser : sharedservice.username(),
            'tripID': $scope.blog._id
        };
        //$scope.chats.push(chatmessage);
        $scope.chatMessage = "";
        httpservice.post(configservice.chatURL, chatmessage)
            .then(function (response) {
                socket.emit('chatupdated', response.data.tripid);

            }, function (error) {

            })
    };

    function getGalleryImages() {
        httpservice.get(configservice.allImagesForTag + $scope.blogid)
            .then(function (response) {
                if (response.data.images && response.data.images.length > 0) {
                    var path = response.data.path;
                    response.data.images.map(function (image) {
                        $scope.images.push(path + image.name);
                    });
                    $scope.galleryPicsExists = true;
                }

            }, function (error) {

            })
    }


    $scope.toggleChat = function () {
        $scope.chatwindowEnabled = !$scope.chatwindowEnabled;
    }

    $scope.getchats($scope.blogid);
    getGalleryImages();




    $scope.updateUserId = function () {

        allEventService.updateUserForTrip($scope.blogid, sharedservice.userId(), $scope.updateFlag).then(function (response) {

        }, function (error) {

        })
    }
});