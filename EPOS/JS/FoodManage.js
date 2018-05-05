

//全局变量
var commonData = {
    //判断是添加还是修改
    new_up: 1,
    //保存用户点击修改的行
    editRow: 0,
    //保存用户点击修改的row数据
    editRowInfo: {}
};


jQuery(function () {
    //弹窗拖动
    $("#showwin .modal-dialog").draggable({ handle: ".modal-header" });
    $('#FillingStationtable').bootstrapTable({

        pagination: true, // 开启分页功能
        pageList: [5, 10, 20], // 自定义分页列表
        pageSize: 10,    //设置默认分页为5
        pageNumber: 1, //如果设置了分页，首页页码
        showPaginationSwitch: true,  //数据条数选择框
        minimumCountColumns: 1,   //当列数小于此值时，将隐藏内容列下拉框
        sortOrder: 'desc',  // 设置排序为反序 
        search: true,  //搜索
        //striped: true, // 隔行加亮
        //searchOnEnterKey: true, //按回车触发搜索方法
    });
    $("#addwindow").click(function () {
        commonData.new_up = 1;
        $('#Name').val("");
        $("#ProID").val("");
        $('#count').val("");
        $("#price").val("");
        $("#showwin").modal({
            backdrop: 'static'
        });
    });
    //新增、编辑
    $("#btnsave").click(function () {
        //获取用户输入的数据
        var Food = GetData();
        if (Food.Success) {
            //如果是新增
            if (commonData.new_up == 1) {
               //新增
            } else {
                //编辑
               
            }
        }
        else {
            var opts = {
                title: "提示",
                content: FillingStation.ErrorText
            }
            $.AlertModel(opts);

        }
    });

    $('#imgurl').on('change', function () {
        var filePath = $(this).val(),         //获取到input的value，里面是文件的路径  
            fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase();
        // 检查是否是图片  
        if (!fileFormat.match(/.png|.jpg|.jpeg/)) {
            error_prompt_alert('上传错误,文件格式必须为：png/jpg/jpeg');
            return;
        }
        $('#proimg').attr('src', filePath);
    });

    $.LoadModel();
    //加载表格数据
    userOperation.search();
});



//操作
function action(value, row, index) {
    return '<i id="edit" class="glyphicon glyphicon-pencil icon-success fa-15x  m-r-10"></i><i id="del" class="fa icon-warning fa-15x fa-trash-o"></i>';
}

//加载图片
function LoadPic(value, row, index)
{
    return '<img src="' + row.PictrueUrl + '" data-id="login-cover-image" width="80px" height="100px" alt="" />';
}

window.actionEvents = {
    'click #edit': function (e, value, row, index) {
        //修改操作
        commonData.new_up = 2;
        commonData.editRow = index;
        commonData.editRowInfo = row;
        Edit(row);
    },
    'click #del': function (e, value, row, index) {
        //删除操作 
        userOperation.deleteInfo(row);
    }
}

function Edit(row) {
    $("#ProID").val(Food.ProID);
    $('#Name').val(Food.ProName);
    $('#count').val(Food.Count);
    $("#price").val(Food.Price);
    $("#imgurl").val(Food.PictrueUrl);

    $("#ProID").attr("disabled", "disabled");

    $("#showwin").modal({
        backdrop: 'static'
    });
}



//获取用户输入数据
function GetData() {
    var data = {};
    var row = {};
    data.row = row;
    data.Success = true;
    row.Filling_Station = $('#station').val();
    row.Operate_Name = top.VMS.LP.user.User_Name;
    if (row.Filling_Station.length == 0) {
        data.Success = false;
        data.ErrorText = "加油站不能为空！";
        return data;
    }
    if (row.Filling_Station.length > 30) {
        data.Success = false;
        data.ErrorText = "加油站名称过长";
        return data;
    }
    return data;
}


//用户操作
var userOperation = {
    //查询
    search: function () {

        //var data = {};
        //data.CompanyOid = top.VMS.LP.user.Company_Oid;
        //AjaxToWebAPIGet(data, "FillingStation/GetOilStation", function (data) {
        //    $('#LoadModel').modal('hide');

        //    if (data.length != 0) {
        //        $("#savetocsv").removeAttr("disabled");
        //        $('#FillingStationtable').bootstrapTable("load", data);
        //    }
        //    else {

        //        $('#LoadModel').modal('hide');
        //        var opts = {
        //            title: "提示",
        //            content: "没有找到匹配的记录！"
        //        }
        //        $.AlertModel(opts);

        //    }

        //});
        $('#LoadModel').modal('hide');
    },
    //新增
    add: function (FillingStation) {

        AjaxToWebAPIPost(FillingStation.row, "FillingStation/AddOilStation", function (data) {
            //如果新建成功
            if (data.Success) {
                var opts = {
                    title: "提示",
                    content: "新建成功！"
                }
                $.AlertModel(opts);
                $("#showwin").modal("hide");

                //加载表格数据
                userOperation.search();
            }
                //如果修改失败
            else {

                failRequest(data);
            }
        });
    },
    //修改
    edit: function (FillingStation) {
        FillingStation.row.Filling_Station_Oid = commonData.editRowInfo.Filling_Station_Oid;
        AjaxToWebAPIPost(FillingStation.row, "FillingStation/UpdateOilStation", function (data) {
            //如果修改成功
            if (data.Success) {
                var opts = {
                    title: "提示",
                    content: "修改成功！"
                }
                $.AlertModel(opts);
                $("#showwin").modal("hide");

                //添加表格数据
                $('#FillingStationtable').bootstrapTable('updateRow', { index: commonData.editRow, row: FillingStation.row });
            }
                //如果修改失败
            else {
                failRequest(data);

            }
        });

    },
    deleteInfo: function (row) {
        //删除操作 
        var opts = {
            title: "提示",
            content: "确认执行删除操作吗？"
        }
        $.ConfirmAlert(opts, function () {

            var data = {};
            data.Filling_Station = row.Filling_Station;
            data.Filling_Station_Oid = row.Filling_Station_Oid;
            data.Operate_Name = top.VMS.LP.user.User_Name;
            data.Operate_Org = top.VMS.LP.user.Org_Code;
            // data.Operate_Org = "101";//parent.parent.I51EY.LPS.Data.User.Org_Code;
            AjaxToWebAPIPost(data, "FillingStation/DelOilStation", function (data) {
                if (data.Success) {
                    var opts = {
                        title: "提示",
                        content: "删除成功！"
                    }
                    $.AlertModel(opts);

                    $('#FillingStationtable').bootstrapTable('remove', {
                        field: 'Filling_Station_Oid',
                        values: [row.Filling_Station_Oid]
                    })
                }
                    //如果删除失败
                else {
                    failRequest(data);
                }
            });

        });
    }
};
