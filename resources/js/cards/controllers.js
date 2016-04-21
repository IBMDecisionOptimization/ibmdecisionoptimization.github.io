docloudApp.controller('cardsCtrl', // name of the controller

    function ($scope, cardsFactory, filtersFactory) { // definition of the controller

        var cards = [], filters = [], filteredCards = [], selectedFilters = []; // this.cards;
        $scope.cards = cards; // default
        $scope.filters = filters; // default
        $scope.filteredCards = filteredCards; // default

        $scope.selectedFilters = selectedFilters // default .categories
        $scope.cardsSortedBy = 'name-ascending';
        $scope.cardsFilteredBy = '';
        $scope.cardsNameContains = '';

        $scope.debug = false;

        var selectCardFilter = function (card) {
            if ($scope.debug) console.debug('calling funcion selectCardFilter:', card);
            $scope.cardsFilteredBy = card;
        };
        var filterCards = function () {
            if ($scope.debug) console.log("=>filterCards")
            // filter by categories
            $scope.filteredCards.categories = new Array();
            for ( k = 0; k < $scope.filters.categories.length; k++) {
                var cat_name = $scope.filters.categories[k].name;
                $scope.filteredCards.categories[cat_name] = new Array() ;

                for (i = 0; i < cards.length; i++) {
                    for (j = 0; j < cards[i].categories.length; j++) {
                        if ($scope.filters.categories[k].name.toUpperCase() === cards[i].categories[j].toUpperCase()) {
                            try {
                                $scope.filteredCards.categories[cat_name].push(cards[i]);

                            } catch(e) {
                                console.error(e);

                            }
                        }
                    }
                }

            }
            // filter by developments
            // filter by models
            // filter by industries
        };
        var searchAndSortcards = function () {
            if ($scope.debug) console.log("=>searchAndSortcards")
            var i;
            var searchnameRegExp;
            var filterRegExp;
            var filteredCards;
            var result = [];
            // Filtering cards
            if ($scope.cardsFilteredBy && $scope.cardsFilteredBy != '') {
                if ($scope.debug) console.debug('$scope.cardsFilteredBy:', $scope.cardsFilteredBy);
                if ($scope.debug) console.debug('$scope.selectedFilters:', $scope.selectedFilters);
                var cardsFilteredBy = $scope.cardsFilteredBy;
                try {
                    //var filter = cardsFilteredBy.match(/(.*)(?:\[)(?:.*)(?:\])/)[1];
                    //var value = cardsFilteredBy.match(/(?:.*)(?:\[)(.*)(?:\])/)[1];
                    var selectedFilters = $scope.selectedFilters;
                    var prefiltered = cards;
                    if ($scope.debug) console.debug('selectedFilters:', selectedFilters);

                    var sortedKeys = Object.keys($scope.selectedFilters).sort();

                    var nbCategoriesFilters = 0,  nbOtherFilters = 0;
                    for (i = 0; i < sortedKeys.length; i++) {
                        var _filter = sortedKeys[i];
                        if ($scope.debug) console.log("ddd_filter",_filter)

                        if (_filter.toUpperCase() == 'categories'.toUpperCase()) {
                            nbCategoriesFilters += $scope.selectedFilters[_filter].length;

                        } else {
                            nbOtherFilters += $scope.selectedFilters[_filter].length;

                        }
                    }
                    if ($scope.debug) console.log("nbCategoriesFilters",nbCategoriesFilters)
                    if ($scope.debug) console.log("nbOtherFilters",nbOtherFilters)

                    if (nbCategoriesFilters > 0) {
                        for (k = 0; k < sortedKeys.length; k++) {
                            var _filter = sortedKeys[k];
                            if ($scope.debug) console.debug('_filter:', _filter);
                            var _values = $scope.selectedFilters[_filter];
                            if (_filter.toUpperCase() == 'categories'.toUpperCase()) {
                                for (l = 0; l < _values.length; l++) {
                                    if ($scope.debug) console.debug('_value,l', _values[l], l);
                                    var _value = _values[l];
                                    for (i = 0; i < cards.length; i++) {
                                        for (j = 0; j < cards[i][_filter].length; j++) {
                                            if ($scope.debug) console.debug('cards[i][_filter][j].toUpperCase():' + cards[i][_filter][j].toUpperCase());
                                            if (_value.toUpperCase() === cards[i][_filter][j].toUpperCase()) {
                                                if (result.indexOf(cards[i]) == -1) {
                                                    result.push(cards[i]);
                                                }
                                            }
                                        }
                                    }

                                }
                            }
                        }
                        prefiltered = result;

                    }

                    if (nbOtherFilters > 0) {
                        result = [];
                        for (k = 0; k < sortedKeys.length; k++) {
                            var _filter = sortedKeys[k];
                            if ($scope.debug) console.debug('_filter:', _filter);
                            if (_filter.toUpperCase() != 'categories'.toUpperCase()) {
                                var _values = $scope.selectedFilters[_filter];
                                for (l = 0; l < _values.length; l++) {
                                    if ($scope.debug) console.debug('_value,l', _values[l],l);
                                    var _value = _values[l];
                                    for (i = 0; i < prefiltered.length; i++) {
                                        if ($scope.debug) console.debug('cards[i][_filter]' + prefiltered[i][_filter]);
                                        for (j = 0; j < prefiltered[i][_filter].length; j++) {
                                            if ($scope.debug) console.debug('cards[i][_filter][j].toUpperCase():' + prefiltered[i][_filter][j].toUpperCase());
                                            if ($scope.debug) console.debug('_value.toUpperCase():' + _value.toUpperCase());
                                            if (_value.toUpperCase() === prefiltered[i][_filter][j].toUpperCase()) {
                                                if (result.indexOf(prefiltered[i]) == -1) {
                                                    result.push(prefiltered[i]);
                                                }
                                            }
                                        }
                                    }

                                }
                            }

                        }
                    } else {
                        result = prefiltered;
                    }

                    if ( nbCategoriesFilters + nbOtherFilters == 0) {
                        result = cards;
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
                        if ($.inArray(filteredCards[i], result) == -1)
                            result.push(filteredCards[i]);
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
                // developments
                for (i = 0; i < filteredCards.length; i++) {
                    for (j = 0; j < filteredCards[i].developments.length; j++) {
                        if (searchnameRegExp.test(filteredCards[i].developments[j])) {
                            if ($.inArray(filteredCards[i], result) == -1) {
                                result.push(filteredCards[i]);
                            }
                        }
                    }
                }
                // models
                for (i = 0; i < filteredCards.length; i++) {
                    for (j = 0; j < filteredCards[i].models.length; j++) {
                        if (searchnameRegExp.test(filteredCards[i].models[j])) {
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
            if ($scope.debug) console.log("+++->cards.length",cards.length);
            if ($scope.debug) console.log("+++->$result.length",result.length);
            if ( $scope.cardsFilteredBy=='' && $scope.cardsNameContains=='' && cards.length == result.length) {
                $('.infofilter').hide();
            } else {
                $('.infofilter').fadeIn( "slow" );

            }
            $scope.cards = result;
            // Sorting the cards
            if ($scope.cardsSortedBy.match(/name/)) {
                $scope.cards.sort(function (a, b) {
                    if (a.name < b.name) {
                        return -1;
                    } else if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                });
            } else if ($scope.cardsSortedBy.match(/categories/)) {
                $scope.cards.sort(function (a, b) {
                    if (a.categories < b.categories) {
                        return -1;
                    } else if (a.categories > b.categories) {
                        return 1;
                    }
                    return 0;
                });
            } else if ($scope.cardsSortedBy.match(/languages/)) {
                $scope.cards.sort(function (a, b) {
                    if (a.languages < b.languages) {
                        return -1;
                    } else if (a.languages > b.languages) {
                        return 1;
                    }
                    return 0;
                });
            } else if ($scope.cardsSortedBy.match(/description/)) {
                $scope.cards.sort(function (a, b) {
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

        var setUriParameters = function () {
            if ($scope.debug) console.log("=>setUriParameters")

            var toSerialized = {
                cardsSortedBy: $scope.cardsSortedBy,
                cardsNameContains: $scope.cardsNameContains,
                selectedFilters: new Array()
            }

            var sortedKeys = Object.keys($scope.selectedFilters).sort();
            for ( i= 0 ; i < sortedKeys.length ; i++ ) {
                filterkey = sortedKeys[i];
                arr = $scope.selectedFilters[filterkey];
                _arr = new Array();

                for (j= 0 ; j < arr.length ; j++ ) {
                    _arr.push(arr[j]);
                }
                var a = {};
                a[filterkey] = _arr;

                toSerialized.selectedFilters.push(a);
            }

            // var recursiveEncoded = objectParametize(toSerialized, '&', true);
            var recursiveEncoded = encodeURI(JSON.stringify( toSerialized ));

            if ($scope.debug) console.log("toSerialized",toSerialized)
            //if ($scope.debug) console.log("recursiveEncoded",recursiveEncoded)

            document.location.hash = recursiveEncoded;
        }

        var getUriParameters = function () {
            if ($scope.debug) console.log("=>getUriParameters")
            var hashParameters = location.hash.replace( /^#/, '' );
            if ($scope.debug) console.log("hashParameters",hashParameters)
            if (hashParameters) {
                var decodedURI = decodeURI( hashParameters );
                var unpackArr = JSON.parse( decodedURI );

                var sortedKeys = Object.keys(unpackArr).sort();
                for ( i=0 ; i < sortedKeys.length ; i++ ) {
                    filterkey = sortedKeys[i];
                    if ($scope.debug) console.log('->filterkey=',filterkey);
                    // process selected Filters
                    if ( !'selectedFilters'.localeCompare(filterkey) ) { // 14
                        for ( j=0 ; j < unpackArr[filterkey].length ; j++ ) {
                            var sortedFilterKeys = Object.keys(unpackArr[filterkey][j]).sort();
                            if ($scope.debug) console.log("=>sortedFilterKeys:",sortedFilterKeys[0]);
                            $scope.selectedFilters[sortedFilterKeys] = new Array(); // reset
                            for( k=0 ; k < unpackArr[filterkey][j][sortedFilterKeys].length ; k++ ) {
                                if ($scope.debug) console.log("=>unpackArr[filterkey][j][sortedFilterKeys]:",unpackArr[filterkey][j][sortedFilterKeys][k]);
                                $scope.selectedFilters[sortedFilterKeys].push(unpackArr[filterkey][j][sortedFilterKeys][k]);
                                if ($scope.debug) console.log("=>$scope.selectedFilters[sortedFilterKeys]:",$scope.selectedFilters[sortedFilterKeys]);
                                $scope.cardsFilteredBy = 1;
                            }

                        }
                        //res = filterkey.match(/^selectedFilters\[(.*)\]\[(.*)\]$/);
                        if ($scope.debug) console.log(filterkey+'->'+unpackArr[filterkey]+'=',res );


                    } else {
                        if (unpackArr[filterkey]) {
                            $scope[filterkey] = unpackArr[filterkey]
                            if ($scope.debug) console.log("=>$scope[filterkey]:",$scope[filterkey]);
                        }
                    }


                }

            }
            //
            // searchAndSortcards();

        }

        var showSidebar = function () {
            if ($scope.debug) console.log("=>showSidebar")
            $('#sidebar-wrapper .sidebar-nav').show("slow");
        }

        $scope.$watch('cardsSortedBy + "," + cardsNameContains + "," + cardsFilteredBy', function (newValue, oldValue) {
            searchAndSortcards();
        });

        $scope.getCtrlScope = function () {
            return $scope;
        }

        $scope.isSelected = function (item) {
            var filter = item.match(/(.*)(?:\[)(?:.*)(?:\])/)[1];
            var value = item.match(/(?:.*)(?:\[)(.*)(?:\])/)[1];
            if ( $scope.selectedFilters[filter].indexOf(value) == -1 ) {
                return false;
            } else {
                return true;
            }
        }

        $scope.toggleFilter = function (item) {
            var filter = item.match(/(.*)(?:\[)(?:.*)(?:\])/)[1];
            var value = item.match(/(?:.*)(?:\[)(.*)(?:\])/)[1];

            if( $scope.selectedFilters[filter].indexOf(value) == -1 ) {
                $scope.selectedFilters[filter].push(value);
                $scope.cardsFilteredBy = '+'+item;

            } else {
                var index = $scope.selectedFilters[filter].indexOf(value);
                $scope.selectedFilters[filter].splice(index, 1);
                $scope.cardsFilteredBy = '-'+item;
            }

            setUriParameters();
        }

        $scope.propagateChange = function () {
            // if ($scope.debug) console.log("=>change");"=>change");
            setUriParameters();
        }

        $scope.resetFilter = function () {
            filters = $scope.filters;

            var sortedKeys = Object.keys(filters).sort();
            for ( i= 0 ; i < sortedKeys.length ; i++ ) {
                $scope.selectedFilters[sortedKeys[i]] = new Array();
            }
            $scope.cardsFilteredBy = '';
            document.location.hash = '';
        }

        $scope.openUrl = function (url) {
            window.open(url);
        };

        filtersFactory.get().then(function (response) {
            $scope.filters = response.data;
            filters = $scope.filters;

            var sortedKeys = Object.keys(filters).sort();
            for ( i= 0 ; i < sortedKeys.length ; i++ ) {
                $scope.selectedFilters[sortedKeys[i]] = new Array();
            }

            cardsFactory.get().then(function (response) {
                $scope.cards = response.data;
                cards = $scope.cards;

                getUriParameters();
                filterCards();
                showSidebar();
            });
        });
    }
);