var app = angular.module("wine", []);
app.controller("my_award", function($scope, $http) {
	$scope.uid = getUid();
	 $http.get(getHeadUrl() + "mineController/MineRewardList.do?uid=" + $scope.uid).success(function(response) {
	 	console.log(response);
	 	$scope.listReward = response.listReward;
	 });
});
