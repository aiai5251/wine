var app = angular.module("wine", []);
app.controller("address_control", function($scope, $http) {
	$scope.order_num = GetQueryString("order_num");
	$scope.uid = getUid();
	
	$http.get(getHeadUrl() + "address?uid=" + $scope.uid).success(function(response) {
		$scope.addressList = response.data;
	});
	
	$scope.defaultAddress = function(model) {
		for(var i = 0; i < $scope.addressList.length; i++) {
			$scope.address = $scope.addressList[i];
			$scope.address.is_default = false;
		}
		$http.get(getHeadUrl() + "address_modify?is_default=1&id=" + model.id + "&uid=" + $scope.uid).success(function(response) {
			model.is_default = true;
		});
	};
	
	$scope.pushEdit = function(model) {
		location.href = "address_edit.html?id=" + model.id + "&order_num=" + $scope.order_num;
	};

	mui.init({
  		gestureConfig:{
   			tap: true
   		}
	});
	$scope.delAddress = function(model, index) {
		$http.get(getHeadUrl() + "address_delete?id=" + model.id).success(function(response) {
			$scope.addressList.splice(index, 1);
			mui.toast("删除成功");
		});
	};

	mui('.mui-bar-tab').on('tap', 'a', function(e) {
		var targetTab = this.getAttribute('href');
		location.href = targetTab;
	});

});