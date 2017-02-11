module.exports = function($scope, $rootScope, $location, $document, $window) {

    var items,
        dataPromise = {};

    $scope.searchQuery = '';

    $scope.openNav = function() {
        $rootScope.isSearching = false;
        $rootScope.isMenuopening = false;
        $rootScope.isNavigating = true;
    };

    $scope.closeNav = function() {
        $rootScope.isNavigating = false;
    };

    $scope.toggleNav = function() {
        if ($rootScope.templatePage == 'single') {
            if (document.referrer.indexOf(document.location.origin) === 0) {
                $window.history.back();
            } else {
                $scope.go('/');
                return;
            }
        } else {
            $rootScope.isNavigating = $rootScope.isNavigating ? false : true;
        }
        $rootScope.isSearching = false;
        $rootScope.isMenuopening = false;
    };

    $scope.toggleSearch = function() {
        $rootScope.isNavigating = false;
        $rootScope.isMenuopening = false;
        $rootScope.isSearching = $rootScope.isSearching ? false : true;
        if ($rootScope.isSearching) {
            angular.element('#searchInput').focus();
        } else {
            angular.element('#searchInput').blur();
        }
    };

    $scope.toggleMenu = function() {
        $rootScope.isNavigating = false;
        $rootScope.isSearching = false;
        $rootScope.isMenuopening = $rootScope.isMenuopening ? false : true;
    };

    $scope.go = function(path, $event) {
        $location.path(path);
        $rootScope.isNavigating = false;
        $rootScope.isSearching = false;
        $rootScope.isMenuopening = false;
        if ($event) {
            $event.preventDefault();
        }
    };

    $scope.clickLogo = function($event) {
        $scope.go('/', $event);
    };

    $scope.scrollToTop = function($event) {
        angular.element("html, body").animate({scrollTop:0}, 'slow');
    };

    $scope.search = function() {
        angular.element('#searchInput').blur();
        $scope.go('/s/' + $scope.searchQuery);
    };

    $scope.loadPlayer = function() {
        $scope.isPlayerReady = true;
        $scope.isPlayerReduced = false;
    };

    $scope.setNetwork = function() {
        var online = navigator.onLine;
        if (!online) {
            $scope.isOffline = true;
        } else {
            $scope.isOffline = false;
        }
    };

    $scope.copyLocation = function() {
        var textArea = document.createElement("textarea");
        textArea.value = location.href;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
        } catch (error) {
            console.log(error);
        }
        document.body.removeChild(textArea);
        $rootScope.isMenuopening = false;
    };

    var windowHeight = $(window).height();
    var documentHeight = $document.height();
    var $scrollTop = angular.element(".js-scrollTop");
    angular.element(window).on('scroll', function () {
        scrollTop = $document.scrollTop();
        if (scrollTop >= windowHeight) {
            $scrollTop.addClass("is-active");
        } else {
            $scrollTop.removeClass("is-active");
        }
    });

};
