'use strict';



(function () {
    var flt = angular.module('dwd.shared.filters', []);
    // return no of selected rows in grid
    flt.filter('selected', function () {
        return function (items) {
            var obj = _.filter(items, function (x) {
                return x.show == true
            });
            return _.size(obj);
        }
    });

    // hiding paging if 0 column is selected
    flt.filter('columnSelection', function () {
        return function (items) {
            var obj = _.filter(items, function (x) {
                return x.show == true
            });
            var count = _.size(obj);
           if (count > 0) {
               return true;
           }
           return false;
        }
    });

    // Main Filter for Grid return list based on criteria , attached on tr element on grid
    flt.filter('myFilter', ['FilterService', function (FilterService) {

        return function (items, options) {

            switch (options.selectedFilter) {
                case 'CT':
                    {
                        return FilterService.Contains(items, options.searchValue, options.selectedField);
                    }
                case 'EQ':
                    {
                        return FilterService.Equals(items, options.searchValue, options.selectedField);
                    }
                case 'ST':
                    {
                        return FilterService.StartWith(items, options.searchValue, options.selectedField);
                    }
                case 'ET':
                    {
                        return FilterService.EndWith(items, options.searchValue, options.selectedField);
                    }

                case 'Contains':
                    {
                        return FilterService.Contains(items, options.searchValue, options.selectedField);
                    }
                case 'Equals':
                    {
                        return FilterService.Equals(items, options.searchValue, options.selectedField);
                    }
                case 'StartWith':
                    {
                        return FilterService.StartWith(items, options.searchValue, options.selectedField);
                    }
                case 'EndWith':
                    {
                        return FilterService.EndWith(items, options.searchValue, options.selectedField);
                    }

                default: {
                    return items;
                }

            }
            //alert(options.searchValue + '-' + options.selectedField + '-' + options.selectedFilter);
            //return items;
        }
    }]);

    return flt;

})();