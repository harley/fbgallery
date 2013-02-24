'use strict';

fbgalleryApp.controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Testacular'
    ];

//    $http.get('data/albums.json')
//        .then(function (res) {
//            $scope.albums = res.data.data;
//            window.albums = $scope.albums;
//            $scope.albums = [];
//        });
    $scope.getAlbumImageUrl = function(album) {
        return "http://graph.facebook.com/" + album.cover_photo + "/picture";
    }

    $scope.excludeProfileAndCoverPics = function(album){
        return !(album.name == "Profile Pictures" || album.name == "Cover Photos");
    };

    $scope.getAlbums = function(username){
        var url = "https://graph.facebook.com/" + username + "/albums";
        console.log("querying", url);
        $.getJSON(url, function(data) {
            console.log('got some data', data);
            $scope.$apply(function(){
                $scope.albums = data.data;
                console.log($scope.albums);
                window.albums = $scope.albums;
            });
        }).error(function() { alert("Error querying facebook. Note this doesn't work with facebook usernames"); })
    }
});

fbgalleryApp.directive('updateEllipsis', function(){
    return function(scope, element, attrs) {
        console.log(element);
        $(".ellipsis").dotdotdot();
    }
})

fbgalleryApp.filter('truncate', function () {
    return function (text, length, end) {
        if (isNaN(length))
            length = 10;

        if (end === undefined)
            end = "...";

        if (text.length <= length || text.length - end.length <= length) {
            return text;
        }
        else {
            return String(text).substring(0, length-end.length) + end;
        }
    };
});
