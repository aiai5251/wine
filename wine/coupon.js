var app = angular.module("wine", []);
app.controller("coupon", function($scope, $http) {
	 $scope.pid = GetQueryInt("pid"); 
	 $scope.uid = getUid();
	 $http.get(getHeadUrl() + "mineController/MineCouPon.do?uid=" + $scope.uid).success(function(response) {
		console.log(response);
		$scope.couponList = response.listCoupon;
	});
});