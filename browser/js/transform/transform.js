app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('transform', {
        url: '/',
        controller: 'TransformController',
        templateUrl: 'js/transform/transform.html'
    });

});

app.controller('TransformController', function ($scope, $window) {
  $scope.aceLoaded = function(_editor){
    _editor.$blockScrolling = Infinity;
      $( ".resizable" ).resizable({
    resize: function( event, ui ) {
      _editor.resize();
    }
  });
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
    $scope.jsonParseError = null;
    $scope.fnParseError = null;
    var results = '';
    var input = [];
    try {
      var lint = $window.jsonLint($scope.transform.input);
      if(lint.error)
        throw lint;
      input = JSON.parse( $scope.transform.input);
    }
    catch(ex){
      console.log(ex);
      $scope.jsonParseError = lint.error + '|' + lint.line;
    }
    try {
      var fn = new Function('input', $scope.transform.transformer);
      results = JSON.stringify(fn(input));
    }
    catch(ex){
      $scope.fnParseError = ex.toString();
    }
    $scope.output = results;
  };

  $scope.transform = transform;

});
