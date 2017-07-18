/* globals inject */
'use strict';
var angular = require('angular'),
    mCtrls = require('../../src/scripts/app/controllers/_loader'),
    mServices = require('../../src/scripts/app/services/_loader'),
    loader = require('../../src/scripts/utilities/loader');

describe('Controllers', function() {
    loader.createSpyLoader('main', 'spy loader data');
    describe('MyCtrl', function() {
        var $scope;
        beforeEach(angular.mock.module(mCtrls));
        beforeEach(inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();
            $controller('MyCtrl', {
                $scope: $scope,
                getData:mServices.getData
            });
            $scope.$apply();

        }));
            
        it('should get data from api', inject(function($http,$scope,getData) {
            var $scope = {};
            /* Code Under Test */
            $http.get('http://pb-api.herokuapp.com/bars').success(function(data, status, headers, config) {
                $scope.valid = true;
                $scope.response = data;
            }).error(function(data, status, headers, config) {
                $scope.valid = false;
            });
            /* End */
            $httpBackend.when('GET', 'http://pb-api.herokuapp.com/bars').respond(200, {
                buttons: [35, 22, -24, -9],
                bars: [66,23],
                limit: 130
            });
            $httpBackend.flush();
            expect($scope.valid).toBe(true);
            expect($scope.response).toEqual({
                buttons: [35, 22, -24, -9],
                bars: [66,23],
                limit: 130
            });
        }));
    });
});