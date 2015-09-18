docloudApp.controller('cardsCtrl', // name of the controller

function($scope,cardsFactory,filtersFactory) { // definition of the controller

	var cards = [], filters = []; // this.cards; 
	$scope.cards=cards; // default
	$scope.filters=filters; // default

	$scope.cardsSortedBy = 'name-ascending';
	$scope.cardsFilteredBy = '';
	$scope.cardsNameContains = '';
	var selectCardFilter = function(card) {
		console.debug('calling funcion selectCardFilter:',card);
		$scope.cardsFilteredBy = card;
	};
	var searchAndSortcards = function() {
		var i;
		var searchnameRegExp;
		var filterRegExp;
		var filteredCards;
		var result = [];
		// Filtering cards
		if ($scope.cardsFilteredBy && $scope.cardsFilteredBy != '') {
			console.debug('$scope.cardsFilteredBy:',$scope.cardsFilteredBy);
			var cardsFilteredBy = $scope.cardsFilteredBy;
			try {
				var filter = cardsFilteredBy.match(/(.*)(?:\[)(?:.*)(?:\])/)[1];
				var value = cardsFilteredBy.match(/(?:.*)(?:\[)(.*)(?:\])/)[1];
				
				console.debug('filter:'+filter);
				console.debug('value:'+value);
	
				if (filter === 'categories') {
					for (i = 0; i < cards.length; i++) {
						for (j = 0; j < cards[i].categories.length; j++) {
							console.debug('cards[i].categories[j].toUpperCase():'+cards[i].categories[j].toUpperCase());
							if ( value.toUpperCase() === cards[i].categories[j].toUpperCase() ) {
								result.push(cards[i]);
							}
						}
					}
				} else if (filter === 'developments') {
					for (i = 0; i < cards.length; i++) {
						for (j = 0; j < cards[i].developments.length; j++) {
							console.debug('cards[i].developments[j].toUpperCase():'+cards[i].developments[j].toUpperCase());
							if ( value.toUpperCase() === cards[i].developments[j].toUpperCase() ) {
								result.push(cards[i]);
							}
						}
					}
				}				
			} catch (e) {
				console.error(e);
			}
			
		} else {
			result = cards;
		}
		// Searching for any fields containing the search string
		if ($scope.cardsNameContains && $scope.cardsNameContains != '') {
			searchnameRegExp = new RegExp($scope.cardsNameContains, 'i');
			filteredCards = result;
			result = [];
			// author
			for (i = 0; i < filteredCards.length; i++) {
				if (searchnameRegExp.test(filteredCards[i].name)) {
					result.push(filteredCards[i]);
				}
			}
			// name
			for (i = 0; i < filteredCards.length; i++) {
				if (searchnameRegExp.test(filteredCards[i].name)) {
				  if ($.inArray(filteredCards[i], result) == -1) {
	          result.push(filteredCards[i]);
					}
				}
			}
			// description
			for (i = 0; i < filteredCards.length; i++) {
				if (searchnameRegExp.test(filteredCards[i].description)) {
				  if ($.inArray(filteredCards[i], result) == -1) {
	          result.push(filteredCards[i]);
					}
				}
			}
			// categories
			for (i = 0; i < filteredCards.length; i++) {
				for (j = 0; j < filteredCards[i].categories.length; j++) {
					if (searchnameRegExp.test(filteredCards[i].categories[j])) {
						if ($.inArray(filteredCards[i], result) == -1) {
			        result.push(filteredCards[i]);
						}
					}
				}
			}
			// languages
			for (i = 0; i < filteredCards.length; i++) {
				for (j = 0; j < filteredCards[i].languages.length; j++) {
					if (searchnameRegExp.test(filteredCards[i].languages[j])) {
						if ($.inArray(filteredCards[i], result) == -1) {
			        result.push(filteredCards[i]);
						}
					}
				}
			}
			// industries
			for (i = 0; i < filteredCards.length; i++) {
				for (j = 0; j < filteredCards[i].industries.length; j++) {
					if (searchnameRegExp.test(filteredCards[i].industries[j])) {
						if ($.inArray(filteredCards[i], result) == -1) {
			        result.push(filteredCards[i]);
						}
					}
				}
			}
		}
		$scope.cards = result;
		// Sorting the cards
		if ($scope.cardsSortedBy.match(/name/)) {
			$scope.cards.sort(function(a, b) {
				if (a.name < b.name) {
					return -1;
				} else if (a.name > b.name) {
					return 1;
				}
				return 0;
			});
		} else if ($scope.cardsSortedBy.match(/categories/)) {
			$scope.cards.sort(function(a, b) {
				if (a.categories < b.categories) {
					return -1;
				} else if (a.categories > b.categories) {
					return 1;
				}
				return 0;
			});
		} else if ($scope.cardsSortedBy.match(/languages/)) {
			$scope.cards.sort(function(a, b) {
				if (a.languages < b.languages) {
					return -1;
				} else if (a.languages > b.languages) {
					return 1;
				}
				return 0;
			});
		} else if ($scope.cardsSortedBy.match(/description/)) {
			$scope.cards.sort(function(a, b) {
				if (a.description < b.description) {
					return -1;
				} else if (a.description > b.description) {
					return 1;
				}
				return 0;
			});
		}
		if ($scope.cardsSortedBy.match(/descending/)) {
			$scope.cards.reverse();
		}
		
	};
	$scope.$watch('cardsSortedBy + "," + cardsNameContains + "," + cardsFilteredBy', function(newValue, oldValue) {
		searchAndSortcards();
	});
	
	$scope.getCtrlScope = function() {
         return $scope;   
    }

    cardsFactory.get().then(function (response) {
        $scope.cards = response.data;
        cards = $scope.cards;
    });
    filtersFactory.get().then(function (response) {
        $scope.filters = response.data;
        filters = $scope.filters;
    });
	searchAndSortcards();
}
);