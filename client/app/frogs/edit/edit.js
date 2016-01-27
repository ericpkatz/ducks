angular.module('app')
  .controller('FrogEditCtrl', function($scope, $http, frog, $state){
    $scope.frog = frog;

    $scope.save = function(){
      $http.put('/api/frogs/' + $scope.frog.id, $scope.frog)
        .then(function(frog){
          $state.go('frog', {id: $scope.frog.id});
        });
    }
  });
