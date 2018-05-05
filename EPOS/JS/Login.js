function signUp()
{
    var user = {
        UserName: $("#Name").val(),
        PassWord: $("#pwd").val(),
        RuleID:1,
        Address: $("#address").val()
    }
    AjaxLoginPost(user, "Login/Register", function (result) {
        if(result.ExeResult)
        {
            window.location.href = "Home.html";
        }
    });
}

function Login()
{
    var user = {
        UserName: $("#Name").val(),
        PassWord: $("#pwd").val()
    }
    window.location.href="Home.html";
    //AjaxLoginPost(user, "Login/Login", function (result) {
    //    if (result.ExeResult) {
    //       window.location.href="Home.html";
    //    }
    //});
}