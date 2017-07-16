'use strict';

var angular = require('angular'),
    ngTouch = require('angular-touch'),
    ngSanitize = require('angular-sanitize'),
    uiRouter = require('angular-ui-router'),
    mCtrls = require('./controllers/_loader'),
    mServices = require('./services/_loader');


/**
 * Register main angular app
 */
angular.module('mApp', [ngTouch, ngSanitize, uiRouter, mCtrls, mServices])
    .config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
        'ngInject';

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'tpls/views/home.html',
                controller: 'MyCtrl'
            });

        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode(true);
    });
