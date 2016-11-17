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
