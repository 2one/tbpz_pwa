module.exports = function($scope) {

    $scope.share = function(provider) {
        var shareUrl,
            popupWidth = screen.availWidth,
            popupHeight = screen.availHeight,
            canonicalUrl = angular.element("meta[property='og:url']").attr("content"),
            title = angular.element("meta[property='og:title']").attr("content"),
            description = angular.element("meta[property='og:description']").attr("content"),
            image = angular.element("meta[property='og:image']").attr("content");

        switch (provider) {
            case 'facebook':
                FB.ui({
                    method: 'feed',
                    name: title,
                    link: canonicalUrl,
                    picture: image,
                    description: description
                });
            break;
            case 'twitter':
                shareUrl = "https://twitter.com/share?url=" + encodeURIComponent(canonicalUrl) + "&text=" + encodeURIComponent(title) + "&via=thebackpackerz";
                window.open(shareUrl, provider, "width="+ popupWidth +",height="+ popupHeight +",left=0,top=0");
            break;
        }
    };

};
