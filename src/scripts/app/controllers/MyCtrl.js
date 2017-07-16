'use strict';
var mCtrls = require('./_mCtrls');

mCtrls.controller('MyCtrl', function ($scope, getData) {
    $scope.data = {};
    getData.getApiData().then(function (data) {
        $scope.data = data.data;
    });
    $scope.selected = '0';
    $scope.progessTheBar = function (val) {
        $scope.data.bars[$scope.selected] = $scope.data.bars[$scope.selected] + val;
        $scope.data.bars[$scope.selected] <= 0 ? ($scope.data.bars[$scope.selected] = 0) : ($scope.data.bars[$scope.selected] + val);
    };
});
