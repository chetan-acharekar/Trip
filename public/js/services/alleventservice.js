app.factory('allEventService', ['$http', 'configservice', function ($http, configservice) {

    return {
        getBlogs: function () {
            return $http.get(configservice.tripURL);
        },
        getSpecificBlog: function (tripId) {
            return $http.get(configservice.tripURL + '/' + tripId)
        }
    }

}]);