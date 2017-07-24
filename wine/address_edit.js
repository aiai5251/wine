(function($, doc) {
	$.init();
	$.ready(function() {
		//级联示例
		var cityPicker = new $.PopPicker({
			layer: 2
		});
		cityPicker.setData(cityData);
		var showCityPickerButton = doc.getElementById('showCityPicker');
		var cityResult = doc.getElementById('province_city');
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
	$scope.order_num = GetQueryString("order_num");
	$scope.addressid = GetQueryString("id");

	$http.get(getHeadUrl() + "address?id=" + $scope.addressid).success(function(response) {
		$scope.addressInfo = response.data;
		document.getElementById("name").value = $scope.addressInfo.name;
		document.getElementById("tel").value = $scope.addressInfo.tel;
		document.getElementById("province_city").value = $scope.addressInfo.province_city;
		document.getElementById("address").value = $scope.addressInfo.address;
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
		var province_city = document.getElementById('province_city').value;
		if(province_city == "省、市") {
			mui.toast("请选择省市地址");
			return;
		}
		var address = document.getElementById("address").value;
		if(address.length == 0) {
			mui.toast("请填写收件人详细地址");
			return;
		}

		$http.get(getHeadUrl() + "address_modify?id=" + $scope.addressid + "&name=" + name + "&tel=" + tel + "&address=" + address + "&province_city=" + province_city).success(function(response) {
			location.href = "address_control.html?order_num=" + $scope.order_num;
		});
	}
	 
});