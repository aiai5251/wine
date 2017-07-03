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
		console.log(model.isChoose);
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
	
	// 删除单个商品
	$scope.removeCart = function(row, index) {
		console.log(row.id);
		$http.get(getHeadUrl() + "mineController/DelMineProductCar.do?uid=" + "1" + "&id=" + row.id).success(function(response) {
			$scope.cartArray.splice(index, 1);
		});
	};
	
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
});