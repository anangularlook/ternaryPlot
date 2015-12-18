/**
 * Created by rmadere on 12/15/15.
 */
(function(){

    angular.module('myApp').
        factory('ternaryChartService', [function() {
            return {
                calculateSideCoordinates: calculateSideCoordinates
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
                corners.corner3.y = (sideLength - (2 * padding)) - b;

                return corners;

            }

            function calculatePrimaryIntervals(sideLength, padding) {
                var intervals = {};
                intervals.interval1 = {};
                intervals.interval2 = {};
                intervals.interval3 = {};
                intervals.interval4 = {};
                intervals.interval5 = {};
                intervals.interval6 = {};

                var sixtyDegrees = 60 * (Math.PI / 180);

                var triangleSide = sideLength - (2 * padding);

                intervals.interval1.startx = padding + (Math.cos(sixtyDegrees) * (triangleSide / 3));
                intervals.interval1.starty = (sideLength - padding) - (Math.sin(sixtyDegrees) * (triangleSide / 3));
                intervals.interval1.endx = (sideLength - padding) - (Math.cos(sixtyDegrees) * (triangleSide / 3));
                intervals.interval1.endy = intervals.interval1.starty;

                intervals.interval2.startx = padding + (triangleSide / 3);
                intervals.interval2.starty = sideLength - padding;
                intervals.interval2.endx = (sideLength - padding) - (Math.cos(sixtyDegrees) * ((2 * triangleSide) / 3));
                intervals.interval2.endy = (sideLength - padding) - (Math.sin(sixtyDegrees) * ((2 * triangleSide) / 3));

                intervals.interval3.startx = (2 * sideLength) / 3;
                intervals.interval3.starty = sideLength - padding;
                intervals.interval3.endx = padding + (Math.cos(sixtyDegrees) * ((2 * triangleSide) / 3));
                intervals.interval3.endx = padding + (Math.sin(sixtyDegrees) * ((2 * triangleSide) / 3));

                intervals.interval4.startx = intervals.interval1.startx;
                intervals.interval4.starty = intervals.interval1.starty;
                intervals.interval4.endx = intervals.interval2.startx;
                intervals.interval4.endy = intervals.interval2.starty;

                intervals.interval5.startx = intervals.interval3.startx;
                intervals.interval5.starty = intervals.interval3.starty;
                intervals.interval5.endx = intervals.interval1.endx;
                intervals.interval5.endy = intervals.interval1.endy;

                intervals.interval6.startx = intervals.interval3,endx;
                intervals.interval6.starty = intervals.interval3.endy;
                intervals.interval6.endx = intervals.interval2.endx;
                intervals.interval6.endy = intervals.interval2.endy;

                return intervals;
            }

        }])

}).()
