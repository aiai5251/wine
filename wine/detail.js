var app = angular.module("wine", []);
app.controller("detail", function($scope, $http) {
	// 获取链接的产品id
	$scope.productId = GetQueryString("id");
	$scope.uid = getUid();
	
	if ($scope.uid.length == 0) {
		location.href = "com/go.html?url=" + location.href;
		return;
	}
	
	$scope.cartProduct = 0;
	$scope.defaultNum = 1;
	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		paginationClickable: true,
		autoplay: 2000,
		loop: true
	});

	$http.get(getHeadUrl() + "product_detail?id=" + $scope.productId).success(function(response) {
		$scope.productInfo = response.data;
		console.log($scope.productInfo);

		$("#swiperwrapper").html("");
		for(var i = 0; i < $scope.productInfo.images.length; i++) {
			swiper.appendSlide(_.template($('#templateSwiper').html())($scope.productInfo.images[i]));
		}
		var itemimgs = document.getElementById("swiperwrapper").getElementsByClassName("picture");
		for(var i = 0; i < itemimgs.length; i++) {
			itemimgs[i].height = $(window).width();
		}
		$scope.commentList = $scope.productInfo.commentList;
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
			$http.get(getHeadUrl() + "cart_add?pid=" + $scope.productId + "&count=" + $scope.defaultNum + "&uid=" + $scope.uid).success(function(response) {
				$scope.cartProduct = 1;
				mui.toast("成功加入购物车");
			});	
		}
	};
});