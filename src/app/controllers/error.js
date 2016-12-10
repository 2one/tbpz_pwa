(function() {

    app.controller('ErrorCtrl', function($scope, $rootScope, $routeParams) {

        $scope.errorId = $routeParams.errorId;
        $rootScope.appReady = true;
        $rootScope.isSwitchingView = false;
        $scope.setNetwork();

    });

})();
