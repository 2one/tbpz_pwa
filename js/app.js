var config = {
    viewsPath: "./app/views/",
    incPath: "./app/views/partials/",
	postsApiUrl: '//thebackpackerz.com/wp-json/posts?filter[posts_per_page]=5',
    categoryPostsApiUrl: '//thebackpackerz.com/wp-json/posts?filter[category_name]={slug}&filter[posts_per_page]=5',
    postApiUrl: '//thebackpackerz.com/wp-json/posts?filter[name]={slug}',
    singlepostApiUrl: '//thebackpackerz.com/wp-json/posts/{ID}',
	navApiUrl: '//thebackpackerz.com/wp-json/posts/types/posts/taxonomies/category/terms'
};
;
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
            .register('./js/service-worker.js')
            .then(function() { console.log('Service Worker Registered'); });
    }

})();
;
app.service('datasSce', function($http) {
    var promise = {};
    return {
        getArticles: function() {
            if (!promise['articles']) {
                promise['articles'] = $http.get(config.postsApiUrl).then(function(res) {
                    return res.data;
                });
            }
            return promise['articles'];
        },
        getArticleById: function(id) {
            if (!promise['article_'+ id]) {
                promise['article_'+ id] = $http.get(config.singlepostApiUrl.replace('{ID}', id)).then(function(res) {
                    return res.data;
                });
            }
            return promise['article_'+ id];
        },
        getArticleBySlug: function(slug) {
            if (!promise['article_'+ slug]) {
                promise['article_'+ slug] = $http.get(config.postApiUrl.replace('{slug}', slug)).then(function(res) {
                    return res.data;
                });
            }
            return promise['article_'+ slug];
        },
        getCategoryArticles: function(slug) {
            if (!promise['category_' + slug]) {
                promise['category_' + slug] = $http.get(config.categoryPostsApiUrl.replace('{slug}', slug)).then(function(res) {
                    return res.data;
                });
            }
            return promise['category_' + slug];
        },
        getNavG: function() {
            if (!promise['nav']) {
                promise['nav'] = $http.get(config.navApiUrl).then(function(res) {
                    return res.data;
                });
            }
            return promise['nav'];
        }
    };
});
;
app.directive('navG', ['datasSce', function(datasSce) {
    return {
		restrict: 'A',
		link: function (scope, elm, attrs) {

			datasSce.getNavG().then(function(datas) {
				scope.nav = datas;
			});

		},
        templateUrl: config.incPath + 'nav-g.html',
        replace: false
    };
}]);
;
app.filter('stripTags', [function() {
	return function(text) {
		return String(text).replace(/<[^>]+>/gm, '');
	}
}]);;
app.filter('trustAsHtml', ['$sce', function($sce) {
    return function(html) {
        return $sce.trustAsHtml(html);
    };
}]);

app.filter('trustAsUrl', ['$sce', function($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);;
(function() {

    app.controller('ArticleCtrl', function($scope, $rootScope, $routeParams, datasSce) {

        if ($routeParams.articleId) {
            dataPromise = datasSce.getArticleById($routeParams.articleId).then(function (datas) {
                $scope.article = datas;console.log("article:", $scope.article);
                $rootScope.appReady = true;
            });
        } else if ($routeParams.articleSlug) {
            dataPromise = datasSce.getArticleBySlug($routeParams.articleSlug).then(function (datas) {
                $scope.article = datas[0];console.log("article:", $scope.article);
                $rootScope.appReady = true;
            });
        }

    });

})();
;
(function() {

    app.controller('CategoryCtrl', function($scope, $rootScope, $routeParams, $timeout, datasSce) {

        dataPromise = datasSce.getCategoryArticles($routeParams.categorySlug).then(function(datas) {
            $scope.articles = datas;console.log("articles:", $scope.articles);
            $scope.order = '-date';

            $rootScope.appReady = true;
        });

    });

})();
;
(function() {

    app.controller('HomeCtrl', function($scope, $rootScope, $timeout, datasSce) {

        dataPromise = datasSce.getArticles().then(function(datas) {
            $scope.articles = datas;console.log("articles:", $scope.articles);
            $scope.order = '-date';

            $rootScope.appReady = true;
        });

    });

})();
;
(function() {

	app.controller('MainCtrl', function($scope, $rootScope, $location, $document, $timeout, $q, datasSce) {

		var items,
			dataPromise = {},
			documentHeight = $document.height(),
			documentWidth = $document.width(),
			scrollTop = $document.scrollTop();

		$scope.dateToTimestamp = function(date, locale) {
			if (date) {
				if (locale == 'fr') {
					var year = date.substr(6, 4);
					var month = parseInt(date.substr(3, 2)) - 1;
					var day = date.substr(0, 2);
				} else {
					var year = date.substr(0, 4);
					var month = parseInt(date.substr(5, 2)) - 1;
					var day = date.substr(8, 2);
				}
				var hours = date.substr(11, 2);
				var minutes = date.substr(14, 2);
				var seconds = date.substr(17, 2);
				var milliseconds = '000';
				return Math.round(new Date(year, month, day, hours, minutes, seconds, milliseconds));
			}
		};

        $scope.go = function(path, $event) {
            $location.path(path);
            if ($event) {
                $event.preventDefault();
            }
        };

        $scope.clickLogo = function($event) {
            $scope.go('/', $event);
            jQuery("html, body").animate({scrollTop:0}, 'slow');
        };

	});

})();
;
(function() {

	app.controller('ShareCtrl', function($scope) {

		var shareUrl,
			popupWidth = 640,
			popupHeight = 480,
			canonicalUrl = angular.element("meta[property='og:url']").attr("content"),
			title = angular.element("meta[property='og:title']").attr("content"),
			description = angular.element("meta[property='og:description']").attr("content"),
			image = angular.element("meta[property='og:image']").attr("content");

		$scope.share = function(provider) {
			switch (provider) {
				case 'facebook': 
					shareUrl = "http://www.facebook.com/sharer.php?s=100&p[title]="+ encodeURIComponent(title) +"&p[url]=" + encodeURIComponent(canonicalUrl) +"&p[images][0]="+ image +"&p[summary]=" + encodeURIComponent(description);
				break;
				case 'twitter': 
					shareUrl = "https://twitter.com/share?url=" + encodeURIComponent(canonicalUrl) + "&text=" + encodeURIComponent(title) + "&via=lequipe";
				break;
				case 'google': 
					shareUrl = "https://plus.google.com/share?url=" + encodeURIComponent(canonicalUrl);
				break;
			};
			var popupX = (screen.availWidth / 2) - (popupWidth / 2);
			var popupY = (screen.availHeight / 2) - (popupHeight / 2);
			window.open(shareUrl, provider, "width="+ popupWidth +",height="+ popupHeight +",left="+ popupX +",top="+ popupY);
		};

	});

})();