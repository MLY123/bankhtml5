
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

                    alert('验证码获取成功')
                }else {
                    alert(data.msg)
                }

            }
        })


    } else {
        alert("手机号不能为空！");

    }
}
function GetDaojishi() {
    var wait = 60;

    {
        if (wait == 0) {
            document.getElementById("btn").removeAttribute("disabled");
            document.getElementById("btn").value="免费获取验证码";
            wait = 60;
        } else {
            document.getElementById("btn").setAttribute("disabled", true);


         var timer =  setInterval(function() {

                    document.getElementById("btn").value= wait + "s";
                    wait--;
                    if(wait<=0){
                        clearInterval(timer);
                        document.getElementById("btn").removeAttribute("disabled");
                        document.getElementById("btn").value="重新获取验证码";
                    }
                },
                1000)
        }
        return wait;

    }
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
    var reg =/^\d{6}$/;
    if((u_Name.length >0) && (u_CardId.length >0) && (u_Iphone.length >0)&&(u_Vcode.length >0) ) {



    } else {

        alert("参数不能为空！");

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
                alert(data.msg)
            }

        }
    })
}