/* globals inject */

'use strict';

var angular = require('angular'),
    mCtrls = require('../../src/scripts/app/controllers/_loader'),
    loader = require('../../src/scripts/utilities/loader'),
    mServices = require('../../src/scripts/app/services/_loader');

describe('Controllers', function () {

    loader.createSpyLoader('main', 'spy loader data');

    describe('MyCtrl', function () {
        var $scope, $q, getDataService,$httpBackend,deferred;
        
        beforeEach(angular.mock.module(mCtrls));
        beforeEach(angular.mock.module(mServices));
       

        beforeEach(inject(function ($rootScope, $controller, _$q_, getData, _$httpBackend_) {
            console.log("123:", mServices, getData);
            $scope = $rootScope.$new();
            $q = _$q_;
            getDataService = getData;
            $httpBackend = _$httpBackend_;
            deferred = $q.defer()
            deferred.resolve('resolveData');
            getDataService.getApiData = function() {
               
                return {
                    "buttons":[18,39,-18,-19],
                    "bars":[45,40,52,64],
                    "limit":140
                }
            }
            spyOn(getDataService, 'getApiData');
            $controller('MyCtrl', { $scope: $scope , getData: getDataService});
            $scope.$apply();
        }));

        it('Placeholder', function () {
            expect($scope.test).toBe('test');
        });
        it('should get data from api', inject(function($http,$scope) {
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

        // it("progessTheBar", function(){
        //     $scope.progessTheBar(3);
        // });

    });
});
