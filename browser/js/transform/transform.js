app.config(function ($stateProvider) {

    $stateProvider
      .state('transform', {
        url: '/transform',
        templateUrl: 'js/transform/transform.html',
        resolve: {
          user: function(AuthService){
            return AuthService.getLoggedInUser();
          },
          transformations: function(AuthService, $http){
            return AuthService.getLoggedInUser()
              .then(function(user){
                if(user)
                  return $http.get('/api/transformations')
                    .then(function(result){
                      return result.data;
                    });
              });
          },
          transformation: function(){
            var input = [
              {
                name: 'foo',
                active: true
              
              },
              {
                name: 'bar',
                active: false 
              },
              {
                name: 'boo'
              }
            ];
            return {
              input: JSON.stringify(input),
              transformer: 'return input.map(function(item){ return item.name; });'
            };
          }
        },
        controller: function($scope, transformation, user, transformations){
          $scope.transformations = transformations;
          $scope.user = user;
          $scope.transform = transformation;
        }
    })
    .state('customTransform', {
      url: '/transform/:id',
      templateUrl: 'js/transform/transform.html',
      resolve: {
        transformation: function($http, $stateParams){
          return $http.get('/api/transformations/' + $stateParams.id) 
            .then(function(result){
              return result.data;
            });
        },
        transformations: function(AuthService, $http){
          return AuthService.getLoggedInUser()
            .then(function(user){
              if(user)
                return $http.get('/api/transformations')
                  .then(function(result){
                    return result.data;
                  });
            });
        }
      },
      controller: function($scope, transformation, transformations){
        $scope.transform = transformation;
        $scope.transformations = transformations;
      }
  });

});
