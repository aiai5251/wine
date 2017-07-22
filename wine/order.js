var app = angular.module("wine", []);
app.controller("order", function($scope, $http) {
	$scope.hasConsignee = false; // 是否有收货人信息
	$scope.isFinished = false; // 订单已完成状态

	$scope.guid = GetQueryString("id");

	$scope.cartArray = [
		{"desc": "法国梦幻巴蒂AOP原瓶进口幻彩干白葡萄酒1支装", "image": "", "vintage": "2012", "capacity": "750ml"},
		{"desc": "法国拉图圣修女珍藏级西拉干红葡萄酒1支装", "image": "", "vintage": "2012", "capacity": "750ml"},
		{"desc": "法国梦幻巴蒂酒庄原瓶进口 芙丽佳人干红葡萄酒", "image": "", "vintage": "2012", "capacity": "750ml"}
	];
	
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
//		if (!$scope.hasConsignee) {
//			mui.toast("请填写收货地址信息");
//			return;
//		}	
		
		$http.get(getHeadUrl() + "order_modify?id=1013&address_id=123&coupon_id=1&status=1&pay=598").success(function(response){
			console.log(response);
		});
		
	};
	
});