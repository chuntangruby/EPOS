/************************************************************************************
     *唯一标识：
     *创建人：
     *电子邮箱：
     *手机号：
     *创建时间：
     *版本：V1
     *描述：（ajax公共方法js）
     *
************************************************************************************/
var IP = "http://10.10.11.55:3001/api/";
/**
Ajax 请求 
* data 数据包
* CallBack 回调函数
* url  请求的control url
*/
function AjaxToWebAPIPost(data, url, callBack) {
    if (!top.VMS) {
        // top.window.location.href = "/Login/Login";
        return;
    }
    var request = {};
    request.Company_Oid = top.VMS.LP.user.Company_Oid;//top.I51EY.LPS.Data.User.Company_Oid;
    request.User_Key = top.VMS.LP.user.User_Key;//top.I51EY.LPS.Data.User.User_Key;
    request.Org_Code = top.VMS.LP.user.Org_Code;//top.I51EY.LPS.Data.User.Org_Code;
    request.User_Name = top.VMS.LP.user.User_Name;//top.I51EY.LPS.Data.User.User_Name;
    request.Tag = top.VMS.LP.user.User_Type_Oid; //top.I51EY.LPS.Data.User.User_Type_Oid;
    request.LoginKey = top.VMS.LP.user.LoginKey;//top.I51EY.LPS.Data.User.LoginKey;
    request.data = JSON.stringify(data);
    $.ajax({
        beforeSend: function () {
            //dg.showLoading();d
        },
        type: "post",
        url: IP + url,
        timeout: 60000,
        contentType: "application/json",
        data: JSON.stringify(request),
        success: function (json) {
            callBack(json);
            //dg.hideLoading();
        },
        complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
            if (status == 'timeout') {//超时,status还有success,error等值的情况
                var opts = {
                    title: "提示",
                    content: "请求超时"
                }
                $.AlertModel(opts);
                $('#LoadModel').modal('hide');
            }
        },
        error: function (result) {
            if (result.status == "404") {
                result = JSON.parse(result.responseText);
                //删除操作 
                var opts = {
                    title: "提示",
                    content: result.ErrorText
                }
                $.ConfirmAlert(opts, linkToLogin);
                $("#Cancel_menu").hide();
            }
        }
    });
}

/**
Ajax 请求 
* data 数据包
* CallBack 回调函数
* url  请求的control url
*/
function AjaxToWebAPIGet(data, url, callBack) {
    if (!top.VMS) {
        // top.window.location.href = "/Login/Login";
        return;
    }
    var request = {};
    request.Company_Oid = top.VMS.LP.user.Company_Oid;//top.I51EY.LPS.Data.User.Company_Oid;
    request.User_Key = top.VMS.LP.user.User_Key;//top.I51EY.LPS.Data.User.User_Key;
    request.Org_Code = top.VMS.LP.user.Org_Code;//top.I51EY.LPS.Data.User.Org_Code;
    request.User_Name = top.VMS.LP.user.User_Name;//top.I51EY.LPS.Data.User.User_Name;
    //request.Tag = 2; //top.I51EY.LPS.Data.User.User_Type_Oid;
    request.Org_Key = top.VMS.LP.user.Org.Org_Key;// user.Org.Org_Key;//top.I51EY.LPS.Data.User.Org_Code;
    request.LoginKey = top.VMS.LP.user.LoginKey;//top.I51EY.LPS.Data.User.LoginKey;
    request.data = JSON.stringify(data);
    $.ajax({
        beforeSend: function () {
            //dg.showLoading();
        },
        type: "get",
        url: IP + url,
        timeout: 60000,
        contentType: "application/json",
        data: request,
        success: function (json) {
            callBack(json);
            //dg.hideLoading();
        },
        complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
            if (status == 'timeout') {//超时,status还有success,error等值的情况
                var opts = {
                    title: "提示",
                    content: "请求超时"
                }
                $.AlertModel(opts);
                $('#LoadModel').modal('hide');
            }
        },
        error: function (result) {
            if (result.status == "404") {
                result = JSON.parse(result.responseText);
                //删除操作 
                var opts = {
                    title: "提示",
                    content: result.ErrorText
                }
                $.ConfirmAlert(opts, linkToLogin);
                $("#Cancel_menu").hide();
            }
        }
    });

}

/**
Ajax 请求 
* data 数据包
* CallBack 回调函数
* url  请求的control url
*/
function AjaxToWebAPIRequestPost(request, data, url, callBack) {
    if (!top.VMS) {
        //  top.window.location.href = "/Login/Login";
        return;
    }
    request.Company_Oid = top.VMS.LP.user.Company_Oid;//top.I51EY.LPS.Data.User.Company_Oid;
    request.User_Key = top.VMS.LP.user.User_Key;//top.I51EY.LPS.Data.User.User_Key;
    request.Org_Code = top.VMS.LP.user.Org_Code;//top.I51EY.LPS.Data.User.Org_Code;
    request.User_Name = top.VMS.LP.user.User_Name;//top.I51EY.LPS.Data.User.User_Name;
    //request.Tag = 2; //top.I51EY.LPS.Data.User.User_Type_Oid;
    request.LoginKey = top.VMS.LP.user.LoginKey;//top.I51EY.LPS.Data.User.LoginKey;
    request.data = JSON.stringify(data);
    $.ajax({
        beforeSend: function () {
            //dg.showLoading();
        },
        type: "post",
        url: IP + url,
        timeout: 60000,
        contentType: "application/json",
        data: JSON.stringify(request),
        success: function (json) {
            callBack(json);
            //dg.hideLoading();
        },
        complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
            if (status == 'timeout') {//超时,status还有success,error等值的情况
                var opts = {
                    title: "提示",
                    content: "请求超时"
                }
                $.AlertModel(opts);
                $('#LoadModel').modal('hide');
            }
        },
        error: function (result) {
            if (result.status == "404") {
                result = JSON.parse(result.responseText);
                //删除操作 
                var opts = {
                    title: "提示",
                    content: result.ErrorText
                }
                $.ConfirmAlert(opts, linkToLogin);
                $("#Cancel_menu").hide();
            }
        }
    });
}

