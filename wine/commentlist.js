var app = angular.module("wine", []);
app.controller("commentlist", function($scope, $http) {
	 $scope.pid = GetQueryString("pid");
	 $http.get(getHeadUrl() + "comment?pid=" + $scope.pid).success(function(response) {
		$scope.commentList = response.data; 	
	});
	 
});