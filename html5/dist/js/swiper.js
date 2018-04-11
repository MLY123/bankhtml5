
function VicCode() {


    var u_Iphone = document.getElementById("u_Iphone").value;

    if((u_Iphone.length >0 )) {
        $.ajax({
            type: "POST",
            url: "https://api.thinkinfo.tech:8203/xhlc-front-app/wc_app/getcode",
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

                    Toast(data.msg,2000);
                }else {
                    Toast(data.msg,2000);
                }

            }
        })


    } else {
        Toast("手机号不能为空！",2000);


    }
}
function GetDaojishi() {
    var wait = 60;
    var btn = document.getElementById("btn");
    {
        if (wait == 0) {
            document.getElementById("btn").removeAttribute("disabled");
            document.getElementById("btn").value="获取验证码";
            btn.style.cssText = "font-size:4rem;border: none;outline: none;display:inline-block;background-color: transparent;color: #007AFF;width:340px;height: 10rem;"
            wait = 60;
        } else {
            document.getElementById("btn").setAttribute("disabled", true);


         var timer =  setInterval(function() {
if(document.getElementById("btn").value= wait + "s"){

    btn.style.cssText = "font-size:4rem;border: none;outline: none;display:inline-block;color: #888888;background-color: transparent;margin-left:240px;width:100px;height: 10rem;"
}


                    wait--;
                    if(wait<=0){
                        clearInterval(timer);
                        document.getElementById("btn").removeAttribute("disabled");
                        document.getElementById("btn").value="重新获取验证码";
                        btn.style.cssText = "font-size:4rem;border: none;outline: none;display:inline-block;background-color: transparent;color: #007AFF;width:340px;height: 10rem;"
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
//测试注册
function applyCard() {
    var u_Name = document.getElementById("u_Name").value;
    var u_CardId = document.getElementById("u_CardId").value;
    var u_Vcode = document.getElementById("u_Vcode").value;
    var u_Iphone = document.getElementById("u_Iphone").value;

    var regCode =/^\d{6}$/;
    var regPhone = /^1[3-9][0-9][\s\S]*$/;
    var regCard1 =/^\d{15}$/;
    var regCard2 =/^\d{18}$/;
    if(!regCard1.test(u_CardId) || !regCard2.test(u_CardId)){
        Toast("请输入正确的身份证号码",2000);
        return;
    }
    if(!regPhone.test(u_Iphone)){
        Toast("请输入正确的手机号",2000);
    }
    if(!regCode.test(u_Vcode)){
        Toast("请输入正确的验证码",2000);
    }
    if((u_Name.length <0) && (u_CardId.length <0) && (u_Iphone.length <0)&&(u_Vcode.length <0) ) {

        Toast("参数不能为空！",2000);
        return;

    }
    $.ajax({
        type: "POST",
        url: "https://api.thinkinfo.tech:8203/xhlc-front-app/wc_app/add_custinfo_applycard",
        data: {realName:u_Name, smsCode:u_Vcode,certNo:u_CardId, mobile: u_Iphone,wc_identification:"MDEsMywwMSwzODc5ZDJmYi1kNzI2LTRkMWEtOTc0NS1lMzdjMWZhYmNlZjMsb044SUwweFpLZkNyWjdwblFaRWc0ZU9XMkxkTSwxMTQxLDMsMS4wLDE1MjMyNjA3MDI4MTE="},
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