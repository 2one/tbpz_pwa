(function() {

    app.controller('HomeCtrl', function($scope, $rootScope, $timeout, datasSce) {

        dataPromise = datasSce.getArticles().then(function(datas) {
            $scope.articles = datas;console.log("articles:", $scope.articles);
            $scope.order = '-date';

            $rootScope.appReady = true;
        });

    });

})();
