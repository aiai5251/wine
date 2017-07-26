var app = angular.module("wine", []);
app.controller("order_coupon", function($scope, $http) {
	$scope.oid = GetQueryString("oid");
	$scope.coupon_id = GetQueryString("coupon_id");
	$scope.amount = parseFloat(GetQueryString("amount"));
	$scope.uid = getUid();
	
	if ($scope.uid.length == 0) {
		location.href = "com/go.html?url=" + location.href;
		return;
	}
	
	$http.get(getHeadUrl() + "coupon?uid=" + $scope.uid + "&status=0").success(function(response) {
		$scope.couponList = response.data;
	});
	
	mui.init();
	$scope.couponAction = function(model) {
		if (model.max_price < $scope.amount) {
			$http.get(getHeadUrl() + "order_modify?id=" + $scope.oid + "&coupon_id=" + model.id).success(function(response) {
				if (response.status == 1) {
					location.href = "order.html?id=" + $scope.oid;	
				} else {
					mui.toast("暂不能使用");
				}
			});	
		}
	}

});