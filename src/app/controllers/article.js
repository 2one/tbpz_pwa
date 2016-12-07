(function() {

    app.controller('ArticleCtrl', function($scope, $rootScope, $routeParams, datasSce) {

        $scope.setNetwork();
        $rootScope.isSwitchingView = true;
        datasSce.getArticleBySlug($routeParams.articleSlug).then(function (datas) {
            if (!datas) {
                datasSce.getPageBySlug($routeParams.articleSlug).then(function (datas) {
                    if (!datas.length) {
                        $scope.article = datas;
                        $scope.go('/error/404');
                    } else {
                        $scope.article = datas[0];
                        console.log("page:", $scope.article);
                    }
                    $rootScope.appReady = true;
                    $rootScope.isSwitchingView = false;
                }).catch(function(error) {
                    console.warn(error);
                    $rootScope.appReady = true;
                    $rootScope.isSwitchingView = false;
                    $scope.setNetwork();
                });
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

    });

})();
