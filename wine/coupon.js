var app = angular.module("wine", []);
app.controller("coupon", function($scope, $http) {
	$scope.pid = GetQueryInt("pid");
	$scope.uid = getUid();
	$scope.status = GetQueryInt("status");
	if ($scope.uid.length == 0) {
		location.href = "com/go.html?url=" + location.href;
		return;
	}
	
	if ($scope.status == 1) { //来自店铺优惠券
		$scope.isProductCoupon = true;
		$http.get(getHeadUrl() + "coupon?pid=" + $scope.pid).success(function(response) {
			$scope.couponList = response.data;
		});
	} else if ($scope.status == 2) {
		$scope.isProductCoupon = false;
		$http.get(getHeadUrl() + "coupon?uid=" + $scope.uid).success(function(response) {
			$scope.couponList = response.data;
		});
	}
	
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