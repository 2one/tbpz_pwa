(function() {

	app.controller('MainCtrl', function($scope, $rootScope, $location) {

		var items,
			dataPromise = {};

        $scope.searchQuery = '';

		$scope.dateToTimestamp = function(date, locale) {
			if (date) {
				if (locale == 'fr') {
					var year = date.substr(6, 4);
					var month = parseInt(date.substr(3, 2)) - 1;
					var day = date.substr(0, 2);
				} else {
					var year = date.substr(0, 4);
					var month = parseInt(date.substr(5, 2)) - 1;
					var day = date.substr(8, 2);
				}
				var hours = date.substr(11, 2);
				var minutes = date.substr(14, 2);
				var seconds = date.substr(17, 2);
				var milliseconds = '000';
				return Math.round(new Date(year, month, day, hours, minutes, seconds, milliseconds));
			}
		};

        $scope.toggleNav = function() {
            $rootScope.isSearching = false;
            $rootScope.isNavigating = $rootScope.isNavigating ? false : true;
        };

        $scope.toggleSearch = function() {
            $rootScope.isNavigating = false;
            $rootScope.isSearching = $rootScope.isSearching ? false : true;
            if ($rootScope.isSearching) {
                angular.element('#searchInput').focus();
            }
        };

        $scope.go = function(path, $event) {
            $location.path(path);
            if ($event) {
                $event.preventDefault();
            }
        };

        $scope.clickLogo = function($event) {
            $scope.go('/', $event);
            jQuery("html, body").animate({scrollTop:0}, 'slow');
        };

        $scope.search = function() {
            $scope.go('/s/' + $scope.searchQuery);
        };

	});

})();
