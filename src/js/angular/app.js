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

        var defaultPageTitle = angular.element("title").text(),
            defaultPageDescription = angular.element("meta[name='description']").attr("content"),
            defaultPageImage = angular.element("meta[property='og:image']").attr("content");

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
                var canonicalUrl = document.location.href.replace('app.thebackpackerz.com', 'thebackpackerz.com');
                angular.element("link[rel='canonical']").attr("href", canonicalUrl);
                angular.element("meta[property='og:url']").attr("content", canonicalUrl);
                angular.element("title").text($scope.pageTitle || defaultPageTitle);
                angular.element("meta[property='og:title']").attr("content", $scope.pageTitle || defaultPageTitle);
                angular.element("meta[property='og:image']").attr("content", $scope.pageImage || defaultPageImage);
                angular.element("meta[name='description'], meta[property='og:description']").attr("content", $scope.pageDescription || defaultPageDescription);
            }, 200);
        });

        /*$scope.$on('$routeChangeError', function (event, current, previous) {
        });*/

	}]);

};
