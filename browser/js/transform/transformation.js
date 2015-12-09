app.directive('transformation', function(){
  return {
    restrict: 'E',
    scope: {
      transform: '=',
      user: '='
    },
    templateUrl: '/js/transform/transformation.html',
    controller: function($scope, $window, $http, $state, TransformationFactory, $modal, Session){
      var _output;
      $scope.Session = Session;

      $scope.errors = function(){
        return $scope.jsonParseError || $scope.fnParseError;
      
      };
      
      $scope.postToGist = function(){
        TransformationFactory.postToGist($scope.transform)
          .then(function(result){
            $scope.gist = result.html_url;
          });
      };
      $scope.makeCopy = function(){
              TransformationFactory.copyTransformation(angular.copy($scope.transform))
                .then(function(transformation){
                  $state.go('transform.detail', { id: transformation._id});
                });
      };
      $scope.remove = function(t){
        TransformationFactory.removeTransformation($scope.transform)
          .then(function(transformation){
            $state.go('transform.empty');
          });
      };
      $scope.makeCopy = function(){
              TransformationFactory.copyTransformation(angular.copy($scope.transform))
                .then(function(transformation){
                  $state.go('transform.detail', { id: transformation._id});
                });
      };
      $scope.openCreate = function(){
        $modal.open({
          templateUrl: '/js/transform/new.html',
          scope: $scope,
          controller: function($scope, $modalInstance){
            $scope.cancel = function(){
              $modalInstance.close();
            };
            $scope.create = function(t){
              TransformationFactory.addTransformation(t)
                .then(function(transformation){
                  $state.go('transform.detail', { id: transformation._id});
                });
              $modalInstance.close();
            };
          }
        });
      };

      $scope.openEdit = function(){
        $modal.open({
          templateUrl: '/js/transform/edit.html',
          scope: $scope,
          controller: function($scope, $modalInstance){
            $scope.cancel = function(){
              $modalInstance.close();
            };
            $scope.save = function(t){
        TransformationFactory.updateTransformation($scope.transform)
          .then(function(transformation){
          });
              $modalInstance.close();
            }
          
          }
        });
      };



      $scope.updateTransformation = function(t){
      };

      $scope.aceLoaded = function(_editor){
        if(_editor.container.id === 'output')
          _output = _editor;
        _editor.$blockScrolling = Infinity;
          $( ".resizable" ).resizable({
        resize: function( event, ui ) {
          _editor.resize();
        }
      })
      };

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
          _output.setValue($window.beautify(results), 1);
          if(!$scope.transform.shared)
            TransformationFactory.updateTransformation($scope.transform)
              .then(function(transformation){
                console.log('saved');
              });
        }
        catch(ex){
          $scope.fnParseError = ex.toString();
        }
      };

    }
  };
});
