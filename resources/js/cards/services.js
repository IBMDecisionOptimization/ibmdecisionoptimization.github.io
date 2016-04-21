docloudApp.factory('cardsFactory', function ($http) {
    return {
        get: function () {
            console.log("get cards function");
            return $http.get('resources/data/cards.json');
        }
    };
});
docloudApp.factory('filtersFactory', function ($http) {
    return {
        get: function () {
            console.log("get filters function");
            return $http.get('resources/data/filters.json');
        }
    };
});