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
  .controller("EntrieNewController", [
    "EntrieFactory",
    "$state",
    EntrieNewControllerFunction
  ])
  .controller("EntrieShowController", [
    "EntrieFactory",
    "$stateParams",
    EntrieShowControllerFunction
  ])
  .controller("EntrieEditController", [
    "EntrieFactory",
    "$stateParams",
    "$state",
    EntrieEditControllerFunction
  ])


function RouterFunction($stateProvider){
  $stateProvider
  .state("entrieIndex", {
    url: "/entries",
    templateUrl: "js/ng-views/index.html",
    controller: "EntrieIndexController",
    controllerAs: "vm"
  })
  .state("entrieNew", {
    url: "/entries/new",
    templateUrl: "js/ng-views/new.html",
    controller: "EntrieNewController",
    controllerAs: "vm"
  })
  .state("entrieShow", {
    url: "/entries/:id",
    templateUrl: "js/ng-views/show.html",
    controller: "EntrieShowController",
    controllerAs: "vm"
  })
  .state("entrieEdit", {
    url: "/entries/:id/edit",
    templateUrl: "js/ng-views/edit.html",
    controller: "EntrieEditController",
    controllerAs: "vm"
  })
}

function EntrieFactoryFunction( $resource ){
  return $resource( "http://localhost:3000/entries/:id", {},{
      update: { method: "PUT" }
  })
}

function EntrieIndexControllerFunction( EntrieFactory ){
  this.entries = EntrieFactory.query()
}

function EntrieNewControllerFunction( EntrieFactory, $state ){
  this.entrie = new EntrieFactory()
  this.create = function (){
    this.entrie.$save(function(entrie){
      $state.go("entrieShow", {id: entrie.id})
    })
  }
}

function EntrieShowControllerFunction( EntrieFactory, $stateParams ) {
  this.entrie = EntrieFactory.get({id: $stateParams.id})
}

function EntrieEditControllerFunction( EntrieFactory, $stateParams, $state ){
  this.entrie = EntrieFactory.get({id: $stateParams.id})
  this.update = function(){
    this.entrie.$update({id: $stateParams.id}, function(entrie){
      $state.go("entrieShow", {id: entrie.id})
    })
  }
}
