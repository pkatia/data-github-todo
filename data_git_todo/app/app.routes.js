(function () {
    "use strict";

    angular.module('lits.todo-app')
        .config(routes);

    function routes($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'main-page/main-page.tpl.html',
                controller: 'MainPageController'
            })
            .when('/add-item', {
                templateUrl: 'add-item/add-item.tpl.html',
                controller: 'AddItemController'
            })
            .otherwise({
                templateUrl: 'not-found/not-found.tpl.html',
                controller: 'NotFoundController'
            });
    }
})();