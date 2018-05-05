
(function ($, window) {
    var timeout;
    //确认取消参数
    var alertDefaults = {
        title: "提示信息",
        content: "确认执行删除操作吗？",
    };
    $.extend({
        //alert提示消息框
        AlertModel: function (opts) {
            //获取网页高度
            //var pageHeight = document.documentElement.clientHeight - 54;
            alertDefaults = $.extend({}, alertDefaults, opts);
            $("#AlertModel").remove();
            clearTimeout(timeout);
            $("body").append('<div id="AlertModel" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"><div class="modal-dialog modal-sm" id="alertDialogHeight"><div class="modal-content"><div class="modal-header"><h4>' + alertDefaults.title + '</h4></div> <div class="modal-body"><p>' + alertDefaults.content + '</p></div><div class="modal-footer" style="text-align:center;"><a href="#" class="btn btn-primary" data-dismiss="modal" aria-hidden="true">确定</a></div></div>');
            $("#alertDialogHeight").css("margin-top", 200);
            $('#AlertModel').modal({
                backdrop: 'static'
            });
            //$('#AlertModel').on('shown.bs.modal', function (e) {
            //    timeout = setTimeout("$('#AlertModel').modal('hide')", 2000);
            //})           
        },
        //LoadModel消息框
        LoadModel: function (opts) {
            //获取网页高度
            var pageHeight = document.documentElement.clientHeight / 2 - 79;
            //alertDefaults = $.extend({}, alertDefaults, opts);
            $("#LoadModel").remove();
            $("body").append('<div id="LoadModel" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"><div class="modal-dialog modal-sm" id="LoadModelHeight"><div class="modal-content" style="background-color:rgba(0,0,0,0); box-shadow:inherit;"><div class="modal-body"  style="text-align:center;"><img src="/Content/Plugin/img/loading.gif"></div></div>');
            $("#LoadModelHeight").css("margin-top", pageHeight);
            $('#LoadModel').modal({
                backdrop: 'static'
            });
        },
        //确认弹出框（点击确认）
        ConfirmAlert: function (opts, method, data1, data2, data3) {
            alertDefaults = $.extend({}, alertDefaults, opts);
            //获取网页高度
            var pageHeight = document.body.clientHeight;
            $('#Confirm').remove();
            $("body").append("<div id='Confirm' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel'><div class='modal-dialog modal-sm' id='confirmDialogHeight'><div class='modal-content'><div class='modal-header'><h4>" + alertDefaults.title + "</h4> </div><div class='modal-body'> <p id='Confirm_content'>" + alertDefaults.content + "</p></div><div class='modal-footer ' style='text-align: center;'><a href='#' class='btn btn-primary' id='Confirm_menu' style='margin-right: 20px;'>确定</a><a href='#' id='Cancel_menu' class='btn btn-warning' data-dismiss='modal' aria-hidden='true'>取消</a></div></div></div></div>");
            $("#confirmDialogHeight").css("margin-top", 200);
            $('#Confirm').modal({
                backdrop: 'static'
            });

            //如果用户点击确认
            $("#Confirm_menu").click(function () {
                $('#Confirm').remove();
                //执行操作
                method(data1, data2, data3);
            });
        }
    });

    //拖动
    var dragging = false;
    var test;
    var mouseY;
    var mouseX;
    //无遮盖层的弹出框默认参数
    var defaultsProc = {
        position: "absolute",
        top: "100px",
        left: "400px"
    };
    $.fn.extend({
        //弹出无遮盖层的弹出框
        showProc: function (element, opts) {
            defaultsProc = $.extend({}, defaultsProc, opts);
            test = document.getElementById(element);
            test.style.display = 'block';
            test.onmousedown = down;
            test.onmousemove = move;
            document.onmouseup = up;
            test.style.position = defaultsProc.position;
            test.style.top = defaultsProc.top;
            test.style.left = defaultsProc.left;
        },
        //关闭无遮盖层的弹出框
        closeProc: function (element) {
            document.getElementById(element).style.display = 'none';
        }
    });
    function down(event) {
        if ($(event.target).closest("#landMarkName").length == 0 && $(event.target).closest("#landMarkAddress").length == 0 && $(event.target).closest("#p_markname").length == 0 && $(event.target).closest("#p_address").length == 0 && $(event.target).closest("#landMarkType").length == 0 && $(event.target).closest("#p_marktype").length == 0 && $(event.target).closest("#landMarkRange").length == 0 && $(event.target).closest("#landMarkStyle").length == 0) {
            event = event || window.event;
            dragging = true;
            mouseX = parseInt(event.clientX);
            mouseY = parseInt(event.clientY);
            objY = parseInt(test.style.top);
            objX = parseInt(test.style.left);
        }
    }
    function move(event) {
        if ($(event.target).closest("#landMarkName").length == 0 && $(event.target).closest("#landMarkAddress").length == 0 && $(event.target).closest("#p_markname").length == 0 && $(event.target).closest("#p_address").length == 0 && $(event.target).closest("#landMarkType").length == 0 && $(event.target).closest("#p_marktype").length == 0 && $(event.target).closest("#landMarkRange").length == 0 && $(event.target).closest("#landMarkStyle").length == 0) {
            event = event || window.event;
            if (dragging == true) {
                var x, y;
                y = event.clientY - mouseY + objY;
                x = event.clientX - mouseX + objX;
                test.style.top = y + "px";
                test.style.left = x + "px";
            }
        }
    }
    function up() {
        dragging = false;
    }



}(jQuery, window));


//如果操作失败
function failRequest(data) {
    var opts = {
        title: "提示",
        content: data.ErrorText
    }
    $.AlertModel(opts);
    $("#showwin").modal("hide");
}

//弹出提示框
function PromptDialog(data) {
    var opts = {
        title: "提示",
        content: data,
    }
    $.AlertModel(opts);
}

