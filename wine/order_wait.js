var app = angular.module("wine", []);
app.controller("order_wait", function($scope, $http) {
	 $scope.uid = getUid();
	 $http.get(getHeadUrl() + "mineController/MinePayInfo.do?uid=" + $scope.uid + "&type=" + 1).success(function(response) {
		$scope.listPay = response.listPay;	 	
	 });
});
