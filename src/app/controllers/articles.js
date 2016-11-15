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
            });
        }
        $scope.load();

        angular.element(window).bind('scroll', function() {
            scrollTop = $document.scrollTop();
            documentHeight = $document.height();
            if (documentHeight - windowHeight == scrollTop && !$scope.loadingNext && $scope.page < 10) {
                $scope.loadingNext = true;
                $scope.page++;
                $scope.load();
            }
        });

    });

})();
