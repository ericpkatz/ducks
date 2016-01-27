angular.module('app', ['ui.router', 'toastr']);

angular.module('app')
  .config(function($stateProvider){
    $stateProvider
      .state('home', {
        templateUrl: '/client/app/home/home.html',
        url: '/'
      })
      .state('frogs', {
        templateUrl: '/client/app/frogs/list/list.html',
        url: '/frogs',
        resolve : {
          frogs : function($http, toastr){
            return $http.get('/api/frogs')
                    .then(function(result){
                      return result.data;
                    }, function(error){
                      toastr.error(error);
                    
                    });
          }
        },
        controller : 'FrogsListCtrl'
      })
      .state('frog', {
        templateUrl: '/client/app/frogs/detail/detail.html',
        url: '/frog/:id',
        resolve : {
          frog : function($http, $stateParams, toastr){
            return $http.get('/api/frogs/' + $stateParams.id)
                    .then(function(result){
                      return result.data;
                    }, function(error){
                      toastr.error(error);
                    
                    });
          }
        },
        controller : 'FrogDetailCtrl'
      })
      .state('frogEdit', {
        templateUrl: '/client/app/frogs/edit/edit.html',
        url: '/frog/edit/:id',
        resolve : {
          frog : function($http, $stateParams, toastr){
            return $http.get('/api/frogs/' + $stateParams.id)
                    .then(function(result){
                      return result.data;
                    }, function(error){
                      toastr.error(error);
                    
                    });
          }
        },
        controller : 'FrogEditCtrl'
      });
  
  });

