var app = angular.module("wine", []);
app.controller("detail", function($scope, $http) {
	// 获取链接的产品id
	$scope.productId = GetQueryString("id");
	$scope.cartProduct = 0;
	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		paginationClickable: true,
		autoplay: 2000,
		loop: true
	});

	$http.get(getHeadUrl() + "homeController/ProductInfo.do?id=" + $scope.productId).success(function(response) {
		$scope.productInfo = response.productInfo;
		console.log($scope.productInfo);

		$("#swiperwrapper").html("");
		for(var i = 0; i < $scope.productInfo.imagelist.length; i++) {
			swiper.appendSlide(_.template($('#templateSwiper').html())($scope.productInfo.imagelist[i]));
		}
		$scope.commentList = response.listcomment;
	});

	$scope.goToCart = function() {
		location.href = "cart.html";
	}

	//加入购物车
	$scope.addCart = function() {
		$http.get(getHeadUrl() + "homeController/AddProductCar.do?id=" + $scope.productId + "&count=1&uid=1").success(function(response) {
			$scope.cartProduct = 1;
		});
	}

});