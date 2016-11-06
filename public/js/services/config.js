app.factory('configservice', function ($http) {
    return {
        'host': 'http://139.59.47.155/',
        'loginURL': '/api/login',
        'tripURL': '/api/trip',
        'chatURL': '/api/chat',
        'getTripChats': '/api/chat/trip/',
        'postUser': '/api/user',
        'uploadImage': '/api/image',
        'allImagesForTag': '/api/image/tag/'
    }
});