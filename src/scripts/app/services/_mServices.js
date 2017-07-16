'use strict';
/**
 * Create services module
 */
var getModuleInstance = require('../utilities/getModuleInstance');

var mServices = getModuleInstance('mServices');

mServices.service('getData', function ($q, $window, $http) {
    return {
        getApiData: function () {

            var deferred = $q.defer();

            $http({
                url: 'http://pb-api.herokuapp.com/bars',
                dataType: 'json',
                method: 'GET'
            }).then(function (sucess) {
                deferred.resolve(sucess);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    };
});
module.exports = mServices;
