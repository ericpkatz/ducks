angular.module('app')
  .controller('FrogsListCtrl', function($scope, frogs){
    $scope.frogs = frogs;
  });
