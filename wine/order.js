var app = angular.module("wine", []);
app.controller("order", function($scope, $http) {
	$scope.order_num = GetQueryString("order_num");
	$scope.uid = getUid();
	$scope.wcid = getWcid();
//	$scope.order_num = "1500876221417";
//	$scope.wcid = "as";
//	$scope.uid = 1;
	$scope.hasConsignee = false; // 是否有收货人信息
	$scope.isFinished = false; // 订单已完成状态
	$scope.pay = 0;

	$http.get(getHeadUrl() + "address_selected?uid=" + $scope.uid).success(function(response) {
		$scope.addressInfo = response.data;
		if ($scope.addressInfo != null) {
			$scope.hasConsignee = true;
		}
	});
	
	$http.get(getHeadUrl() + "order?order_num=" + $scope.order_num).success(function(response) {
		$scope.order = response.data;
		$scope.cartArray = $scope.order.orderDetails;
		$scope.pay = $scope.order.amount;
	});
	
	$scope.gotoAddress = function() {
		location.href = "addresslist.html?order_num=" + $scope.order_num;
	}
	
	mui.init({
  		gestureConfig:{
   			tap: true
   		}
	});
	
	mui('.mui-bar-tab').on('tap', 'a', function(e) {
		var targetTab = this.getAttribute('href');
		console.log(targetTab);
		if (targetTab == "#wxPay") {
			$scope.wxPay();
		}
    });
	
	$scope.wxPay = function() {
		if (!$scope.hasConsignee) {
			mui.toast("请填写收货地址信息");
			return;
		}
		
		$scope.pay = 0.1;
		location.href = getHeadUrl() + "/wechat_pay?order_num=" + $scope.order_num + "&amount=" + $scope.pay + "&wcid=" + $scope.wcid;
//		$http.get(getHeadUrl() + "order_modify?id=" + $scope.order.id + "&address_id=" + $scope.addressInfo.id + "&status=1" + "&pay=" + $scope.pay).success(function(response) {
//			location.href = getHeadUrl() + "/wechat_pay?order_no=2017071516238080&amount=0.1&wcid=" + getWcid();	
//		});
	}
});