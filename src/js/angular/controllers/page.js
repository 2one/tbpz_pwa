module.exports = function($scope, $rootScope, $routeParams) {

    $scope.initPushButton = function() {
        if (Notification.permission === 'denied') {
            angular.element('#pushButton').remove();
        } else {
            sw.pushManager.getSubscription().then(function(subscription) {
                if (subscription !== null) {
                    angular.element('#pushButton').prop('checked', true);
                }
            });
        }
    };

    $scope.setPushButton = function($event) {
        if (!$event.target.checked) {console.log('unsubscribe');
            sw.pushManager.getSubscription().then(function(subscription) {
                if (subscription) {
                    return subscription.unsubscribe();
                }
            });
        } else {
            sw.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: utils.urlB64ToUint8Array(config.notification.publicKey)
            })
            .then(function(subscription) {
                console.log('User is subscribed.');
                //updateSubscriptionOnServer(subscription);
            })
            .catch(function(err) {
                console.log('Failed to subscribe the user: ', err);
            });
        }
    };

    if (!$routeParams.pageSlug) {
        $scope.go('/error/404');
        return;
    } else {
        $scope.pageSlug = $routeParams.pageSlug;

        if ($scope.pageSlug == 'settings') {
            $scope.initPushButton();
        }
    }
    $rootScope.appReady = true;
    $rootScope.isSwitchingView = false;
    $scope.setNetwork();

};
