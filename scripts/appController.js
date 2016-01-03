/**
 * Created by rmadere on 12/23/15.
 */
(function(){

    angular.module('myApp').controller('mainController', ['chartSettingsService', function (chartSettingsService) {
            var self = this;

            self.data = [];

            self.data.push({a: 81, b: 63, c: 6, color: 'green', symbol: 'triangle', label: '83-24' });
        self.data.push({a: 72, b: 73, c: 4, color: 'cyan', symbol: 'hexagon', label: '83-26'});
            self.data.push({a: 45, b: 96, c: 9, color: 'blue', symbol: 'square', label: '83-27' });
            self.data.push({a: 45, b: 76, c: 29, color: 'orange', symbol: 'diamond', label: '83-33' });
            self.data.push({a: 53, b: 76, c: 21, color: 'orange', symbol: 'diamond', label: '83-34' });
            self.data.push({a: 72, b: 76, c: 2, color: 'green', symbol: 'triangle', label: '83-1' });
            self.data.push({a: 42, b: 101, c: 7, color: 'red', symbol: 'circle', label: '83-4' });
            self.data.push({a: 54, b: 81, c: 15, color: 'orange', symbol: 'diamond', label: '83-8' });
            self.data.push({a: 42, b: 96, c: 12, color: 'orange', symbol: 'diamond', label: '83-9' });
            self.data.push({a: 56, b: 70, c: 24, color: 'orange', symbol: 'diamond', label: '83-10' });
        self.data.push({a: 65, b: 75, c: 10, color: 'yellow', symbol: 'hexagon', label: '83-17'});
            self.data.push({a: 51, b: 90, c: 9, color: 'blue', symbol: 'square', label: '83-23' });
            self.data.push({a: 52, b: 93, c: 5, color: 'blue', symbol: 'square', label: '83-20' });
        self.data.push({a: 42, b: 101, c: 17, color: 'black', symbol: 'hexagon', label: '83-21'});
            self.data.push({a: 50, b: 88, c: 12, color: 'orange', symbol: 'diamond', label: '83-22' });
            self.data.push({a: 76, b: 72, c: 2, color: 'green', symbol: 'triangle', label: '83-37' });
            self.data.push({a: 72, b: 72, c: 6, color: 'green', symbol: 'triangle', label: '83-40' });
            self.data.push({a: 66, b: 35, c: 0, color: 'magenta', symbol: 'circle', label: 'control' });

            self.data.titles = {main: 'Petrographic Data', subMain: 'Swauk Formation Sandstone', a: 'Quartz', b: 'Feldspar', c: 'Lithic'};

        var newSettings = {};
        newSettings.textStyles = {};
        newSettings.textStyles.axisFont = 'Arial Black, Arial Bold, Gadget, sans-serif';
        newSettings.symbols = {};
        newSettings.symbols.hexagon = ['polygon', -5, 0, -2.17, -4.33, 2.17, -4.33, 5, 0, 2.17, 4.33, -2.17, 4.33];

        chartSettingsService.setChartSettings(newSettings);

        }])


})();