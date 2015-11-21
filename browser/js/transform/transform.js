app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('transform', {
        url: '/transform',
        controller: 'TransformController',
        templateUrl: 'js/transform/transform.html'
    });

});

app.controller('TransformController', function ($scope) {
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
      name: 'bazz',
    }
  ];
  var transform = {
    input: JSON.stringify(input),
    transformer: 'return input.map(function(item){ return item.name; });',
  };
  
  $scope.$watch('transform.input', function(val){
    calculateOutput();
  });

  $scope.$watch('transform.transformer', function(val){
    calculateOutput();
  });

  var calculateOutput = function(){
    var results = '';
    try {
      var fn = new Function('input', $scope.transform.transformer);
      results = fn(JSON.parse( $scope.transform.input));
    }
    catch(ex){
    
    }
    $scope.output = results;
  };

  $scope.transform = transform;

});
