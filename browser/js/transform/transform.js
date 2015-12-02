app.config(function ($stateProvider) {

    $stateProvider
      .state('transform', {
        url: '/transform',
        templateUrl: 'js/transform/transform.html',
        resolve: {
          user: function(AuthService){
            return AuthService.getLoggedInUser();
          },
          transformations: function(AuthService, $http, TransformationFactory){
            return TransformationFactory.getTransformations();
          }
        },
        controller: function($stateParams, $scope, user, transformations, $state, $location){
          if($state.current.name !== 'transform.detail')
            $state.go('transform.detail', { id: transformations[0]._id});
          $scope.transformations = transformations;
          $scope.user = user;
        }
    })
    .state('transform.detail', {
      url: '/:id',
      template: "<transformation user='user' transform='transform'></transformation>",
      resolve: {
        user: function(AuthService){
          return AuthService.getLoggedInUser();
        },
        transformation: function($http, $stateParams){
          return $http.get('/api/transformations/' + $stateParams.id) 
            .then(function(result){
              return result.data;
            });
        }
      },
      controller: function($scope, transformation, user){
        $scope.transform = transformation;
        $scope.user = user;
      }
  });

});
