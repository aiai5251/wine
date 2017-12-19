// 句柄
$ = function(_this) {
    return document.getElementById(_this);
}

function getHeadUrl() {
//	 return "http://localhost:9090/wine/";
	return "http://api.main-zha.com/wine/";
}

// Request
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var context = "";
    if (r != null)
        context = r[2];

    reg = null;
    r = null;

    return context == null || context == "" || context == "undefined" ? "" : context;
}

function GetQueryInt(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var context = "";
    if (r != null)
        context = r[2];

    reg = null;
    r = null;

    return context == null || context == "" || context == "undefined" ? 0 : new Number(context);
}

function getUid() {
	return 3;
	var sd = localStorage.getItem("user_id");
	if (sd != undefined && sd.length != 0) {
		return sd;
	} else {
		return "";
	}
}

function getWcid() {	
	if (GetQueryString("wcid").length > 0) {
		return GetQueryString("wcid");
	}
	var sd = localStorage.getItem("wcid");
	if (sd != undefined && sd.length != 0) {
		return sd;
	} else {
		return "";
	}
}
