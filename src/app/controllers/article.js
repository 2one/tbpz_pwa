(function() {

    app.controller('ArticleCtrl', function($scope, $rootScope, $routeParams, datasSce) {

        $scope.setNetwork();
        $rootScope.isSwitchingView = true;

        if ($routeParams.articleId) {
            dataPromise = datasSce.getArticleById($routeParams.articleId).then(function (datas) {
                $scope.article = datas;
                console.log("article:", $scope.article);
                $rootScope.appReady = true;
                $rootScope.isSwitchingView = false;
            }).catch(function(error) {
                console.warn(error);
                $rootScope.appReady = true;
                $rootScope.isSwitchingView = false;
                $scope.setNetwork();
            });
        } else if ($routeParams.articleSlug) {
            dataPromise = datasSce.getArticleBySlug($routeParams.articleSlug).then(function (datas) {
                if (!datas) {
                    $scope.go('/error/404');
                } else {
                    $scope.article = datas;
                    console.log("article:", $scope.article);
                }
                $rootScope.appReady = true;
                $rootScope.isSwitchingView = false;
            }).catch(function(error) {
                console.warn(error);
                $rootScope.appReady = true;
                $rootScope.isSwitchingView = false;
                $scope.setNetwork();
            });
        }

    });

})();
