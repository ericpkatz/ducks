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
      });
  
  });

