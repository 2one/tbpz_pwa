(function() {

    app.controller('CategoryCtrl', function($scope, $rootScope, $routeParams, $timeout, datasSce) {

        dataPromise = datasSce.getCategoryArticles($routeParams.categorySlug).then(function(datas) {
            $scope.articles = datas;console.log("articles:", $scope.articles);
            $scope.order = '-date';

            $rootScope.appReady = true;
        });

    });

})();
