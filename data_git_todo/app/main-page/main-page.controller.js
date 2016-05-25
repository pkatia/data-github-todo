(function () {
    "use strict";

    angular.module('lits.todo-app')
        .controller('MainPageController', MainPageController);

    function MainPageController($scope, $http, GitHubUsersService) {
        // variables
        $scope.found = true;
        $scope.userName = '';
        var theURL = "https://api.github.com/users/";
        $scope.userItems = [];

        // methods
        $scope.isShowItems = isShowItems;
        $scope.activate = activate();
        $scope.addItem = addItem;
		activate();
        //
        // Public methods
        //
        function httpGet(theUrl)
		{
		    var xmlHttp = new XMLHttpRequest();
		    xmlHttp.open( "GET", theUrl, false); // false for synchronous request
		    xmlHttp.send( null );
		    return xmlHttp.responseText;
		}
		
		function addItem() {
			$http.get(theURL + $scope.userName).then(function(response) {
			    $scope.data = response.data;
				$scope.found = true;
				GitHubUsersService.addItem($scope.data);
				activate(); 
			}, function (response) {
				$scope.found = false;
			});       	
        }
        
        function isShowItems() {
            return $scope.userItems.length > 0;
        }

        //
        // Private methods
        //

        function activate() {
            updateItems();
        }

        function updateItems() {
            $scope.userItems = GitHubUsersService.getItems();
        }
              
    }
})();