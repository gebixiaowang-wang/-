$(function() {
    // 点击登录按钮 发送请求
    $('.login .layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: 'http://ajax.frontend.itheima.net/api/login',
            data: {
                username: $('.login [name=username]').val(),
                password: $('.login [name=pwd]').val()
            },
            success: function(res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg('登陆失败')
                }
                // 会返回身份验证的令牌 储存到本地中 方便访问接口
                localStorage.setItem('token', res.token)
                    // window.location.reload('index.html')
            }
        })
    })

    // 点击注册发送请求
    $('.reg .layui-form').on('submit', function(e) {
            e.preventDefault()
            let data = {
                username: $('.reg [name=username]').val(),
                password: $('.reg [name=pwd]').val()
            }
            $.ajax({
                type: 'post',
                url: 'http://ajax.frontend.itheima.net/api/reguser',
                data: data,
                success: function(res) {
                    console.log(res);
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('注册成功,两秒后切换到登录页')
                    let timer = setTimeout(function() {
                        console.log(1);
                        $('.reg a').click()
                    }, 2000)

                }
            })
        })
        // 从layui里获取弹出层
    var layer = layui.layer;
    // console.log(layer);

    // 自己创建正则表达式
    // 从 layui 中获取 form 对象
    var form = layui.form;


    form.verify({
            pwd: [/^[\S]{6,12}$/, '密码必须6-12位,不能包含空格'],
            us: [/^[\S][^0-9]{2,6}$/, '用户名2-6位,不能包含空格和数字'],
            repwd: function(value) {
                if (value != $('.reg [name=pwd]').val()) {
                    return '两次输入密码不一致'
                }
            }
        })
        // 点击去注册显示注册框
    $('.login a').on('click', function() {
            $('.login').hide();
            $('.reg').show()
        })
        // 点击登录显示登录框
    $('.reg a').on('click', function() {
        $('.reg').hide();
        $('.login').show()
    })
})