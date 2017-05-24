var app = angular.module("wine", []);
app.controller("cart", function($scope, $http) {
	$scope.cartArray = [];
	$http.get(getHeadUrl() + "mineController/MineProductCar.do?uid=1").success(function(response) {
		$scope.cartArray = response.listcar;
	});
	
//	$scope.cartArray = [
//		{"desc": "法国梦幻巴蒂AOP原瓶进口幻彩干白葡萄酒1支装", "image": "", "vintage": "2012", "capacity": "750ml"},
//		{"desc": "法国拉图圣修女珍藏级西拉干红葡萄酒1支装", "image": "", "vintage": "2012", "capacity": "750ml"},
//		{"desc": "法国梦幻巴蒂酒庄原瓶进口 芙丽佳人干红葡萄酒", "image": "", "vintage": "2012", "capacity": "750ml"}
//	];

//	$scope.edit = function () {
//		document.getElementById('removeId').className = "removeAnima";
//		document.getElementById("removeId").style.display = "block";
//	}
});