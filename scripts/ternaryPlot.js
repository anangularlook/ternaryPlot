/// <reference path="http://code.angularjs.org/1.2.16/angular.min.js" />;
(function () {
    "use strict";

    angular.module('myApp')
    .directive('ternaryPlot', ['$timeout', 'ternaryPlotService', function ($timeout, ternaryPlotService) {

        controller.$inject = ['$scope', '$element'];

        // Link Function - DOM Manipulation
        function link($scope, $element, $attrs) {

            $timeout(function () { // Wait for the DOM to finish rendering
                // Get the values from the attributes
                var _width = parseInt($attrs.size, 10);
                var _height = parseInt($attrs.size, 10);
                var _padding = parseInt($attrs.padding, 10);
                var _namespace = 'http://www.w3.org/2000/svg';
                var _showThirdsIntervals = false;
                if ($attrs.showThirdsIntervals.toLowerCase() == 'true') _showThirdsIntervals = true;
                var _showTenthsIntervals = false;
                if ($attrs.showTenthsIntervals.toLowerCase() == 'true') _showTenthsIntervals = true;

                // Create the image
                var _attributes = {height: _height, width: _width, id: $attrs.svgId};
                var svg = document.createElementNS(_namespace, 'svg');
                for (var attr in _attributes) {
                    svg.setAttribute(attr, _attributes[attr]);
                }
                $element.append(svg);
                svg = null;

                // Add a grouping for the chart information
                svg = angular.element(document.querySelector('#' + $attrs.svgId));
                var _attributes = {id: $attrs.chartId};
                var chart = document.createElementNS(_namespace, 'g');
                for (var attr in _attributes) {
                    chart.setAttribute(attr, _attributes[attr]);
                }
                svg.append(chart);
                chart = null;

                // Add chart outline and background
                chart = angular.element(document.querySelector('#' + $attrs.chartId))
                var corners = ternaryPlotService.calculateSideCoordinates(_width, _padding);
                var path = 'M ' + corners.corner1.x + ' ' + corners.corner1.y + ' L ' + corners.corner2.x + ' ' + corners.corner2.y + ' L ' + corners.corner3.x + ' ' + corners.corner3.y + ' z';
                var _attributes = {id: $attrs.chartId + '-background-', fill: 'Bisque', d: path, 'stroke': 'black', 'stroke-weight': 2};
                var bgPath = document.createElementNS(_namespace, 'path');
                for (var attr in _attributes) {
                    bgPath.setAttribute(attr, _attributes[attr]);
                }
                chart.append(bgPath);

                // Add 1/3 interval lines
                if (_showThirdsIntervals) {
                    var intervals = ternaryPlotService.calculatePrimaryIntervals(_width, _padding);
                    for (var interval in intervals) {
                        _attributes = {
                            x1: intervals[interval].startx,
                            y1: intervals[interval].starty,
                            x2: intervals[interval].endx,
                            y2: intervals[interval].endy,
                            id: $attrs.chartId + 'primary-interval-' + interval,
                            'stroke': 'SaddleBrown',
                            'stroke-weight': 1,
                            'stroke-dasharray': '1,1'
                        };
                        var line = document.createElementNS(_namespace, 'line');
                        for (var attr in _attributes) {
                            line.setAttribute(attr, _attributes[attr]);
                        }
                        chart.append(line);
                    }
                }

                // Add tenth interval lines
                if (_showTenthsIntervals) {
                    var tenthLines = ternaryPlotService.calculateTenthLines(_width, _padding);

                    for (var i = 0; i < tenthLines.length; i++){
                        _attributes = {x1: tenthLines[i].x1, x2: tenthLines[i].x2, y1: tenthLines[i].y1, y2: tenthLines[i].y2,'stroke': 'black', 'stroke-weight': 1, 'stroke-dasharray': '1,2', id: $attrs.chartId + '-tenth-line-' + i};
                        var tenthLine = document.createElementNS(_namespace, 'line');
                        for (var attr in _attributes) {
                            tenthLine.setAttribute(attr, _attributes[attr]);
                        }
                        chart.append(tenthLine);
                    }
                }

                // Add tic marks
                var ticMarkPaths = ternaryPlotService.calculateTicMarks(_width, _padding);
                for (var i = 0; i < ticMarkPaths.length; i++){
                    var d = 'M ' + ticMarkPaths[i].x1 + ' ' + ticMarkPaths[i].y1 + ' L ' + ticMarkPaths[i].x2 + ' ' + ticMarkPaths[i].y2 + ' L ' + ticMarkPaths[i].x3 + ' ' + ticMarkPaths[i].y3;
                    _attributes = {d: d, 'stroke': 'black', 'stroke-weight': 1, id: $attrs.chartId + '-tic-' + i, fill: 'none'};
                    var ticPath = document.createElementNS(_namespace, 'path');
                    for (var attr in _attributes) {
                        ticPath.setAttribute(attr, _attributes[attr]);
                    }
                    chart.append(ticPath);
                }
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
