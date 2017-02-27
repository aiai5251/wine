
var app = angular.module("goods", []);

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
	
	$scope.asd = function() {
		layer.open({
  			content: '通过style设置你想要的样式'
  			,style: 'background-color:#09C1FF; color:#fff; border:none;' //自定风格
  			,time: 3
		});
	}
});