var app = angular.module("wine", []);
app.controller("detail", function($scope, $http) {
	 var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		paginationClickable: true,
		autoplay: 2000,
		loop: true
	});
	
});