/// <reference path="http://code.angularjs.org/1.2.16/angular.min.js" />;
(function () {
    "use strict";

    angular.module('myApp')
        .directive('ternaryPlot', ['$timeout', 'ternaryPlotService', 'chartSettingsService', function ($timeout, ternaryPlotService, chartSettingsService) {
        controller.$inject = ['$scope', '$element'];

        // Link Function - DOM Manipulation
        function link($scope, $element, $attrs) {

            $timeout(function () { // Wait for the DOM to finish rendering
                var chartSettings = chartSettingsService.getChartSettings();

                // Get the values from the attributes
                var _width = parseInt($attrs.size, 10);
                var _height = parseInt($attrs.size, 10);
                var _padding = parseInt($attrs.padding, 10);
                var _namespace = 'http://www.w3.org/2000/svg';
                var _showThirdsIntervals = chartSettings.chartField.showPrimaryIntervals;
                var _showTenthsIntervals = chartSettings.chartField.showSecondaryIntervals;
                var _showTicMarks = chartSettings.chartField.showTicMarks;
                var _backgroundColor = chartSettings.chartField.backgroundColor;
                var _showChartOutline = chartSettings.chartField.outlineChart;
                var _backgroundStrokeColor = chartSettings.chartField.chartOutlineColor;
                var _chartOutlineWeight = chartSettings.chartField.chartOutlineWeight;
                var _ticMarkColor = chartSettings.chartField.ticMarkColor;
                var _ticMarkWeight = chartSettings.chartField.ticMarkWeight;
                var _primaryIntervalColor = chartSettings.chartField.primaryIntervalColor;
                var _secondaryIntervalColor = chartSettings.chartField.secondaryIntervalColor;

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
                chart = angular.element(document.querySelector('#' + $attrs.chartId));
                var corners = ternaryPlotService.calculateSideCoordinates(_width, _padding);
                var path = 'M ' + corners.corner1.x + ' ' + corners.corner1.y + ' L ' + corners.corner2.x + ' ' + corners.corner2.y + ' L ' + corners.corner3.x + ' ' + corners.corner3.y + ' z';
                var _attributes = {id: $attrs.chartId + '-background-', fill: _backgroundColor, d: path}
                if (_showChartOutline) angular.merge(_attributes, {
                    'stroke': _backgroundStrokeColor,
                    'stroke-weight': _chartOutlineWeight
                });
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
                            'stroke': _primaryIntervalColor,
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
                        _attributes = {
                            x1: tenthLines[i].x1,
                            x2: tenthLines[i].x2,
                            y1: tenthLines[i].y1,
                            y2: tenthLines[i].y2,
                            'stroke': _secondaryIntervalColor,
                            'stroke-weight': 1,
                            'stroke-dasharray': '1,2',
                            id: $attrs.chartId + '-tenth-line-' + i
                        };
                        var tenthLine = document.createElementNS(_namespace, 'line');
                        for (var attr in _attributes) {
                            tenthLine.setAttribute(attr, _attributes[attr]);
                        }
                        chart.append(tenthLine);
                    }
                }

                // Add tic marks
                if (_showTicMarks) {
                    var ticMarkPaths = ternaryPlotService.calculateTicMarks(_width, _padding);
                    for (var i = 0; i < ticMarkPaths.length; i++) {
                        var d = 'M ' + ticMarkPaths[i].x1 + ' ' + ticMarkPaths[i].y1 + ' L ' + ticMarkPaths[i].x2 + ' ' + ticMarkPaths[i].y2 + ' L ' + ticMarkPaths[i].x3 + ' ' + ticMarkPaths[i].y3;
                        _attributes = {
                            d: d,
                            'stroke': _ticMarkColor,
                            'stroke-weight': _ticMarkWeight,
                            id: $attrs.chartId + '-tic-' + i,
                            fill: 'none'
                        };
                        var ticPath = document.createElementNS(_namespace, 'path');
                        for (var attr in _attributes) {
                            ticPath.setAttribute(attr, _attributes[attr]);
                        }
                        chart.append(ticPath);
                    }
                }

            });
        }

        // Controller Function - Scope Manager
        function controller($scope, $element) {
            var vm = this;

            /* BINDABLE MEMBERS */

            /* WATCHES */
            $scope.$watch(function() {return vm.chartData}, function(newVal, oldVal) {
                // if (newVal === oldVal) return;
                if (typeof newVal != 'undefined' && newVal != null) {
                    $timeout(function() {
                        var symbols = chartSettingsService.getSymbols();
                        var styles = chartSettingsService.getTextStyles();
                        var newData = ternaryPlotService.convertToCartesian(newVal, vm.size, vm.padding);
                        var chart = angular.element(document.querySelector('#' + vm.chartId))
                        for (var index = 0; index < newData.length; index++) {
                            var symbol = symbols[newData.data[index].symbol.toLowerCase()];
                            if (symbol == null) symbol = symbols['circle'];
                            var _attributes;
                            switch (symbol[0]) {
                                case 'circle':
                                    _attributes = {
                                        cx: newData[index].x + symbol[1],
                                        cy: newData[index].y + symbol[2],
                                        r: symbol[3],
                                        'stroke': 'black',
                                        'stroke-width': 1,
                                        fill: newData.data[index].color
                                    }
                                    break;
                                case 'rect':
                                    _attributes = {
                                        x: newData[index].x + symbol[1],
                                        y: newData[index].y + symbol[2],
                                        width: symbol[3],
                                        height: symbol[4],
                                        'stroke': 'black',
                                        'stroke-width': 1,
                                        fill: newData.data[index].color
                                    };
                                    break;
                                case 'path':
                                    var d = [];
                                    d.push('M');
                                    d.push(newData[index].x + symbol[1]);
                                    d.push(newData[index].y + symbol[2]);
                                    for (var j = 3; j < symbol.length; j = j + 2) {
                                        d.push('L');
                                        d.push(newData[index].x + symbol[j]);
                                        d.push(newData[index].y + symbol[j + 1]);
                                    }
                                    d.push('z')
                                    _attributes = {
                                        d: d.join(' '),
                                        'stroke': 'black',
                                        'stroke-width': 1,
                                        fill: newData.data[index].color
                                    };
                                    break;
                                case 'polygon':
                                    var points = [];
                                    for (var j = 1; j < symbol.length; j = j + 2) {
                                        points.push((newData[index].x + symbol[j]) + ', ' + (newData[index].y + symbol[j + 1]));
                                    }
                                    _attributes = {
                                        points: points.join(' '),
                                        'stroke': 'black',
                                        'stroke-width': 1,
                                        fill: newData.data[index].color
                                    };
                            }

                            var marker = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                            marker.setAttribute('id', 'marker-' + newData.data[index].label);
                            var title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
                            title.textContent = newData.data[index].label;
                            var chartSymbol = document.createElementNS('http://www.w3.org/2000/svg', symbol[0]);
                            for (var attr in _attributes) {
                                chartSymbol.setAttribute(attr, _attributes[attr]);
                            }
                            marker.appendChild(title);
                            marker.appendChild(chartSymbol)

                            chart.append(marker);

                        }

                        // Set Titles
                        if (newVal.titles != null) {
                            var textStyles = chartSettingsService.getTextStyles();

                            var corners = ternaryPlotService.calculateSideCoordinates(vm.size, vm.padding);
                            var mainTitleCenter = {x: vm.size / 2, y: vm.padding / 2 };
                            var mainTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                            mainTitle.textContent = newVal.titles.main;
                            var _attributes = {
                                'text-anchor': 'middle',
                                x: mainTitleCenter.x,
                                y: mainTitleCenter.y,
                                'font-family': textStyles.titleFont,
                                'font-size': textStyles.titleTextSize,
                                'font-weight': textStyles.titleFontWeight,
                                fill: textStyles.titleTextColor
                            };
                            for (var attr in _attributes) {
                                mainTitle.setAttribute(attr, _attributes[attr]);
                            }
                            var subTitleCenter = {x: vm.size / 2, y: vm.padding };
                            var subTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                            subTitle.textContent = newVal.titles.subMain;
                            var _attributes = {
                                'text-anchor': 'middle',
                                x: subTitleCenter.x,
                                y: subTitleCenter.y,
                                'font-family': textStyles.subTitleFont,
                                'font-size': textStyles.subTitleTextSize,
                                'font-weight': textStyles.subTitleFontWeight,
                                fill: textStyles.subTitleTextColor
                            };
                            for (var attr in _attributes) {
                                subTitle.setAttribute(attr, _attributes[attr]);
                            }
                            var aTitleCenter = {x: corners.corner3.x, y: corners.corner3.y - (vm.padding / 5) };
                            var aTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                            aTitle.textContent = newVal.titles.a;
                            var _attributes = {
                                'text-anchor': 'middle',
                                x: aTitleCenter.x,
                                y: aTitleCenter.y,
                                'font-family': textStyles.axisFont,
                                'font-size': textStyles.axisTextSize,
                                'font-weight': textStyles.axisFontWeight,
                                fill: textStyles.axisTextColor
                            };
                            for (var attr in _attributes) {
                                aTitle.setAttribute(attr, _attributes[attr]);
                            }
                            var bTitleCenter = {x: corners.corner1.x, y: corners.corner1.y + ((2 * vm.padding) / 5) };
                            var bTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                            bTitle.textContent = newVal.titles.b;
                            var _attributes = {
                                'text-anchor': 'middle',
                                x: bTitleCenter.x,
                                y: bTitleCenter.y,
                                'font-family': textStyles.axisFont,
                                'font-size': textStyles.axisTextSize,
                                'font-weight': textStyles.axisFontWeight,
                                fill: textStyles.axisTextColor
                            };
                            for (var attr in _attributes) {
                                bTitle.setAttribute(attr, _attributes[attr]);
                            }
                            var cTitleCenter = {x: corners.corner2.x, y: corners.corner2.y + ((2 * vm.padding) / 5) };
                            var cTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                            cTitle.textContent = newVal.titles.c;
                            var _attributes = {
                                'text-anchor': 'middle',
                                x: cTitleCenter.x,
                                y: cTitleCenter.y,
                                'font-family': textStyles.axisFont,
                                'font-size': textStyles.axisTextSize,
                                'font-weight': textStyles.axisFontWeight,
                                fill: textStyles.axisTextColor
                            };
                            for (var attr in _attributes) {
                                cTitle.setAttribute(attr, _attributes[attr]);
                            }


                            chart.append(mainTitle);
                            chart.append(subTitle);
                            chart.append(aTitle);
                            chart.append(bTitle);
                            chart.append(cTitle);
                        }

                    });

                }
            });

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
                padding: '=',
                chartData: '='
            },
            link: link,
            controller: controller,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    }]);

})();
