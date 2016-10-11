var app = angular.module('test', []);

app.controller('testCtrl',function ($scope) {
  
  $scope.records = [];
  for (var i = 1; i <= 9; i++) {
    $scope.records.push({ id: i, navIndex: i, name: 'record ' + i});
  }
  
  $scope.focusIndex = 3;
  
  $scope.open = function ( index ) {
    var record;
    for ( var i = 0; i < $scope.records.length; i++ ) {
      if ( $scope.records[ i ].navIndex !== index ) { continue; }
      record = $scope.records[ i ];
    }
    console.log('opening : ', record );
  };
  
  $scope.keys = [];
  $scope.keys.push({ code: 13, action: function() { $scope.open( $scope.focusIndex ); }});
  $scope.keys.push({ code: 38, action: function() { $scope.focusIndex--; }});
  $scope.keys.push({ code: 40, action: function() { $scope.focusIndex++; }});
  
  $scope.$on('keydown', function( msg, code ) {
    $scope.keys.forEach(function(o) {
      if ( o.code !== code ) { return; }
      o.action();
      $scope.$apply();
    });
  });
  
});


app.directive('keyTrap', function() {
  return function( scope, elem ) {
    elem.bind('keydown', function( event ) {
      scope.$broadcast('keydown', event.keyCode );
    });
  };
});