var app = angular.module("wine", []);
app.controller("coupon", function($scope, $http) {
	$scope.pid = GetQueryInt("id");
	$scope.uid = getUid();
	if ($scope.uid.length == 0) {
		location.href = "com/go.html?url=" + location.href;
		return;
	}
	
	$http.get(getHeadUrl() + "coupon?pid=" + $scope.pid + "&uid=" + $scope.uid).success(function(response) {
		$scope.couponList = response.data;
	});
	
	mui.init();
	$scope.couponAction = function(model) {
		$http.get(getHeadUrl() + "my_coupon_add?uid=" + $scope.uid + "&id=" + model.id).success(function(response) {
			if (response.status == 1) {
				model.uid = $scope.uid;
				mui.toast("领取成功");	
			} else {
				mui.toast("已经领取过咯");
			}
		});
	}

});