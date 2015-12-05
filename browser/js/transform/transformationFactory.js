app.factory('TransformationFactory', function(AuthService, $http, $rootScope, AUTH_EVENTS){
  var _transformations;
  $rootScope.$on(AUTH_EVENTS.logoutSuccess, function(){
    for(var i = _transformations.length -1; i >= 0; i--)
      if(!_transformations[i].shared)
        _transformations.splice(i, 1);
    });
  return {
    getTransformations: getTransformations,
    addTransformation: function(transformation){
      transformation.input = JSON.stringify(['abc', 'def']);
      transformation.transformer = 'return input';
      return $http.post('/api/transformations', transformation)
        .then(function(result){
          _transformations.push(result.data);
          return result.data;
        });
    },
    removeTransformation: function(transformation){
      return $http.delete('/api/transformations/' + transformation._id)
        .then(function(result){
          var _index;
          var items = _transformations.forEach(function(t, index){
            if(t._id == transformation._id)
              _index = index;
          });
          _transformations.splice(_index, 1);
        });
    },
    updateTransformation: function(transformation){
      return $http.put('/api/transformations/' + transformation._id, transformation)
        .then(function(result){
          var _index;
          var items = _transformations.forEach(function(t, index){
            if(t._id == transformation._id)
              _index = index;
          });
          _transformations[_index].name = transformation.name;
        });
    }
  };

  function getTransformations(){
    return AuthService.getLoggedInUser()
      .then(function(user){
        if(user)
          return $http.get('/api/transformations')
            .then(function(result){
              _transformations = result.data;
              return _transformations;
            });
        else
          return $http.get('/api/transformations/shared')
            .then(function(result){
              _transformations = result.data;
              return _transformations;
            });
      });
  }

});
