'use strict';
var mCtrls = require('./_mCtrls');

mCtrls.controller('MyCtrl', function ($scope, getData) {
    $scope.data = {};
    $scope.data.percentage = [];

    function calcBarPercentage(val, limit) {
        return Math.round((val / limit) * 100, 2);
    }
    getData.getApiData().then(function (data) {
        $scope.data = data.data;
        for (var i = 0; i < $scope.data.bars.length; i++) {
            $scope.data.percentage[i] = calcBarPercentage($scope.data.bars[i], $scope.data.limit);
        }
    });
    $scope.selected = '0';
    $scope.progessTheBar = function (val) {
        $scope.data.percentage[$scope.selected] = $scope.data.percentage[$scope.selected] + calcBarPercentage(val, $scope.data.limit);
        $scope.data.percentage[$scope.selected] <= 0 ? ($scope.data.percentage[$scope.selected] = 0) : ($scope.data.percentage[$scope.selected] + calcBarPercentage(val, $scope.data.limit));
    };
});
