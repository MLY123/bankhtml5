
function VicCode() {
    var regPhone = /^1[3-9][0-9][\s\S]*$/;
    var u_Iphone = document.getElementById("u_Iphone").value;

    if(u_Iphone.length <= 0){
        Toast("手机号不能为空！",2000);
        return false;
    }
    if(u_Iphone.length != 11){
        Toast("请输入正确的手机号码！",2000);
        return false;
    }
    if(u_Iphone.length == 11  ) {
        if(!regPhone.test(u_Iphone)){
            Toast("请输入正确的手机号码！",2000);
            return false;
        }

    }

        $.ajax({
            type: "POST",
            url: "https://api.thinkinfo.tech:8203/xhlc-front-app/record/mobile_code",
            data: {mobile: u_Iphone},
            dataType: "json",
            timeout: 15000,

            beforeSend: function () {
                $("#indexTotal").hide();
                $(".qunIn").css("display", "none");
                $("#admin-detail").css("display", "none");
                $("#showMes").show();
            },
            complete: function () {
                $("#indexTotal").show();
                $("#showMes").hide();

            },
            success: function (data) {

                if(data.status == 200){
                    GetDaojishi();

                    Toast('验证码获取成功',2000);
                }
                if(data.status == 201){
                    Toast(data.msg,2000);
                }
                if(data.status == 202){
                    Toast(data.msg,2000);
                }

            }
        })


}
function GetDaojishi() {
    var wait = 120;
    var btn = document.getElementById("btn");
    {
        if (wait == 0) {
            document.getElementById("btn").removeAttribute("disabled");
            document.getElementById("btn").value="获取验证码";
            btn.style.cssText = "font-size:4rem;border: none;outline: none;display:inline-block;background-color: transparent;color: #007AFF;width:340px;height: 10rem;"
            wait = 120;
        } else {
            document.getElementById("btn").setAttribute("disabled", true);


         var timer =  setInterval(function() {
if(document.getElementById("btn").value= wait + "s"){

    btn.style.cssText = "font-size:4rem;border: none;outline: none;display:inline-block;color: #bbbbbb;background-color: transparent;float: right;margin-right: 60px;width:100px;height: 10rem;"
}


                    wait--;
                    if(wait<=0){
                        clearInterval(timer);
                        document.getElementById("btn").removeAttribute("disabled");
                        document.getElementById("btn").value="获取验证码";
                        btn.style.cssText = "font-size:4rem;border: none;outline: none;display:inline-block;background-color: transparent;color: #1caaf0;width:340px;height: 10rem;"
                    }
                },
                1000)
        }
        return wait;

    }
}
function Toast(msg,duration){
    duration=isNaN(duration)?3000:duration;
    var m = document.createElement('div');
    m.innerHTML = msg;
    m.style.cssText="width: 60%;min-width: 10rem; display: inline-block;opacity: 0.7;height: 10rem;color: rgb(255, 255, 255);line-height: 10rem;text-align: center;border-radius: 2rem;position: fixed;top: 40%;left: 20%;z-index: 999999;background: rgb(0, 0, 0);font-size: 4rem;";
    document.body.appendChild(m);
    setTimeout(function() {
        var d = 0.5;
        m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        m.style.opacity = '0';
        setTimeout(function() { document.body.removeChild(m) }, d * 1000);
    }, duration);
}
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
function GetQueryString1(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
//测试注册
function applyCard() {
    if(!flag){
        return false;
    }

    var u_Name = document.getElementById("u_Name").value;
    var u_CardId = document.getElementById("u_CardId").value;
    var u_Vcode = document.getElementById("u_Vcode").value;
    var u_Iphone = document.getElementById("u_Iphone").value;

    var regCode =/^\d{6}$/;

    var regCard1 =/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
    var regCard2 =/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    if((u_CardId.length === 15)){
        if(!(regCard1.test(u_CardId))){
            Toast("请输入正确的身份证号码",2000);
            return false;
        }

    }
    if (( u_CardId.length === 18) ){
        // alert(regCard2.test(u_CardId))
        if(!(regCard2.test(u_CardId))){
            Toast("请输入正确的身份证号码",2000);
            return false;
        }

    }
    if(u_CardId.length != 15 && u_CardId.length !=18){
        Toast("请输入正确的身份证号码",2000);
        return false;
    }
    if(!regPhone.test(u_Iphone)){
        Toast("请输入正确的手机号",2000);
        return false;
    }
    if(!(u_Vcode.length === 6)){
        Toast("请输入正确的验证码",2000);
        return false;
    }
    if((u_Name.length <0)) {

        Toast("姓名不能为空！",2000);
        return false;

    }
 alert(GetQueryString1("preduct"))
    $.ajax({
        type: "POST",
        url: "https://api.thinkinfo.tech:8203/xhlc-front-app/wc_app/add_custinfo_applycard",
        data: {name:u_Name, code:u_Vcode,idNo:u_CardId, mobile:u_Iphone,product:GetQueryString1("preduct")},
        dataType: "json",
        timeout: 15000,

        beforeSend: function () {
            $("#indexTotal").hide();
            $(".qunIn").css("display", "none");
            $("#admin-detail").css("display", "none");
            $("#showMes").show();
        },
        complete: function () {
            $("#indexTotal").show();
            $("#showMes").hide();

        },
        success: function (data) {

            if(data.status == 200){

                window.location.href=GetQueryString("key");
                // alert(data.msg)
            }else {
                 Toast(data.msg,2000);

            }

        }
    })

}