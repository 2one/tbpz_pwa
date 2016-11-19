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