app.factory('httpservice', ['$http', function ($http) {

    return {
        get: function (URL) {
            return $http.get(URL);
        },
        post: function (URL, Data) {
            return $http.post(URL, Data);
        },
        delete: function (URL, id) {
            return $http.delete(URL);
        },
        put: function (URL, data) {
            return $http.put(URL, data);
        }
    }

}]);