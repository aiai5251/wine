var app = angular.module("wine", []);
app.controller("my_qrcode", function($scope, $http) {
	$scope.uid = getUid();
	if ($scope.uid.length == 0) {
		location.href = "com/go.html?url=" + location.href;
		return;
	}
	
	$http.get(getHeadUrl() + "qrcode?uid=" + $scope.uid).success(function(response){
		$scope.ticket = response.ticket;
	});
});