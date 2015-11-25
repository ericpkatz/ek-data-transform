app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('transform', {
        url: '/',
        controller: 'TransformController',
        templateUrl: 'js/transform/transform.html'
    });

});

app.controller('TransformController', function ($scope) {
  $scope.aceLoaded = function(_editor){
    _editor.$blockScrolling = Infinity;
  }

  $scope.aceChanged = function(a){
    if([';','}'].indexOf(a[0].lines[0]) !== -1 || !a[1].formatted)
    {
      a[1].formatted = true;
      var js = a[1].getValue();
      var formattedJS = window.beautify(a[1].getValue()); 
      if(js !== formattedJS)
        a[1].setValue(formattedJS, 1);
    }
  
  };
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
    var input = [];
    try {
      input = JSON.parse( $scope.transform.input);
    }
    catch(ex){
      console.log(ex);
      $scope.jsonParseError = ex.toString();
    }
    try {
      var fn = new Function('input', $scope.transform.transformer);
      results = JSON.stringify(fn(input));
    }
    catch(ex){
    
    }
    $scope.output = results;
  };

  $scope.transform = transform;

});
