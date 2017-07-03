var app = angular.module("wine", []);
app.controller("goods", function($scope, $http) {	
	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		paginationClickable: true,
		autoplay: 2000,
		loop: true
	});
//	$scope.productList = [{"id":"1", "title": "1", "imgurl": "http://learning.didichuxing.com/resources/activity/803/2016203014203712231.jpg", "volume": "500ml", "price": "500", "submessage": "40度长白山松茸酒"},{"title": "1", "imgurl": "http://learning.didichuxing.com/resources/activity/803/2016203014203712231.jpg", "volume": "500ml", "price": "500", "submessage": "40度长白山松茸酒"}];
	$http.get(getHeadUrl() + "homeController/HomePage.do?userid=1&page=1&pagesize=10").success(function(response) {
		$scope.bannerList = response.listbanners;
		$("#swiperwrapper").html("");
		for(var i = 0; i < $scope.bannerList.length; i++) {
			swiper.appendSlide(_.template($('#templateSwiper').html())($scope.bannerList[i]));
		}
		console.log($scope.bannerList);

		// product
		$scope.productList = response.listproduct;
		console.log($scope.productList);
	});
	
	$scope.selectCell = function(pid) {
		console.log(pid);
		location.href = "detail.html?id=" + pid;
	};
	
	mui.init();
	mui('.mui-bar-tab').on('tap', 'a', function(e) {
		var targetTab = this.getAttribute('href');
		location.href = targetTab;
    });
	
});