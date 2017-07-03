var app = angular.module("wine", []);
app.controller("cart", function($scope, $http) {
	$scope.isAllChoose = false;
	$scope.cartArray = [];
	$scope.allMoney = 0;
	$http.get(getHeadUrl() + "mineController/MineProductCar.do?uid=1").success(function(response) {
		if(response.listcar != undefined && response.listcar.length > 0) {
			for(var i = 0; i < response.listcar.length; i++) {
				$scope.cardModel = response.listcar[i];
				$scope.cardModel.price = parseInt($scope.cardModel.price);
				$scope.cardModel.sum = parseInt($scope.cardModel.sum);
				$scope.cardModel.isChoose = false;
				$scope.cartArray.push($scope.cardModel);
			}
		}
	});
	
	// 单项操作
	$scope.addChoose = function(model) {
		model.isChoose = true;
		$scope.allMoney = $scope.allMoney + model.price * model.sum;
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
		$scope.allMoney = $scope.allMoney - model.price * model.sum;
		$scope.isAllChoose = false;
	};
	
	// 加减
	$scope.minus = function(model) {
		if (model.sum == 1) {
			return;
		}
		model.sum -= 1;
		if (model.isChoose) {
			$scope.allMoney = $scope.allMoney - model.price;	
		}
	}
	
	$scope.plus = function(model) {
		model.sum = model.sum + 1;
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
			$scope.allMoney = $scope.allMoney + $scope.cardModel.sum * $scope.cardModel.price;
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
		$http.get(getHeadUrl() + "mineController/DelMineProductCar.do?uid=" + "1" + "&id=" + row.id).success(function(response) {
			$scope.cartArray.splice(index, 1);
			mui.toast("删除成功");
		});
	};
	
	// 删除购物车该商品
	$scope.totalReomveCart = function(row) {
		$http.get(getHeadUrl() + "mineController/DelMineProductCar.do?uid=" + "1" + "&id=" + row.id).success(function(response) {
		});
	}
	
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
		
		// warning by shi
		location.href = "order.html";
		
//		$scope.commodityguid = "";
//		$scope.count = 0;
//		$scope.counts = 0;
//		$scope.amounts = 0;
//		for(var i = 0; i < $scope.cartArray.length; i++) {
//			$scope.cardModel = $scope.cartArray[i];
//			if ($scope.cardModel.isChoose) { // 计算选中的
//				$scope.commodityguid = $scope.commodityguid + $scope.cardModel.id + ",";
//				$scope.counts = $scope.counts + $scope.cardModel.sum + ",";
//				$scope.amounts = $scope.amounts + $scope.cardModel.price * $scope.cardModel.sum + ",";
//				$scope.count += 1;
//				$scope.totalReomveCart($scope.cardModel);
//			}
//		}
		// warning by shi
//		var orderAddParamData = {"uid": "1", "count" :  $scope.count, "amount": $scope.allMoney, "id": $scope.commodityguid, "counts": $scope.counts, "current": 0, "amounts": $scope.amounts};
		
//		$http({
//			method: 'POST',
//			url: getHeadUrl() + "MineProductCarEmpl",
//			data: $.param(orderAddParamData),
//			headers: {
//				'Content-Type': "application/x-www-form-urlencoded"
//			},
//			transformRequest: angular.identity
//		}).success(function(response) {
//			console.log(response.body);
//		});
		
	}
});