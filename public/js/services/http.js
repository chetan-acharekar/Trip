app.factory('httpservice', ['$http', function ($http) {

    return {
        get: function (URL, paramIn) {
            return $http.get(URL, {
                params: paramIn
            });
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