var app = angular.module("wine", []);
app.controller("my", function($scope, $http) {
	$scope.orderStatusArray = [
		{"title": "待付款", "icon": "img/waitpay.png", "href": "order_wait.html?type=0"},
		{"title": "待发货", "icon": "img/waitsend.png"},
		{"title": "待收货", "icon": "img/waitsend.png"},
		{"title": "已完成", "icon": "img/waitsend.png"}
	];
	
	$scope.section1Array = [
		{"title": "我的奖励", "icon": "tuiguang.png", "hasRight": true, "desc": "", "href": "my_award.html"},
		{"title": "我的推广团队", "icon": "orderlist.png", "hasRight": false, "desc": "", "href": "my_team.html"},
		{"title": "奖励提现", "icon": "tel.png", "hasRight": false, "desc": "", "href": "cash_advance.html"}
	];
	
	$scope.section2Array = [
		{"title": "优惠券", "icon": "tuiguang.png", "hasRight": true, "desc": "", "href": "coupon.html"},
		{"title": "我的积分", "icon": "orderlist.png", "hasRight": true, "desc": "", "href": "my_integral.html"},
	];
	
	$scope.section3Array = [
		{"title": "管理收货地址", "icon": "tel.png", "hasRight": false, "desc": "", "href": "address_control.html"},
		{"title": "客服", "icon": "tel.png", "hasRight": false, "desc": "", "href": "tel:10086"}
	];
	
	$http.get(getHeadUrl() + "mineController/MemberCenter.do?uid=" + "1").success(function(response) {
		$scope.mineInfo = response.mineInfo;
		$scope.section1Array[0].desc = $scope.mineInfo.award;
		$scope.section2Array[0].desc = $scope.mineInfo.couPonCount;
		$scope.section2Array[1].desc = $scope.mineInfo.point;
		$scope.sectionArray = [$scope.section1Array, $scope.section2Array, $scope.section3Array];
	});
	
	
	
	
	
	mui.init();
	mui('.mui-bar-tab').on('tap', 'a', function(e) {
		var targetTab = this.getAttribute('href');
		location.href = targetTab;
   });
	
});
