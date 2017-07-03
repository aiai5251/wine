var app = angular.module("wine", []);
app.controller("address_control", function($scope, $http) {

	$scope.addrestList = [{
		"id": "100",
		"name": "宋国雨",
		"tel": "1800000000848",
		"address": "北京市昌平区北方明珠北京市昌平区北方明珠北京市昌平区北方明珠"
	}, {
		"id": "113",
		"name": "诗瑶荣",
		"tel": "18000000848",
		"address": "北京市昌平区北方明珠"
	}];

	for(var i = 0; i < $scope.addrestList.length; i++) {
		$scope.address = $scope.addrestList[i];
		if ($scope.address.id == "113") {
			$scope.address.isDefault = true;	
		} else {
			$scope.address.isDefault = false;
		}
	}

	$scope.defaultAddress = function(model) {
		for(var i = 0; i < $scope.addrestList.length; i++) {
			$scope.address = $scope.addrestList[i];
			$scope.address.isDefault = false;
		}
		model.isDefault = true;
//		$http.get(getHeadUrl() + "mineController/UpdMineAddress.do?type=0&id=" + model.id).success(function(response) {
//			model.isDefault = true;
//		});
	};
	
	$scope.pushEdit = function(model) {
		location.href = "address_edit.html?id=" + model.id;
	};

	mui.init({
  		gestureConfig:{
   			tap: true
   		}
	});
	$scope.delAddress = function(model, index) {
		$http.get(getHeadUrl() + "mineController/UpdMineAddress.do?type=1&id=" + model.id).success(function(response) {
			$scope.addrestList.splice(index, 1);
			mui.toast("删除成功");
		});
	};

	mui('.mui-bar-tab').on('tap', 'a', function(e) {
		var targetTab = this.getAttribute('href');
		location.href = targetTab;
	});

});