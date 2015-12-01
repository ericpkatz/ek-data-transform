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
                else
                  return $http.get('/api/transformations/shared')
                    .then(function(result){
                      return result.data;
                    });
              });
          }
        },
        controller: function($scope, user, transformations){
          console.log(transformations);
          $scope.transformations = transformations;
          $scope.user = user;
        }
    })
    .state('transform.detail', {
      url: '/:id',
      template: "<transformation transform='transform'></transformation>",
      resolve: {
        transformation: function($http, $stateParams){
          return $http.get('/api/transformations/' + $stateParams.id) 
            .then(function(result){
              return result.data;
            });
        }
      },
      controller: function($scope, transformation){
        $scope.transform = transformation;
      }
  });

});
