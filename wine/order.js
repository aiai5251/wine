var app = angular.module("wine", []);
app.controller("order", function($scope, $http) {
	$scope.oid = GetQueryString("id");
	$scope.uid = getUid();
	$scope.wcid = getWcid();
	
	if ($scope.uid.length == 0) {
		location.href = "com/go.html?url=" + location.href;
		return;
	}
	
	$scope.hasConsignee = false; // 是否有收货人信息
	$scope.isFinished = false; // 订单已完成状态
	$scope.pay = 0;

	$http.get(getHeadUrl() + "address_selected?uid=" + $scope.uid).success(function(response) {
		$scope.addressInfo = response.data;
		if ($scope.addressInfo != null) {
			$scope.hasConsignee = true;
		}
	});
	
	$http.get(getHeadUrl() + "order?id=" + $scope.oid).success(function(response) {
		$scope.order = response.data;
		$scope.cartArray = $scope.order.orderDetails;
		$scope.pay = $scope.order.amount;
		if ($scope.order.coupon_id > 0) {
			$scope.pay = $scope.pay - $scope.order.couponInfo.price;
		}
	});
	
	$scope.gotoAddress = function() {
		location.href = "addresslist.html?oid=" + $scope.oid;
	}
	
	$scope.chooseCoupon = function() {
		location.href = "order_coupon.html?oid=" + $scope.order.id + "&coupon_id=" + $scope.order.coupon_id + "&amount=" + $scope.order.amount;
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
		
		$scope.pay = 0.1 * 100;
		location.href = getHeadUrl() + "/wechat_pay?order_num=" + $scope.order.order_num + "&amount=" + $scope.pay + "&wcid=" + $scope.wcid;
//		$http.get(getHeadUrl() + "order_modify?id=" + $scope.order.id + "&address_id=" + $scope.addressInfo.id + "&status=1" + "&pay=" + $scope.pay).success(function(response) {
//			location.href = getHeadUrl() + "/wechat_pay?order_no=2017071516238080&amount=0.1&wcid=" + getWcid();	
//		});
	}
});