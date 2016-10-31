app.factory('configservice', function ($http) {
    return {
        'host': 'http://localhost',
        'loginURL': '/api/login',
        'tripURL': '/api/trip',
        'chatURL': '/api/chat',
        'getTripChats': '/api/chat/trip/',
        'postUser': '/api/user',
        'uploadImage': '/api/image',
        'allImagesForTag': '/api/image/tag/'
    }
});