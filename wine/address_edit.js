(function($, doc) {
	$.init();
	$.ready(function() {
		//级联示例
		var cityPicker = new $.PopPicker({
			layer: 2
		});
		cityPicker.setData(cityData);
		var showCityPickerButton = doc.getElementById('showCityPicker');
		var cityResult = doc.getElementById('cityResult');
		showCityPickerButton.addEventListener('tap', function(event) {
			cityPicker.show(function(items) {
				console.log(items[0].text + " " + items[1].text);
				cityResult.value = items[0].text + " " + items[1].text;
			});
		}, false);

	});
})(mui, document);

var app = angular.module("wine", []);
app.controller("address_edit", function($scope, $http) {
	$scope.addressid = GetQueryString("id");
	$scope.addressid = 113;
	$http.get(getHeadUrl() + "mineController/MineProductCarEmpl.do?uid=" + "1" + "&id=" + $scope.addressid).success(function(response) {
		console.log(response);
		document.getElementById("name").value = "a";
		document.getElementById("tel").value = "12345678910";
		document.getElementById("cityResult").value = "北京市 昌平区";
		document.getElementById("address").value = "asdasdsa";
	});
	
	$scope.editAddress = function() {
		var name = document.getElementById("name").value;
		if(name.length == 0) {
			mui.toast("请填写收件人");
			return;
		}
		var tel = document.getElementById("tel").value;
		if(tel.length != 11) {
			mui.toast("请填写收件人电话");
			return;
		}
		var city = document.getElementById('cityResult').value;
		if(city == "省、市") {
			mui.toast("请选择省市地址");
			return;
		}
		var address = document.getElementById("address").value;
		if(address.length == 0) {
			mui.toast("请填写收件人详细地址");
			return;
		}

		$http.get(getHeadUrl() + "mineController/UpdMineAddress.do?type=2&uid=" + "1" + "&id=" + $scope.addressid + "&name=" + name + "&tel=" + tel + "&address=" + city + address).success(function(response) {
			location.href = "address_control.html";
		});
	}
	 
});