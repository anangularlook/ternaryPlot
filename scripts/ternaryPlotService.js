/**
 * Created by rmadere on 12/15/15.
 */
(function(){

    angular.module('myApp').
        factory('ternaryPlotService', ['SIXTY_DEGREES', function(SIXTY_DEGREES) {
            return {
                calculateSideCoordinates: calculateSideCoordinates,
                calculatePrimaryIntervals: calculatePrimaryIntervals,
                calculateTicMarks: calculateTicMarks,
                calculateTenthLines: calculateTenthLines,
                convertToCartesian: convertToCartesian
            };

            function calculateSideCoordinates(sideLength, padding) {
                var corners = {};
                corners.corner1 = {};
                corners.corner2 = {};
                corners.corner3 = {};

                corners.corner1.x = padding;
                corners.corner1.y = sideLength - padding;
                corners.corner2.x = sideLength - padding;
                corners.corner2.y = corners.corner1.y;

                var a2 = Math.pow(((sideLength - (padding * 2)) / 2), 2);
                var c2 = Math.pow((sideLength - (padding * 2)), 2);
                var b = Math.sqrt((c2 - a2));

                corners.corner3.x = sideLength / 2;
                corners.corner3.y = (sideLength - padding) - b;

                return corners;

            }

            function calculatePrimaryIntervals(sideLength, padding) {
                var intervals = [];
                var interval = {};

                var triangleSide = sideLength - (2 * padding);

                var startx = padding + (Math.cos(SIXTY_DEGREES) * (triangleSide / 3));
                var starty = (sideLength - padding) - (Math.sin(SIXTY_DEGREES) * (triangleSide / 3));
                var endx = (sideLength - padding) - (Math.cos(SIXTY_DEGREES) * (triangleSide / 3));
                var endy = starty;
                intervals.push({endx: endx, endy: endy, startx: startx, starty: starty});

                startx = padding + (triangleSide / 3);
                starty = sideLength - padding;
                endx = (sideLength - padding) - (Math.cos(SIXTY_DEGREES) * ((2 * triangleSide) / 3));
                endy = (sideLength - padding) - (Math.sin(SIXTY_DEGREES) * ((2 * triangleSide) / 3));
                intervals.push({endx: endx, endy: endy, startx: startx, starty: starty});

                startx = padding + (2 * triangleSide) / 3;
                starty = sideLength - padding;
                endx = padding + (Math.cos(SIXTY_DEGREES) * ((2 * triangleSide) / 3));
                endy = (sideLength - padding) - (Math.sin(SIXTY_DEGREES) * ((2 * triangleSide) / 3));
                intervals.push({endx: endx, endy: endy, startx: startx, starty: starty});

                startx = intervals[0].startx;
                starty = intervals[0].starty;
                endx = intervals[1].startx;
                endy = intervals[1].starty;
                intervals.push({endx: endx, endy: endy, startx: startx, starty: starty});

                startx = intervals[2].startx;
                starty = intervals[2].starty;
                endx = intervals[0].endx;
                endy = intervals[0].endy;
                intervals.push({endx: endx, endy: endy, startx: startx, starty: starty});

                startx = intervals[2].endx;
                starty = intervals[2].endy;
                endx = intervals[1].endx;
                endy = intervals[1].endy;
                intervals.push({endx: endx, endy: endy, startx: startx, starty: starty});

                return intervals;
            }

            function calculateTenthsEndPoints(sideLength, padding) {
                var endPoints = [];

                // A - B line
                var startingX = sideLength / 2;
                var triangleSide = sideLength - (2 * padding);
                var a2 = Math.pow(((sideLength - (padding * 2)) / 2), 2);
                var c2 = Math.pow((sideLength - (padding * 2)), 2);
                var b = Math.sqrt((c2 - a2));
                var startingY = (sideLength - padding) - b;
                var xInterval = triangleSide / 20;
                var yInterval = (triangleSide / 10) * Math.sin(SIXTY_DEGREES);

                for (var i = 1; i < 10; i++){
                    var x = startingX - (i * xInterval);
                    var y = startingY + (i * yInterval);
                    endPoints.push({x: x, y: y});
                }

                // B - C Line
                for (var i = 1; i < 10; i++) {
                    var x = padding + (2 * i * xInterval);
                    var y = sideLength - padding;
                    endPoints.push({x: x, y: y});
                }

                // C - A Line
                for (var i = 9; i > 0; i--) {
                    var x = startingX + ( i * xInterval);
                    var y = startingY + (i * yInterval);
                    endPoints.push({x: x, y: y});
                }

                return endPoints;
            }

            function calculateTicMarks(sideLength, padding){
                var ticMarkPaths = [];

                var ticLength = (sideLength - (2 * padding)) / 50;
                var endPoints = calculateTenthsEndPoints(sideLength, padding);

                if (endPoints.length != 27) return;

                for (var i = 0; i < 9; i++){
                    var x1 = endPoints[i].x + ticLength;
                    var y1 = endPoints[i].y;
                    var x2 = endPoints[i].x + (ticLength / 2);
                    var y2 = endPoints[i].y + (ticLength * Math.sin(SIXTY_DEGREES));
                    ticMarkPaths.push({x1: x1, y1: y1, x2: endPoints[i].x, y2: endPoints[i].y, x3: x2, y3: y2});
                }

                for (var i = 9; i < 18; i++) {
                    var x1 = endPoints[i].x - (ticLength / 2);
                    var y1 = endPoints[i].y - (ticLength * Math.sin(SIXTY_DEGREES));
                    var x2 = endPoints[i].x + (ticLength / 2);
                    var y2 = y1;
                    ticMarkPaths.push({x1: x1, y1: y1, x2: endPoints[i].x, y2: endPoints[i].y, x3: x2, y3: y2});
                }

                for (var i = 18; i < 27; i++){
                    var x1 = endPoints[i].x - ticLength;
                    var y1 = endPoints[i].y;
                    var x2 = endPoints[i].x - (ticLength / 2);
                    var y2 = endPoints[i].y + (ticLength * Math.sin(SIXTY_DEGREES));
                    ticMarkPaths.push({x1: x1, y1: y1, x2: endPoints[i].x, y2: endPoints[i].y, x3: x2, y3: y2});
                }

                return ticMarkPaths;
            }

            function calculateTenthLines(sideLength, padding){
                var tenthLines = [];

                var endPoints = calculateTenthsEndPoints(sideLength, padding);

                for (var i = 0, j = 8; i < 9; i++, j--){
                    // AB to BC
                    tenthLines.push({x1: endPoints[i].x, y1: endPoints[i].y, x2: endPoints[9 + j].x, y2: endPoints[9 + j].y});

                    // BC to CA
                    tenthLines.push({x1: endPoints[9 + i].x, y1: endPoints[9 + i].y, x2: endPoints[18 + j].x, y2: endPoints[18 + j].y});

                    // CA TO AB
                    tenthLines.push({x1: endPoints[i].x, y1: endPoints[i].y, x2: endPoints[18 + j].x, y2: endPoints[18 + j].y});
                }

                return tenthLines;
            }

            function convertToCartesian(data, sideLength, padding) {
                var returnData = [];
                returnData.data = data;
                var SIXTY_DEGREES = 60 * (Math.PI / 180);

                for (var index = 0; index < data.length; index++) {
                    var coordinateTotal = data[index].a + data[index].b + data[index].c;
                    var triangleSide = sideLength - (2 * padding);
                    var x = (sideLength - padding) - (triangleSide * ((data[index].a / coordinateTotal) + ((data[index].b / coordinateTotal) * Math.cos(SIXTY_DEGREES))));
                    var y = (sideLength - padding) - (triangleSide * ((data[index].b / coordinateTotal) * Math.sin(SIXTY_DEGREES)));

                    returnData.push({x: x, y: y});
                }

                return returnData;
            }

        }])

})();
