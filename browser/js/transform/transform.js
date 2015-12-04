app.config(function ($stateProvider) {
    var _transformationPromise;
    $stateProvider
      .state('transform', {
        abstract: true,
        url: '/transform',
        templateUrl: 'js/transform/transform.html',
        resolve: {
          user: function(AuthService){
            return AuthService.getLoggedInUser();
          },
          transformations: function(AuthService, $http, TransformationFactory){
            _transformationPromise = TransformationFactory.getTransformations();
            return _transformationPromise;
          }
        },
        controller: function($stateParams, $scope, user, transformations, $state, $location){
          $scope.transformations = transformations;
          $scope.user = user;
        }
    })
    .state('transform.empty', {
      url: '',
      //template: "<transformation user='user' transform='transform'></transformation>",
      resolve: {
        transformations: function($state){
          return _transformationPromise
            .then(function(transformations){
              $state.go('transform.detail', {id: transformations[0]._id});
            });
        }
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
