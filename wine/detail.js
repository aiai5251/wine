var app = angular.module("wine", []);
app.controller("detail", function($scope, $http) {
	// 获取链接的产品id
	$scope.productId = GetQueryString("id");
	// warning
	$scope.productId = 34;
	
	$scope.cartProduct = 0;
	$scope.defaultNum = 1;
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

	$scope.minsClick = function() {
		if ($scope.defaultNum == 1) {
		} else {
			$scope.defaultNum -= 1;
		}
	};
	$scope.plusClick = function() {
		$scope.defaultNum += 1;
	};
	
	mui.init();
	mui('.mui-bar-tab').on('tap', 'a', function(e) {
		var targetTab = this.getAttribute('href');
		console.log(targetTab);
		if (targetTab == "#addCart") {
			$scope.addCart();
		} else {
			location.href = targetTab;	
		}
    });
	//加入购物车
	$scope.addCart = function() {
		if ($scope.cartProduct == 1) {
			mui.toast("已加入购物车");
		} else {
			$http.get(getHeadUrl() + "homeController/AddProductCar.do?id=" + $scope.productId + "&count=" + $scope.defaultNum + "&uid=1").success(function(response) {
				$scope.cartProduct = 1;
				mui.toast("成功加入购物车");
			});	
		}
	};
});