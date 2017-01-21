module.exports = function() {

    angular.module('app').config(['$locationProvider', '$routeProvider', '$sceProvider', function($locationProvider, $routeProvider, $sceProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
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

    angular.module('app').run(['$rootScope', '$http', '$templateCache', function($scope, $rootScope, $http, $templateCache) {

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
        });

        $scope.$on('$routeChangeError', function (event, current, previous) {
        });

	}]);

};
