var app;

(function() {

	app = angular.module('app', ['ngRoute', 'ngSanitize', 'ngTouch']);

    app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        //$locationProvider.html5Mode(true).hashPrefix('!');

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
        when('/:articleSlug', {
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
        otherwise({
            redirectTo: '/'
        });
    }]);

	app.run(['$rootScope', function($scope) {

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