/**
Ajax 请求 
* data 数据包
* CallBack 回调函数
* url  请求的control url
*/
function AjaxToWebAPIRequestGet(request, data, url, callBack) {
    if (!top.VMS) {
        // top.window.location.href = "/Login/Login";
        return;
    }
    request.Company_Oid = top.VMS.LP.user.Company_Oid;//top.I51EY.LPS.Data.User.Company_Oid;
    request.User_Key = top.VMS.LP.user.User_Key;//top.I51EY.LPS.Data.User.User_Key;
    request.Org_Code = top.VMS.LP.user.Org_Code;//top.I51EY.LPS.Data.User.Org_Code;
    request.User_Name = top.VMS.LP.user.User_Name;//top.I51EY.LPS.Data.User.User_Name;
    //request.Tag = 2; //top.I51EY.LPS.Data.User.User_Type_Oid;
    request.LoginKey = top.VMS.LP.user.LoginKey;//top.I51EY.LPS.Data.User.LoginKey;
    request.data = JSON.stringify(data);
    $.ajax({
        beforeSend: function () {
            //dg.showLoading();
        },
        type: "get",
        url: IP + url,
        timeout: 60000,
        contentType: "application/json",
        data: request,
        success: function (json) {
            callBack(json);
            //dg.hideLoading();
        },
        complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
            if (status == 'timeout') {//超时,status还有success,error等值的情况
                var opts = {
                    title: "提示",
                    content: "请求超时"
                }
                $.AlertModel(opts);
                $('#LoadModel').modal('hide');
            }
        },
        error: function (result) {
            if (result.status == "404") {
                result = JSON.parse(result.responseText);
                //删除操作 
                var opts = {
                    title: "提示",
                    content: result.ErrorText
                }
                $.ConfirmAlert(opts, linkToLogin);
                $("#Cancel_menu").hide();
            }
        }
    });

}

/**
Ajax 请求 
* data 数据包
* CallBack 回调函数
* url  请求的control url
*/
function AjaxToWebAPIRequestNoOrgCodePost(request, data, url, callBack) {
    if (!top.VMS) {
        //  top.window.location.href = "/Login/Login";
        return;
    }
    request.Company_Oid = top.VMS.LP.user.Company_Oid;//top.I51EY.LPS.Data.User.Company_Oid;
    request.User_Key = top.VMS.LP.user.User_Key;//top.I51EY.LPS.Data.User.User_Key;
    request.User_Name = top.VMS.LP.user.User_Name;//top.I51EY.LPS.Data.User.User_Name;
    //request.Tag = 2; //top.I51EY.LPS.Data.User.User_Type_Oid;
    request.LoginKey = top.VMS.LP.user.LoginKey;//top.I51EY.LPS.Data.User.LoginKey;
    request.data = JSON.stringify(data);
    $.ajax({
        beforeSend: function () {
            //dg.showLoading();
        },
        type: "post",
        url: IP + url,
        timeout: 60000,
        contentType: "application/json",
        data: JSON.stringify(request),
        success: function (json) {
            callBack(json);
            //dg.hideLoading();
        },
        complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
            if (status == 'timeout') {//超时,status还有success,error等值的情况
                var opts = {
                    title: "提示",
                    content: "请求超时"
                }
                $.AlertModel(opts);
                $('#LoadModel').modal('hide');
            }
        },
        error: function (result) {
            if (result.status == "404") {
                result = JSON.parse(result.responseText);
                //删除操作 
                var opts = {
                    title: "提示",
                    content: result.ErrorText
                }
                $.ConfirmAlert(opts, linkToLogin);
                $("#Cancel_menu").hide();
            }
        }
    });
}


//定时调用方法
function setIntervalCallBack(callback, time) {
    setInterval(callback, time);
}

/**
Ajax 请求 
* data 数据包
* CallBack 回调函数
* url  请求的control url
*/
function AjaxLoginPost( data, url, callBack) {
    $.ajax({
        beforeSend: function () {
            dg.showLoading();
        },
        type: "post",
        url: IP + url,
        timeout: 60000,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (json) {
            callBack(json);
            dg.hideLoading();
        },
        complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
            if (status == 'timeout') {//超时,status还有success,error等值的情况
                var opts = {
                    title: "提示",
                    content: "请求超时"
                }
                $.AlertModel(opts);
                $('#LoadModel').modal('hide');
            }
        }
    });
}

function linkToLogin() {
    //top.window.location.href = "/Login/Login";
}