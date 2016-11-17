var config = {
    viewsPath: "./app/views/",
    incPath: "./app/views/partials/",
    apiUrls: {
        posts: '//thebackpackerz.com/wp-json/posts?type=post&filter[category_name]={slug}&filter[s]={search}&filter[posts_per_page]=4&page={page}',
        post: '//thebackpackerz.com/wp-json/posts?type=post&filter[name]={slug}',
        pages: '//thebackpackerz.com/wp-json/posts?type=page',
        page: '//thebackpackerz.com/wp-json/posts?type=page&filter[name]={slug}',
        singlepost: '//thebackpackerz.com/wp-json/posts/{ID}',
        nav: '//thebackpackerz.com/wp-json/posts/types/posts/taxonomies/category/terms'
    }
};
;
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
;
app.service('datasSce', function($http) {
    var promise = {};
    return {
        getArticles: function(categorySlug, searchQuery, page) {
            if (!categorySlug) {
                var categorySlug = '';
            }
            if (!searchQuery) {
                var searchQuery = '';
            }
            if (!page) {
                var page = 1;
            }
            if (!promise['articles_' + categorySlug + '_'+ searchQuery + '_page' + page]) {
                promise['articles_' + categorySlug + '_'+ searchQuery + '_page' + page] = $http.get(config.apiUrls.posts.replace('{slug}', categorySlug).replace('{search}', searchQuery).replace('{page}', page)).then(function(res) {
                    return res.data;
                });
            }
            return promise['articles_' + categorySlug + '_'+ searchQuery + '_page' + page];
        },
        getArticleById: function(id) {
            if (!promise['article_'+ id]) {
                promise['article_'+ id] = $http.get(config.apiUrls.singlepost.replace('{ID}', id)).then(function(res) {
                    return res.data;
                });
            }
            return promise['article_'+ id];
        },
        getArticleBySlug: function(slug) {
            if (!promise['article_'+ slug]) {
                promise['article_'+ slug] = $http.get(config.apiUrls.post.replace('{slug}', slug)).then(function(res) {
                    return res.data;
                });
            }
            return promise['article_'+ slug];
        },
        getPages: function() {
            if (!promise['pages']) {
                promise['pages'] = $http.get(config.apiUrls.pages).then(function(res) {
                    return res.data;
                });
            }
            return promise['pages'];
        },
        getPageBySlug: function(slug) {
            if (!promise['page_'+ slug]) {
                promise['page_'+ slug] = $http.get(config.apiUrls.page.replace('{slug}', slug)).then(function(res) {
                    return res.data;
                });
            }
            return promise['page_'+ slug];
        },
        getNavG: function() {
            if (!promise['nav']) {
                promise['nav'] = $http.get(config.apiUrls.nav).then(function(res) {
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
app.filter('parseLinks', [function() {
    return function(html) {
        return String(html).replace(/<a([^>]*)href="http:\/\/thebackpackerz.com/gm, '<a$1href="\/#').replace(/_blank/gm, '_self');
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
                $scope.article = datas;
                console.log("article:", $scope.article);
                $rootScope.appReady = true;
            }).catch(function(error) {
                console.warn(error);
                $scope.go('/error');
            });
        } else if ($routeParams.articleSlug) {
            dataPromise = datasSce.getArticleBySlug($routeParams.articleSlug).then(function (datas) {
                if (!datas.length) {
                    $scope.article = datas;
                    $scope.go('/error/404');
                } else {
                    $scope.article = datas[0];
                    console.log("article:", $scope.article);
                }
                $rootScope.appReady = true;
            }).catch(function(error) {
                console.warn(error);
                $scope.go('/error');
            });
        }

    });

})();
;
(function() {

    app.controller('ArticlesCtrl', function($scope, $rootScope, $routeParams, $timeout, $document, datasSce) {

        var windowHeight = document.documentElement.clientHeight,
            documentHeight = $document.height(),
            scrollTop = $document.scrollTop(),
            categorySlug = ($routeParams.categorySlug) ? $routeParams.categorySlug : '',
            searchQuery = ($routeParams.searchQuery) ? $routeParams.searchQuery : '';

        $scope.articles = [];
        $scope.page = 1;
        $scope.order = '-date';

        $scope.load = function () {
            dataPromise = datasSce.getArticles(categorySlug, searchQuery, $scope.page).then(function(datas) {
                $scope.articles = $scope.articles.concat(datas);
                console.log("articles:", $scope.articles);
                $rootScope.appReady = true;
                $scope.loadingNext = false;
            }).catch(function(error) {
                console.warn(error);
                $rootScope.appReady = true;
                $scope.go('/error');
            });
        }
        $scope.load();

        angular.element(window).off('scroll');
        angular.element(window).on('scroll', function () {
            scrollTop = $document.scrollTop();
            documentHeight = $document.height();
            if (documentHeight - windowHeight == scrollTop && !$scope.loadingNext && $scope.page < 10 && ['home', 'category', 'search'].indexOf($scope.slug) > -1) {
                $scope.loadingNext = true;
                $scope.page++;
                $scope.load();
            }
        });

    });

})();
;
(function() {

    app.controller('ErrorCtrl', function($scope, $rootScope, $routeParams, datasSce) {

        $rootScope.appReady = true;

    });

})();
;
(function() {

	app.controller('MainCtrl', function($scope, $rootScope, $location) {

		var items,
			dataPromise = {};

        $scope.searchQuery = '';

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

        $scope.toggleNav = function() {
            $rootScope.isSearching = false;
            $rootScope.isNavigating = $rootScope.isNavigating ? false : true;
        };

        $scope.toggleSearch = function() {
            $rootScope.isNavigating = false;
            $rootScope.isSearching = $rootScope.isSearching ? false : true;
            if ($rootScope.isSearching) {
                angular.element('#searchInput').focus();
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

        $scope.search = function() {
            $scope.go('/s/' + $scope.searchQuery);
        };

	});

})();
;
(function() {

    app.controller('PageCtrl', function($scope, $rootScope, $routeParams, datasSce) {

        dataPromise = datasSce.getPageBySlug($routeParams.pageSlug).then(function (datas) {
            if (!datas.length) {
                $scope.article = datas;
                $scope.go('/error/404');
            } else {
                $scope.article = datas[0];
                console.log("page:", $scope.article);
            }
            $rootScope.appReady = true;
        }).catch(function(error) {
            console.warn(error);
            $scope.go('/error');
        });

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