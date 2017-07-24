var app = angular.module("wine", []);
app.controller("addresslist", function($scope, $http) {
	$scope.order_num = GetQueryString("order_num");
	$scope.uid = getUid();

	$http.get(getHeadUrl() + "address?uid=" + $scope.uid).success(function(response) {
		$scope.addressList = response.data;
		console.log($scope.addressList);
	});
	
	$scope.selectedAddress = function(model) {
		for(var i = 0; i < $scope.addressList.length; i++) {
			$scope.address = $scope.addressList[i];
			$scope.address.is_selected = false;
		}
		model.is_selected = true;

	};

	$scope.editAddress = function() {
		for(var i = 0; i < $scope.addressList.length; i++) {
			$scope.address = $scope.addressList[i];
			if ($scope.address.is_selected) {
				$http.get(getHeadUrl() + "address_modify?selected=1&id=" + $scope.address.id + "&uid=" + $scope.uid).success(function(response) {
					location.href = "order.html?order_num=" + $scope.order_num;
				});
			}
		}
	}
	
	mui.init();
	mui('.mui-bar-tab').on('tap', 'a', function(e) {
		var targetTab = this.getAttribute('href');
		location.href = targetTab;
    });
});