var app = angular.module("wine", []);
app.controller("my_team", function($scope, $http) {
	 $scope.uid = getUid();
	 if($scope.uid.length == 0) {
		location.href = "com/go.html?url=" + location.href;
		return;
	}
	 
	 $http.get(getHeadUrl() + "team?fid=" + $scope.uid).success(function(response) {
	 	$scope.memberArray = response.data;
	 });
});
