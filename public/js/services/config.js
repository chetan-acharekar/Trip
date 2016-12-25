app.factory('configservice', function () {
    return {
        'host': 'http://trekkingtoads.com/',
        'loginURL': '/api/login',
        'tripURL': '/api/trip',
        'chatURL': '/api/chat',
        'getTripChats': '/api/chat/trip/',
        'postUser': '/api/user',
        'uploadImage': '/api/image',
        'allImagesForTag': '/api/image/tag/',
        'updateUserForTrip': '/api/trip/{0}/updateParticipant',
        'logCount': 'api/log/count'
    }
});