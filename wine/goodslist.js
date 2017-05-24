
var app = angular.module("wine", []);

app.controller("com-header", function($scope) {
	document.getElementById("comHeader").innerHTML = GetComHeader(); 
});

app.controller("com-footer", function($scope) {
	document.getElementById("comFooter").innerHTML = GetComFooter(); 
});

app.controller("goods", function($scope, $http) {
	
	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		paginationClickable: true,
		autoplay: 2000,
		loop: true
	});
	
	$http.get(getHeadUrl() + "homeController/HomePage.do?userid=1&page=1&pagesize=10").success(function(response) {
		// banner
		$scope.bannerList = response.listbanners;
		$("#swiperwrapper").html("");
		for(var i = 0; i < $scope.bannerList.length; i++) {
			swiper.appendSlide(_.template($('#templateSwiper').html())($scope.bannerList[i]));
		}
		console.log(response.listbanners);
		
		// product
		$scope.productList = response.listproduct;
		console.log($scope.productList);
	});
	
	$scope.selectCell = function() {
			
	}
});