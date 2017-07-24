var app = angular.module("wine", []);
app.controller("my_team", function($scope, $http) {
	 $scope.uid = getUid();
	 $http.get(getHeadUrl() + "mineController/MineTeamList.do?uid=" + $scope.uid).success(function(response) {
	 	$scope.memberArray = response.
	 });
});
