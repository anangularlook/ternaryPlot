/**
 * Created by rmadere on 12/30/15.
 */
(function () {

    angular.module('myApp').factory('chartSettingsService', [function () {
        var chartSettings = {};
        // Create the basic symbol shapes
        chartSettings.symbols = {};
        chartSettings.symbols.circle = ['circle', 0, 0, 5];
        chartSettings.symbols.square = ['rect', -5, -5, 10, 10];
        chartSettings.symbols.diamond = ['path', 0, -5, -5, 0, 0, 5, 5, 0];
        chartSettings.symbols.triangle = ['path', -5, 5, 5, 5, 0, -3];
        chartSettings.symbols.star = ['path', 0, -5, -1, -1, -5, -1, -2, 0, -3, 5, 3, 5, 2, 0, 5, -1, 1, -1];
        chartSettings.symbols.pentagon = ['path', 0, -5, -5, -2, -3, 4, 3, 4, 5, -2];
        // Set the text styles
        chartSettings.textStyles = {};
        chartSettings.textStyles.axisFont = 'Verdana, Geneva, san-serif';
        chartSettings.textStyles.titleFont = '"Times New Roman", Times, serif';
        chartSettings.textStyles.subTitleFont = '"Times New Roman", Times, serif';
        chartSettings.textStyles.axisFontWeight = 'normal';
        chartSettings.textStyles.titleFontWeight = 'bold';
        chartSettings.textStyles.subTitleFontWeight = 'bold';
        chartSettings.textStyles.axisTextSize = 9;
        chartSettings.textStyles.titleTextSize = 24;
        chartSettings.textStyles.subTitleTextSize = 14;
        chartSettings.textStyles.axisTextColor = 'black';
        chartSettings.textStyles.titleTextColor = 'black';
        chartSettings.textStyles.subTitleTextColor = 'black';
        // Set the chart styles
        chartSettings.chartField = {};
        chartSettings.chartField.backgroundColor = 'Bisque';
        chartSettings.chartField.chartOutlineColor = 'black';
        chartSettings.chartField.outlineChart = true;
        chartSettings.chartField.chartOutlineWeight = 2;
        chartSettings.chartField.showTicMarks = true;
        //chartSettings.chartField.ticMarkDirection = 'inside'; // Not currently used
        chartSettings.chartField.ticMarkColor = 'black';
        chartSettings.chartField.ticMarkWeight = 1;
        chartSettings.chartField.showPrimaryIntervals = true;
        chartSettings.chartField.primaryIntervalColor = 'SaddleBrown';
        chartSettings.chartField.showSecondaryIntervals = true;
        chartSettings.chartField.secondaryIntervalColor = 'black';

        function getChartSettings() {
            return chartSettings;
        }

        function getSymbols() {
            return chartSettings.symbols;
        }

        function getTextStyles() {
            return chartSettings.textStyles;
        }

        function getChartStyles() {
            return chartSettings.chartField;
        }

        function setChartSettings(newSettings) {
            angular.merge(chartSettings, newSettings);
        }

        return {
            getChartSettings: getChartSettings,
            getSymbols: getSymbols,
            getTextStyles: getTextStyles,
            getChartStyles: getChartStyles,
            setChartSettings: setChartSettings
        }
    }])
})();
