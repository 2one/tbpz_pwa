var app;

(function() {

	app = angular.module('app', ['ngRoute', 'ngSanitize', 'ngTouch', 'ngAnimate']);

    app.config(['$locationProvider', '$routeProvider', '$sceProvider', function($locationProvider, $routeProvider, $sceProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
        $sceProvider.enabled(false);

        $routeProvider.
        when('/', {
            slug: 'home',
            templateUrl: config.viewsPath +'articles.html',
            controller: 'ArticlesCtrl'
        }).
        when('/article/:articleId', {
            slug: 'article',
            templateUrl: config.viewsPath +'article.html',
            controller: 'ArticleCtrl'
        }).
        when('/category/:categorySlug', {
            slug: 'category',
            templateUrl: config.viewsPath +'articles.html',
            controller: 'ArticlesCtrl'
        }).
        when('/s/:searchQuery', {
            slug: 'search',
            templateUrl: config.viewsPath +'articles.html',
            controller: 'ArticlesCtrl'
        }).
        when('/page/:pageSlug', {
            slug: 'page',
            templateUrl: config.viewsPath +'page.html',
            controller: 'PageCtrl'
        }).
        when('/error', {
            slug: 'error',
            templateUrl: config.viewsPath +'error.html',
            controller: 'ErrorCtrl'
        }).
        when('/error/404', {
            slug: 'error',
            templateUrl: config.viewsPath +'error-404.html',
            controller: 'ErrorCtrl'
        }).
        when('/:articleSlug', {
            slug: 'article',
            templateUrl: config.viewsPath +'article.html',
            controller: 'ArticleCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);

	app.run(['$rootScope', '$http', '$templateCache', function($scope, $http, $templateCache) {

        $scope.config = config;
        $scope.appReady = false;
        $scope.isNavigating = false;
        $scope.isSearching = false;
        $scope.loadingNext = false;

        $scope.$on('$routeChangeStart', function (event, current, previous) {
            $scope.isNavigating = false;
            $scope.isSearching = false;
            $scope.appReady = false;
        });

        $scope.$on('$routeChangeSuccess', function (event, current, previous) {
            $scope.slug = current.$$route.slug;
        });

        $scope.$on('$routeChangeError', function (event, current, previous) {
        });

	}]);

    /*if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./sw.js')
            .then(function() { console.log('Service Worker Registered'); });
    }*/

})();
