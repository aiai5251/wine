var app = angular.module("wine", []);
app.controller("commentlist", function($scope, $http) {
	 $scope.productId = GetQueryString("id");
	 $http.get(getHeadUrl() + "homeController/GetAllComment.do?page=1&pagesize=100&id=" + $scope.productId).success(function(response) {
		$scope.commentList = response.listcomment; 	
		console.log($scope.commentList);
	});
	 
});