(function () {
    "use strict";

    angular.module('lits.todo-app')
        .factory('GitHubUsersService', GitHubUsersService);

    function GitHubUsersService($window) {
        var ITEMS_NAME = 'test1';
        var items = getFromLocalStorage();

        return {
            getItems: getItems,
            addItem: addItem,
            removeItem: removeItem,
        };

        //
        // Public methods
        //

        // returns copy of array with items
        function getItems() {
            return items.slice(0);
        }

        function addItem(name, login, location, avatar, url) {
        	//alert(name);
            items.push({
                id: getNextId(),
                name: name,
                login: login,
                location: location,
                avatar: avatar,
                url: url
            });

            updateLocalStorage();
        }

        function removeItem(id) {
            for (var i = 0; i < items.length; i++) {
                if (items[i].id === id) {
                    items.splice(i, 1);
                    break;
                }
            }

            updateLocalStorage();
        }

        //
        // Private methods
        //

        function updateLocalStorage() {
            var value = JSON.stringify(items);
            $window.localStorage.setItem(ITEMS_NAME, value);
        }

        function getFromLocalStorage() {
            var value = $window.localStorage.getItem(ITEMS_NAME);

            var items = [];
            if (value) {
                items = JSON.parse(value);
            }

            return items;
        }

        function getNextId() {
            var nextId = 0;

            if (items.length > 0) {
                nextId = items[items.length - 1].id + 1;
            }

            return nextId;
        }
    }
})();