var app = angular.module("wine", []);
app.controller("my_order", function($scope, $http) {
	$scope.uid = getUid();
	$scope.status = GetQueryString("status");
	
	if($scope.uid.length == 0) {
		location.href = "com/go.html?url=" + location.href;
		return;
	}

	if($scope.status != undefined && $scope.status.length > 0) {
		$http.get(getHeadUrl() + "my_order?uid=" + $scope.uid + "&status=" + $scope.status).success(function(response) {
			$scope.orderList = response.data;
		});
	} else {
		$http.get(getHeadUrl() + "my_order?uid=" + $scope.uid).success(function(response) {
			$scope.orderList = response.data;
		});
	}

	$scope.gotoDetail = function(model) {
		location.href = "order_detail.html?id=" + model.id;
	}

	// 支付
	$scope.payAction = function(model) {
		location.href = "order.html?id=" + model.id;
	}

	// 取消
	$scope.cancelAction = function(model) {
		if($scope.cancelClicked) {
			return;
		}
		$scope.cancelClicked = true;
		$http.get(getHeadUrl() + "order_modify?id=" + model.id + "&status=4").success(function(response) {
			model.status = 4;
		});
	}

	// 确认收货
	$scope.makeSureAction = function(model) {
		if($scope.makeSureClicked) {
			return;
		}
		$scope.makeSureClicked = true;
		$http.get(getHeadUrl() + "order_modify?id=" + model.id + "&status=3").success(function(response) {
			model.status = 3;
		});
	}
});