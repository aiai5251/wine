
var app = angular.module("goodslist", []);

app.controller("com-header", function($scope) {
	document.getElementById("comHeader").innerHTML = GetComHeader(); 
});

app.controller("com-footer", function($scope) {
	document.getElementById("comFooter").innerHTML = GetComFooter(); 
});

app.controller("goods", function($scope, $http) {
	
	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		paginationClickable: true,
		autoplay: 2000,
		loop: true
	});
	
	$scope.selectCell = function() {
			
	}
});