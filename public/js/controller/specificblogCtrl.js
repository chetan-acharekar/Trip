app.controller('specificBlogController', function ($scope, httpservice, $timeout, configservice, $routeParams, allEventService, $timeout, textAngularManager, sharedservice, socket) {
    //$scope.param1 = $routeParams.param1;
    $scope.blogid = $routeParams.param1;
    $scope.blog = {};
    $scope.chats = [];
    $scope.currentuser = sharedservice.username();
    $scope.isLoggedIn = sharedservice.isLoggedIn();
    allEventService.getSpecificBlog($scope.blogid).then(function (response) {
        $scope.blog = response.data;
    }, function (error) {

    });

    $scope.myInterval = 3000;
    $scope.slides = [
        {
            image: 'http://localhost/uploads/file-1475941567767.png'
    },
        {
            image: 'http://localhost/uploads/1476187902003.jpg'
    },
        {
            image: 'http://localhost/uploads/1476187902003.jpg'

    }
  ];


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


    $scope.getchats($scope.blogid);

});