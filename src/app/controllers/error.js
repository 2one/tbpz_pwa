(function() {

    app.controller('ErrorCtrl', function($scope, $rootScope, $routeParams, datasSce) {

        $rootScope.appReady = true;
        $rootScope.isSwitchingView = false;
        $scope.setNetwork();

    });

})();
