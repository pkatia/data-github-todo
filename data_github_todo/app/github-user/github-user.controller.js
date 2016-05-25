(function () {
    "use strict";

    angular.module('lits.todo-app')
        .controller('GithubUserController', GithubUserController);

    function GithubUserController($scope, $routeParams, $location, GithubDataService) {
        // variables
        $scope.user = null;

        activate();

        //
        // Private methods
        //

        function activate() {
            GithubDataService.getUser($routeParams.username)
                .then(function (response) {
                    $scope.user = response.data;
                })
                .catch(function () {
                    $location.path('/not-found');
                });
        }
    }
})();