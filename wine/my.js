var app = angular.module("wine", []);
app.controller("my", function($scope, $http) {
	$scope.uid = getUid();
	if ($scope.uid.length == 0) {
		location.href = "com/go.html?url=" + location.href;
		return;
	}
	
	$scope.orderStatusArray = [
		{"title": "待付款", "icon": "img/waitpay.png", "href": "my_order.html?status=0"},
		{"title": "待发货", "icon": "img/waitsend.png", "href": "my_order.html?status=1"},
		{"title": "待收货", "icon": "img/waittake.png", "href": "my_order.html?status=2"},
		{"title": "已完成", "icon": "img/waitfinish.png", "href": "my_order.html?status=3"}
	];
	
	$scope.section1Array = [
		{"title": "我的奖励", "icon": "tuiguang.png", "hasRight": true, "desc": "", "href": "my_award.html"},
		{"title": "我的推广团队", "icon": "orderlist.png", "hasRight": false, "desc": "", "href": "my_team.html"},
		{"title": "奖励提现", "icon": "tel.png", "hasRight": false, "desc": "", "href": "cash_advance.html"}
	];
	
	$scope.section2Array = [
		{"title": "优惠券", "icon": "tuiguang.png", "hasRight": true, "desc": "", "href": "coupon.html?status=2"},
		{"title": "我的积分", "icon": "orderlist.png", "hasRight": true, "desc": "", "href": "my_integral.html"},
	];
	
	$scope.section3Array = [
		{"title": "管理收货地址", "icon": "tel.png", "hasRight": false, "desc": "", "href": "address_control.html"},
		{"title": "客服", "icon": "tel.png", "hasRight": false, "desc": "", "href": "tel:10086"}
	];
	
	$http.get(getHeadUrl() + "my?id=" + $scope.uid).success(function(response) {
		$scope.mineInfo = response.data;
		$scope.section1Array[0].desc = $scope.mineInfo.award;
		$scope.section2Array[0].desc = $scope.mineInfo.coupon_count;
		$scope.section2Array[1].desc = $scope.mineInfo.point;
		$scope.sectionArray = [$scope.section1Array, $scope.section2Array, $scope.section3Array];
	});
	
	mui.init();
	mui('.mui-bar-tab').on('tap', 'a', function(e) {
		var targetTab = this.getAttribute('href');
		location.href = targetTab;
   });
	
});
