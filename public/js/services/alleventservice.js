app.factory('allEventService', ['$http', 'configservice', function ($http, configservice) {

    return {
        getBlogs: function () {
            return $http.get(configservice.tripURL);
        },
        getSpecificBlog: function (tripId) {
            return $http.get(configservice.tripURL + '/' + tripId)
        },
        updateUserForTrip: function (tripId, userId, flag) {
            let url = configservice.updateUserForTrip.replace('{0}', tripId);
            return $http.put(url, {
                'userId': userId,
                'updateFlag': flag
            });
        }
    }

}]);