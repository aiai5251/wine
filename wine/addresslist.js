var app = angular.module("wine", []);
app.controller("addresslist", function($scope, $http) {
	$scope.oid = GetQueryString("oid");
	$scope.uid = getUid();
	
	if ($scope.uid.length == 0) {
		location.href = "com/go.html?url=" + location.href;
		return;
	}
	
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
		$http.get(getHeadUrl() + "address_modify?selected=1&id=" + model.id + "&uid=" + $scope.uid).success(function(response) {
			if ($scope.oid != undefined && $scope.oid.length > 0) {
				location.href = "order.html?id=" + $scope.oid;	
			} else {
				location.href = "my.html";
			}
		});
	};
	
	mui.init();
	mui('.mui-bar-tab').on('tap', 'a', function(e) {
		var targetTab = this.getAttribute('href');
		location.href = targetTab;
    });
});