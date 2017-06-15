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
app.controller("address_add", function($scope, $http) {
	$scope.addAddress = function() {
		console.log(document.getElementById("name").value);
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

		$http.get("http://192.168.1.10:8080/Student_maven/mineController/InsertMineAddress.do?uid=" + "1" + "&name=" + name + "&tel=" + tel + "&address=" + city + address).success(function(response) {

		});
	}
});