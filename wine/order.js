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
	$scope.pointSelected = false; // 积分选择
//	$scope.awardSelected = false; //	余额选择
	$scope.pay = 0.00;

	$http.get(getHeadUrl() + "user?id=" + $scope.uid).success(function(response) {
		$scope.user = response.data;
	});

	$http.get(getHeadUrl() + "address_selected?uid=" + $scope.uid).success(function(response) {
		$scope.addressInfo = response.data;
		if ($scope.addressInfo != null) {
			$scope.hasConsignee = true;
		}
	});
	
	$http.get(getHeadUrl() + "order?id=" + $scope.oid).success(function(response) {
		$scope.order = response.data;
		if ($scope.order.status > 0) {
			$scope.isFinished = true;
		}
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
	
	$scope.selectedPoint = function() {
		if ($scope.pointSelected) {
			$scope.pointSelected = false;
			$scope.pay += $scope.user.point / 100.0;
		} else {
			$scope.pointSelected = true;
			$scope.pay -= $scope.user.point / 100.0;	
		}
	}
	
//	$scope.selectedAward = function() {
//		if ($scope.awardSelected) {
//			$scope.awardSelected = false;
//			$scope.pay += $scope.user.award;
//		} else {
//			$scope.awardSelected = true;
//			$scope.pay -= $scope.user.award;	
//		}
//	}
	
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
		if ($scope.isFinished) {
			mui.toast("已经结算过了");
			return;
		}
		if (!$scope.hasConsignee) {
			mui.toast("请填写收货地址信息");
			return;
		}
		$scope.isFinished = true;
		
		if ($scope.user.admin == 1) {
			$scope.pay = 0.01;	
		}
		$scope.point = 0;
		if ($scope.pointSelected) {
			$scope.point = $scope.user.point;
		}
		var memo = document.getElementById("memo").value;
		$http.get(getHeadUrl() + "order_modify?id=" + $scope.order.id + "&address_id=" + $scope.addressInfo.id + "&pay=" + $scope.pay + "&point=" + $scope.point + "&memo=" + memo).success(function(response) {
			location.href = getHeadUrl() + "/wechat_pay?order_num=" + $scope.order.order_num + "&amount=" + $scope.pay * 100 + "&openid=" + $scope.wcid;	
		});
	}
});