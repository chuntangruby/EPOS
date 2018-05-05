
//验证
var Check = {
    //验证是否为空
    'IsNull': function (data) {
        return (data.length > 0);
    },
    //验证密码
    'Password': function (pwd) {
        if (/^[A-Za-z0-9]{6,16}$/g.test(pwd)) {
            return true;
        } else {
            return false;
        }
    },
    //验证两次密码是否相同
    'IsSamePwd': function (pwd1, pwd2) {
        if (pwd1 == pwd2) {
            return true;
        } else {
            return false;
        }
    },
    //验证手机号
    'Phone': function (data) {
        if (/^0?1[3|4|5|8|7][0-9]\d{8}$/.test(data)) {
            return true;
        } else {
            return false;
        }
    },
    //验证验证码
    'Captcha': function (data) {
        if (/^\d{4,6}$/g.test(data)) {
            return true;
        } else {
            return false;
        }
    },
    //判断是否为数字
    'IsNumber': function (data) {
        if (/^[0-9]*$/.test(data)) {
            return true;
        } else {
            return false;
        }
    },
    //判断小数或整数
    'IsNumberOrDecimal': function (data) {
        if (/^[0-9]*(\.[0-9]{1,2})?$/.test(data)) {
            return true;
        } else {
            return false;
        }
    },
    //验证中文
    'IsChinese': function (data) {
        if (/^[\u4e00-\u9fa5]{1,16}$/.test(data)) {
            return true;
        }
        else {
            return false;
        }
    },
    //验证银行卡
    'Credit': function (data) {
        if (/^(\d{16}|\d{19})$/.test(data)) {
            return true;
        }
        else {
            return false;
        }
    },
    //验证车牌号
    'VehicleNum': function (data) {
        if (/^[\u4E00-\u9FA5][\da-zA-Z]{6}$/.test(data)) {
            return true;
        }
        else {
            return false;
        }
    },
    //验证车辆识别代码
    'VehicleIDNum': function (data) {
        if (/^\d{17}$/.test(data)) {
            return true;
        }
        else {
            return false;
        }
    },
    //验证邮箱
    'Email': function (str) {
        if (/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(str)) {
            return true;
        } else {
            return false;
        }
    },
    //身份验证
    IdentityCodeValid: function (code) {
        var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
        var tip = "";
        var pass = true;

        if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
            tip = "身份证号格式错误";
            pass = false;
        }

        else if (!city[code.substr(0, 2)]) {
            tip = "地址编码错误";
            pass = false;
        }
        else {
            //18位身份证需要验证最后一位校验位
            if (code.length == 18) {
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++) {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if (parity[sum % 11] != code[17]) {
                    tip = "校验位错误";
                    pass = false;
                }
            }
        }
        return pass;
    }
}
function rTrim(str) {
    if (str == null)
        str = '';
    return str.replace(/^(\s|\xAO)+|(\s|\xAO)+$/g, '');
}