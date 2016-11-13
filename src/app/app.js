var app;
var documentWidth = document.documentElement.clientWidth;
var documentHeight = document.documentElement.clientHeight;

(function() {

	app = angular.module('app', ['ngRoute', 'ngSanitize', 'ngTouch']);

    app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        //$locationProvider.html5Mode(true).hashPrefix('!');

        $routeProvider.
        when('/', {
            page: 'home',
            templateUrl: config.viewsPath +'articles.html',
            controller: 'HomeCtrl'
        }).
        when('/article/:articleId', {
            page: 'article',
            templateUrl: config.viewsPath +'article.html',
            controller: 'ArticleCtrl'
        }).
        when('/:articleSlug', {
            page: 'article',
            templateUrl: config.viewsPath +'article.html',
            controller: 'ArticleCtrl'
        }).
        when('/category/:categorySlug', {
            page: 'category',
            templateUrl: config.viewsPath +'articles.html',
            controller: 'CategoryCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);

	app.run(['$rootScope', function($scope) {

        $scope.config = config;
        $scope.appReady = false;
        $scope.isNavigating = false;
        $scope.toggleNav = function() {
            $scope.isNavigating = $scope.isNavigating ? false : true;
        };

        $scope.$on('$routeChangeStart', function (event, current, previous) {
            $scope.isNavigating = false;
            $scope.appReady = false;
        });

        $scope.$on('$routeChangeSuccess', function (event, current, previous) {
            $scope.page = current.$$route.page;
        });

        $scope.$on('$routeChangeError', function (event, current, previous) {
        });

		$scope.documentHeight = documentHeight;
		angular.element(window).bind('resize', function() {
			documentWidth = document.documentElement.clientWidth;
		    documentHeight = document.documentElement.clientHeight;
		    $scope.documentHeight = documentHeight;
		    $scope.$apply();
		});

	}]);

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./sw.js')
            .then(function() { console.log('Service Worker Registered'); });
    }

})();
