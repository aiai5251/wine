var app = angular.module("wine", []);
app.controller("cart", function($scope, $http) {
	$scope.uid = getUid();
	
	if ($scope.uid.length == 0) {
		location.href = "com/go.html?url=" + location.href;
		return;
	}
	
	$scope.isAllChoose = false;
	$scope.cartArray = [];
	$scope.allMoney = 0;
	$http.get(getHeadUrl() + "cart?uid=" + $scope.uid).success(function(response) {
		if(response.data != undefined && response.data.length > 0) {
			for(var i = 0; i < response.data.length; i++) {
				$scope.cardModel = response.data[i];
				$scope.cardModel.isChoose = false;
				$scope.cartArray.push($scope.cardModel);
			}
		}
	});
	
	// 单项操作
	$scope.addChoose = function(model) {
		model.isChoose = true;
		$scope.allMoney = $scope.allMoney + model.price * model.count;
			// 判断现在状态是否为全选状态
		$scope.hasNoChoose = false;
		for(var i = 0; i < $scope.cartArray.length; i++) {
			$scope.cardModel = $scope.cartArray[i];
			if(!$scope.cardModel.isChoose) { //如果取到一个有一个是未选状态的，则全选状态yes
				$scope.hasNoChoose = true;
				break;
			}
		}
		$scope.isAllChoose = !$scope.hasNoChoose;
	};

	$scope.removeChoose = function(model) {
		model.isChoose = false;
		$scope.allMoney = $scope.allMoney - model.price * model.count;
		$scope.isAllChoose = false;
	};
	
	// 加减
	$scope.minus = function(model) {
		if (model.count == 1) {
			return;
		}
		model.count -= 1;
		if (model.isChoose) {
			$scope.allMoney = $scope.allMoney - model.price;	
		}
	}
	
	$scope.plus = function(model) {
		model.count = model.count + 1;
		if (model.isChoose) {
			$scope.allMoney = $scope.allMoney + model.price;	
		}
	}
	
	// 全选
	$scope.addAllChoose = function() {
		$scope.allMoney = 0;
		for(var i = 0; i < $scope.cartArray.length; i++) {
			$scope.cardModel = $scope.cartArray[i];
			$scope.cardModel.isChoose = true;
			$scope.allMoney = $scope.allMoney + $scope.cardModel.count * $scope.cardModel.price;
		}	
		$scope.isAllChoose = true;
	};
	
	$scope.removeAllChoose = function() {
		for(var i = 0; i < $scope.cartArray.length; i++) {
			$scope.cardModel = $scope.cartArray[i];
			$scope.cardModel.isChoose = false;
		}
		$scope.isAllChoose = false;
		$scope.allMoney = 0;
	};
	
	mui.init({
  		gestureConfig:{
   			tap: true
   		}
	});
	// 删除单个商品
	$scope.removeCart = function(row, index) {
		$http.get(getHeadUrl() + "cart_delete?id=" + row.id).success(function(response) {
			$scope.cartArray.splice(index, 1);
			mui.toast("删除成功");
		});
	};
	
	// 结算
	$scope.totalButton = function() {
		$scope.hasChoose = false;
		for(var i = 0; i < $scope.cartArray.length; i++) {
			$scope.cardModel = $scope.cartArray[i];
			if($scope.cardModel.isChoose) { //如果取到一个有一个是未选状态的，则全选状态yes
				$scope.hasChoose = true;
				break;
			}
		}
		if (!$scope.hasChoose) {
			mui.toast("您还没有选择宝贝哦");
			return;
		}
		
		$scope.pids = "";
		$scope.counts = 0;
		$scope.amounts = 0;
		for(var i = 0; i < $scope.cartArray.length; i++) {
			$scope.cardModel = $scope.cartArray[i];
			if ($scope.cardModel.isChoose) { // 计算选中的
				$scope.pids = $scope.pids + $scope.cardModel.pid + ",";
				$scope.counts = $scope.counts + $scope.cardModel.count + ",";
				$scope.amounts = $scope.amounts + $scope.cardModel.price * $scope.cardModel.count + ",";
			}
		}

		$http({
			method: 'POST',
			url: getHeadUrl() + "order_add",
			data: "uid=" + $scope.uid + "&pids=" + $scope.pids + "&counts=" + $scope.counts + "&amounts=" + $scope.amounts,
			headers: {
				'Content-Type': "application/x-www-form-urlencoded"
			},
			transformRequest: angular.identity
		}).success(function(response) {
			if (response.data.id > 0) {
				location.href = "order.html?id=" + response.data.id;	
			}
		});
		
	}
});