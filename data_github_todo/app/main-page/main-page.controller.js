(function () {
    "use strict";

    angular.module('lits.todo-app')
        .controller('MainPageController', MainPageController);

    function MainPageController($scope, GitHubUsersService) {
        // variables
        var name = '';
        var login = '';
        var location = '';
        var avatar = '';
        var url = '';
        $scope.found = null;
        $scope.userName = '';
        $scope.theURL = "https://api.github.com/users/";
        $scope.addItem = addItem;
        $scope.userItems = [];
        $scope.activate = activate()

        // methods
        $scope.isShowItems = isShowItems;

        activate();

        //
        // Public methods
        //
        function httpGet(theUrl)
		{
		    var xmlHttp = new XMLHttpRequest();
		    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
		    xmlHttp.send( null );
		    return xmlHttp.responseText;
		}
		
		function addItem() {
        	var arr = JSON.parse(httpGet($scope.theURL + $scope.userName));
        	$scope.found = false;
        	if ((arr != null) && (arr.message != "Not Found")){
        		$scope.found = true;
        		name = arr.name;
        		login = arr.login;
        		location = arr.location;
        		avatar = arr.avatar_url;
        		url = arr.url;
        		GitHubUsersService.addItem(name, login, location, avatar, url);
        	}
        	activate(); 
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