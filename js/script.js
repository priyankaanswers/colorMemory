var app = angular.module('colorapp',["firebase"]);

app.controller('colorCtrl',function($scope,$window,$timeout,$firebaseArray){
 var ref = firebase.database().ref();
  $scope.users = $firebaseArray(ref);
  $scope.users.$loaded(
  function(x) {
  
  
    }, function(error) {
    console.error("Error:", error);
  });	
	$scope.selected = 0;
	$scope.curr1=null;
	$scope.curr2=null ;
	$scope.score=0;
	$scope.count=0;
	$scope.hide=true;

	$scope.over=true;
	$scope.rankdiv=false
	
$scope.replay=function(){

$scope.cards=[];
$scope.cards=$scope.shufflearray($scope.uscards);
for(var i = 0; i<$scope.cards.length; i++)
{
   $scope.cards[i].complete = false;
}
$scope.selected = 0;
	$scope.curr1=null;
	$scope.curr2=null ;
	$scope.score=0;
	$scope.count=0;
	$scope.over=true;
	$scope.rankdiv=false
$scope.hide=true;
};

	$scope.uscards=[{id:1,color:'c1',url:'images/color1.gif'},{id:2,color:'c2',url:'images/color2.gif'},{id:3,color:'c3',url:'images/color3.gif'},
{id:4,color:'c4',url:'images/color4.gif'},
{id:5,color:'c5',url:'images/color5.gif'},
{id:6,color:'c6',url:'images/color6.gif'},
{id:7,color:'c7',url:'images/color7.gif'},
{id:8,color:'c8',url:'images/color8.gif'},
{id:9,color:'c1',url:'images/color1.gif'},
{id:10,color:'c2',url:'images/color2.gif'},
{id:11,color:'c3',url:'images/color3.gif'},
{id:12,color:'c4',url:'images/color4.gif'},
{id:13,color:'c5',url:'images/color5.gif'},
{id:14,color:'c6',url:'images/color6.gif'},
{id:15,color:'c7',url:'images/color7.gif'},
{id:16,color:'c8',url:'images/color8.gif'}]; 
$scope.shufflearray = function(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
$scope.save=function(){

	
$scope.users.$add({ name:$scope.username,email:$scope.email,score:$scope.score }).then(function(ref) {
  
  var sorte=$scope.users.sort(function(a, b){
    return b.score - a.score;
  });

   angular.forEach($scope.users, function(value, key) {
  
   if(value.email==$scope.email)
   {
   	$scope.rank=key + 1;
   	$scope.over=false;
	$scope.rankdiv=true;
   }

  });
 
});

}
$scope.cards=$scope.shufflearray($scope.uscards);


	
	$scope.match=function(){
		$timeout(function(){
			var cmp1=$scope.cards[$scope.curr1].color;
			var cmp2=$scope.cards[$scope.curr2].color;
			console.log(cmp1,cmp2);
			console.log($scope.cards[$scope.curr1],$scope.cards[$scope.curr2]);
			console.log($scope.curr1,$scope.curr2);
			if(cmp1==cmp2) 
            {
            	$scope.count++;
            $scope.score++;
            $scope.cards[$scope.curr1].complete=true;
			$scope.cards[$scope.curr2].complete=true;
			$scope.curr1=-1;
            $scope.curr2=-1;
            console.log("MATCH");
            if($scope.count==8)
            {
            	console.log("GAME COMPLETED");
            	$scope.hide=false;
            	

            }
          }
          else
          {
            $scope.score--;
            $scope.curr1=-1;
            $scope.curr2=-1;
            console.log("UN MATCH");
              
          }
		},500);
	};
	$scope.$watch('selectedRow', function() {
		console.log('Do Some processing');
	});
});

app.directive('arrowSelector',['$document',function($document){
	return{
		restrict:'A',
		link:function(scope,elem,attrs,ctrl){
			var elemFocus = false;             
			elem.on('mouseenter',function(){
				elemFocus = true;
				
				scope.selectedRow=0;
				scope.$apply();
			});
			elem.on('mouseleave',function(){
				elemFocus = false;
				
			});
			$document.bind('keydown',function(e){
				if(elemFocus){
					if(e.keyCode==37)
    {
      if(scope.selected >0)
      {
        scope.selected=scope.selected-1;
         scope.$apply();
      
      }
    }
    else if(e.keyCode==38)
    {
      if(scope.selected > 3)
      {
        
        scope.selected=scope.selected - 4;
        scope.$apply();
        

      }
    }
    else if(e.keyCode==39)
    {

      if(scope.selected <15)
      {
        
        scope.selected=scope.selected + 1;
        scope.$apply();
      }
    }
    else if(e.keyCode==40)
    {

    if(scope.selected < 12)
      {
        
        scope.selected=scope.selected + 4;
         scope.$apply();
        
      }
    }
    else if(e.keyCode==13)
    {
        if(scope.curr1 < 0 || scope.curr1==null)
        {
        	scope.curr1=scope.selected;
        	scope.$apply();
        }	
        else{
        	scope.curr2=scope.selected;
        	
        	scope.$apply();
        	
        	scope.match();
        	
        }
        
    }

				}
			});
		}
	};
}]);