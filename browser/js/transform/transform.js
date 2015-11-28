app.config(function ($stateProvider) {

    $stateProvider
      .state('transform', {
        url: '/transform',
        templateUrl: 'js/transform/transform.html',
        resolve: {
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
        controller: function($scope, transformation){
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
        }
      },
      controller: function($scope, transformation){
        $scope.transform = transformation;
      }
  });

});
