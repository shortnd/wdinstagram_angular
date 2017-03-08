"use strict";


  angular
  .module("wdinstagram", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .factory("EntrieFactory", [
    "$resource",
    EntrieFactoryFunction
  ])
  .controller("EntrieIndexController", [
    "EntrieFactory",
    EntrieIndexControllerFunction
  ])


function RouterFunction($stateProvider){
  $stateProvider
  .state("entrieIndex", {
    url: "/entries",
    templateUrl: "js/ng-views/index.html",
    controller: "EntrieIndexController",
    controllerAs: "vm"
  })
  .state("entrieShow", {
    url: "/entries/:id",
    templateUrl: "js/ng-views/show.html",
    controller: "EntrieShowController",
    controllerAs: "vm"
  })
}

function EntrieFactoryFunction( $resource ){
  return $resource( "http://localhost:3000/entries/:id")
}

function EntrieIndexControllerFunction( EntrieFactory ){
  this.entries = EntrieFactory.query()
}

function EntrieShowControllerFunction( EntrieFactory, $stateParams ) {
  this.entrie = EntrieFactory.get({id: $stateParams.id})
}
