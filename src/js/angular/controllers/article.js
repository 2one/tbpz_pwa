module.exports = function($scope, $rootScope, $routeParams, datasSce) {

    $scope.setNetwork();
    $rootScope.isSwitchingView = true;
    datasSce.getArticleBySlug($routeParams.articleSlug).then(function (datas) {
        if (!datas) {
            datasSce.getPageBySlug($routeParams.articleSlug).then(function (datas) {
                if (!datas.length) {
                    $scope.article = datas;
                    $scope.go('/error/404');
                    return;
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
            $rootScope.pageTitle = angular.element('<textarea />').html($scope.article.title).text();
            $rootScope.pageDescription = $scope.article.excerpt.replace(/(<([^>]+)>)/ig,"");
            $rootScope.pageImage = $scope.article.featured_image.attachment_meta.sizes.medium.url;
        }
        $rootScope.appReady = true;
        $rootScope.isSwitchingView = false;
        $scope.$apply();
    }).catch(function(error) {
        console.warn(error);
        $rootScope.appReady = true;
        $rootScope.isSwitchingView = false;
        $scope.setNetwork();
    });

};
