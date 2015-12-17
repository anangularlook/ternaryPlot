/// <reference path="http://code.angularjs.org/1.2.16/angular.min.js" />;
(function () {
    "use strict";

    angular.module('myApp')
    .directive('ternaryPlot', ['$timeout', function ($timeout) {

        controller.$inject = ['$scope', '$element'];

        // Link Function - DOM Manipulation
        function link($scope, $element, $attrs) {

            $timeout(function () { // Wait for the DOM to finish rendering
                // Get the values from the attributes
                var _width = parseInt($attrs.size, 10);
                var _height = parseInt($attrs.size, 10);
                var _padding = parseInt($attrs.padding, 10);

                // Create the image
                $element.append('<svg id="' + $attrs.svgId + '" height="' + _height + '" width="' + _width + '"></svg>'); 
                var svg = angular.element(document.querySelector('#' + $attrs.svgId));

                // Add a grouping for the chart information
                svg.append('<g id="' + $attrs.chartId + '"></g>');
            });


        }

        // Controller Function - Scope Manager
        function controller($scope, $element) {
            var vm = this;

            /* BINDABLE MEMBERS */

            /* WATCHES */

            /* EVENT HANDLERS */

            /* PRIVATE */
            function initialize() {

            }

            // Initialize directive
            initialize();

        }

        // Directive Definition
        var directive = {
            restrict: 'A',
            scope: {
                chartId: '@',
                svgId: '@',
                size: '=',
                padding: '='
            },
            link: link,
            controller: controller,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    }]);

})();
