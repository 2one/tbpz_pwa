(function() {

    app.controller('PageCtrl', function($scope, $rootScope, $routeParams) {

        if (!$routeParams.pageSlug) {
            $scope.go('/error/404');
            return;
        } else {
            $scope.pageSlug = $routeParams.pageSlug;
        }
        $rootScope.appReady = true;
        $rootScope.isSwitchingView = false;
        $scope.setNetwork();

    });

})();
