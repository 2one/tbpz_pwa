module.exports = function() {

    angular.module('app').config(['$locationProvider', '$routeProvider', '$sceProvider', function($locationProvider, $routeProvider, $sceProvider) {
        if (config.html5mode) {
            $locationProvider.html5Mode(true).hashPrefix('!');
        }
        $sceProvider.enabled(false);

        $routeProvider.
        when('/', {
            slug: 'home',
            templatePage: 'listing',
            templateUrl: config.viewsPath +'articles.html',
            controller: 'ArticlesCtrl'
        }).
        when('/category/:categorySlug', {
            slug: 'category',
            templatePage: 'listing',
            templateUrl: config.viewsPath +'articles.html',
            controller: 'ArticlesCtrl'
        }).
        when('/tag/:tagSlug', {
            slug: 'tag',
            templatePage: 'listing',
            templateUrl: config.viewsPath +'articles.html',
            controller: 'ArticlesCtrl'
        }).
        when('/s/:searchQuery', {
            slug: 'search',
            templatePage: 'listing',
            templateUrl: config.viewsPath +'articles.html',
            controller: 'ArticlesCtrl'
        }).
        when('/bookmarks', {
            slug: 'bookmarks',
            templatePage: 'listing',
            templateUrl: config.viewsPath +'articles.html',
            controller: 'ArticlesCtrl'
        }).
        when('/page/:pageSlug', {
            slug: 'page',
            templatePage: 'page',
            templateUrl: config.viewsPath +'page.html',
            controller: 'PageCtrl'
        }).
        when('/error/:errorId', {
            slug: 'error',
            templatePage: 'error',
            templateUrl: config.viewsPath +'error.html',
            controller: 'ErrorCtrl'
        }).
        when('/:articleSlug', {
            slug: 'article',
            templatePage: 'single',
            templateUrl: config.viewsPath +'article.html',
            controller: 'ArticleCtrl'
        }).
        otherwise({
            redirectTo: '/error/404'
        });
    }]);

    angular.module('app').run(['$rootScope', '$http', function($scope, $rootScope, $http) {

        $scope.config = config;
        $scope.appReady = false;
        $scope.isSwitchingView = false;
        $scope.isNavigating = false;
        $scope.isSearching = false;
        $scope.loadingNext = false;

        $scope.$on('$routeChangeStart', function (event, current, previous) {
            $scope.isNavigating = false;
            $scope.isSearching = false;
            $scope.isMenuopening = false;
        });

        $scope.$on('$routeChangeSuccess', function (event, current, previous) {
            $scope.slug = current.$$route.slug;
            $scope.templatePage = current.$$route.templatePage;
            $scope.pageTitle = '';
            setTimeout(function () {
                angular.element("link[rel='canonical']").attr("href", document.location.href);
                angular.element("meta[property='og:url']").attr("content", document.location.href);
                angular.element("title").text($scope.pageTitle || "The BackPackerz | Blog Rap et Culture Hip-Hop");
                angular.element("meta[property='og:title']").attr("content", $scope.pageTitle || "The BackPackerz | Blog Rap et Culture Hip-Hop");
                angular.element("meta[property='og:image']").attr("content", $scope.pageImage || "http://thebackpackerz.com/wp-content/uploads/2015/05/nouvelle-version-the-backpackerz-cover.jpg");
            }, 200);
        });

        /*$scope.$on('$routeChangeError', function (event, current, previous) {
        });*/

	}]);

};
