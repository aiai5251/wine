var app = angular.module("wine", []);
app.controller("order", function($scope, $http) {
	 $scope.cartArray = [
		{"desc": "法国梦幻巴蒂AOP原瓶进口幻彩干白葡萄酒1支装", "image": "", "vintage": "2012", "capacity": "750ml"},
		{"desc": "法国拉图圣修女珍藏级西拉干红葡萄酒1支装", "image": "", "vintage": "2012", "capacity": "750ml"},
		{"desc": "法国梦幻巴蒂酒庄原瓶进口 芙丽佳人干红葡萄酒", "image": "", "vintage": "2012", "capacity": "750ml"}
	];
});