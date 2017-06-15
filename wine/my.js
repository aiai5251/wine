var app = angular.module("wine", []);
app.controller("my", function($scope, $http) {
	$scope.orderStatusArray = [
		{"title": "待付款", "icon": "waitpay.png"},
		{"title": "待发货", "icon": "waitsend.png"},
		{"title": "待收货", "icon": "waitharvest.png"},
		{"title": "已完成", "icon": "waitsend.png"}
	];
	
	$scope.dataArray = [
		{"title": "我的推广团队", "icon": "tuiguang.png", "hasRight": true},
		{"title": "我的订单", "icon": "orderlist.png", "hasRight": false},
		{"title": "客服", "icon": "tel.png", "hasRight": false}
	];
	
	$scope.push = function(pushId) {
		if (pushId == 1) {
			location.href = "goodslist.html";
		} else if (pushId == 2) {
			location.href = "cart.html";
		} else {
			location.href = "my_qrcode.html";
		}
	}
	
});
