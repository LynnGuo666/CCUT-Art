// ==UserScript==
// @name         长春工业大学校级认证美化脚本
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  美化长春工业大学统一身份认证登录页面,实现苹果风格
// @author       Lynn
// @match        https://tysfrz.ccut.edu.cn/portal/login.html*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        /* 移除原有背景 */
        #bodyBox, #bodyPage, .bg {
            display: none !important;
        }

        /* 屏蔽企业微信登录提示 */
        #wwopen\\.ssoPage_\\$ > div > div > div.title {
            display: none !important;
        }

        /* 设置新背景 */
        body {
            background: url(https://tysfrz.ccut.edu.cn/portal/image/showImage/loginSlide/1) center/cover fixed no-repeat !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
            margin: 0;
            min-height: 100vh;
        }

        /* CCUT Logo */
        .pku-logo {
            position: fixed !important;
            top: 20px !important;
            left: 20px !important;
            width: 200px !important;
            height: auto !important;
            z-index: 1000 !important;
        }

        /* 隐藏不需要的元素 */
        .logo, .foot {
            display: none !important;
        }

        /* 登录框容器 */
        .content {
            width: 400px !important;
            margin: 0 auto !important;
            position: relative !important;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        /* 登录框主体 */
        .login {
            background: rgba(255, 255, 255, 0.7) !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
            border-radius: 18px !important;
            border: 1px solid rgba(255, 255, 255, 0.18) !important;
            padding: 40px !important;
            width: 400px !important;
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37) !important;
            transition: all 0.5s ease !important;
            min-height: 400px !important;
            box-sizing: border-box !important;
            position: relative !important;
        }

        .login > img {
            display: none !important;
        }

        /* 登录标题 */
        .loginTitle {
            text-align: center !important;
            margin-bottom: 30px !important;
        }

        .loginTitle span {
            font-size: 24px !important;
            font-weight: 500 !important;
            color: #1d1d1f !important;
        }

        /* 输入框组 */
        .inputGroup {
            margin-bottom: 20px !important;
            position: relative !important;
        }

        .form-control {
            width: 100% !important;
            height: 46px !important;
            padding: 10px 15px 10px 40px !important;
            border-radius: 10px !important;
            border: 1px solid rgba(0, 0, 0, 0.1) !important;
            background: rgba(255, 255, 255, 0.9) !important;
            font-size: 16px !important;
            box-sizing: border-box !important;
        }

        .inputGroup img {
            position: absolute !important;
            left: 12px !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            opacity: 0.5 !important;
        }

        /* 验证码区域 */
        .inputGroup.clearfix {
            height: 46px !important;
            margin-bottom: 20px !important;
        }

/* 验证码区域调整 */
.layui-col-xs7 {
    height: 46px !important;
    position: relative !important;
    width: 65% !important; /* 增加宽度 */
    float: left !important;
    margin-right: 10px !important; /* 添加右边距 */
}

.layui-col-xs5 {
    height: 46px !important;
    width: 30% !important; /* 减少宽度 */
    float: right !important;
    margin-left: 0 !important; /* 移除左边距 */
}

        #captcha {
            width: 100% !important;
            height: 46px !important;
            padding: 10px 15px 10px 40px !important;
            border-radius: 10px !important;
            border: 1px solid rgba(0, 0, 0, 0.1) !important;
            background: rgba(255, 255, 255, 0.9) !important;
            font-size: 16px !important;
            box-sizing: border-box !important;
        }

        .inputGroup img[src*="icon_verificationcode.png"] {
            position: absolute !important;
            left: 12px !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            opacity: 0.5 !important;
            z-index: 1 !important;
        }

        #imageBase {
            width: 100% !important;
            height: 46px !important;
            border-radius: 10px !important;
            cursor: pointer !important;
            object-fit: cover !important;
            border: 1px solid rgba(0, 0, 0, 0.1) !important;
            background: rgba(255, 255, 255, 0.9) !important;
        }

        .layui-col-xs5 > div {
            margin-left: 10px !important;
            height: 100% !important;
        }

        /* 登录按钮 */
        .submit {
            width: 100% !important;
            height: 46px !important;
            background: #0071e3 !important;
            color: white !important;
            border: none !important;
            border-radius: 10px !important;
            font-size: 16px !important;
            font-weight: 500 !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            margin-bottom: 20px !important;
        }

        .submit:hover {
            background: #0077ED !important;
            transform: translateY(-2px) !important;
        }

        /* 底部链接 */
        .checkbox {
            display: none !important;
        }

        .forgot {
            color: #0071e3 !important;
            text-decoration: none !important;
            font-size: 14px !important;
        }

        .forgot:hover {
            text-decoration: underline !important;
        }

        /* 扫码登录区域 */
        .codeLogin {
            text-align: center !important;
            padding: 20px 0 !important;
        }

        #qacode {
            display: inline-block !important;
            margin: 0 auto !important;
            background: transparent !important;
        }

        #qacode iframe {
            border: none !important;
            background: transparent !important;
        }

        .scan-tip {
            margin: 15px 0 !important;
            color: #1d1d1f !important;
            font-size: 14px !important;
        }

        .back-to-password {
            color: #0071e3 !important;
            cursor: pointer !important;
            font-size: 14px !important;
            margin-top: 15px !important;
            display: inline-block !important;
        }

        .back-to-password:hover {
            text-decoration: underline !important;
        }

        /* 扫码登录按钮 */
        .loginFoot {
            position: relative !important;
            margin-top: 40px !important;
            text-align: center !important;
            background: transparent !important;
        }

        .loginFoot ul {
            margin: 0 !important;
            padding: 0 !important;
            list-style: none !important;
            display: flex !important;
            justify-content: center !important;
        }

        .loginFoot ul li {
            list-style: none !important;
        }

        .loginFoot ul li span {
            color: #0071e3 !important;
            cursor: pointer !important;
            font-size: 14px !important;
            text-decoration: none !important;
            transition: all 0.3s ease !important;
            background: transparent !important;
        }
        
        
        .loginFoot > ul > li:last-child {
            margin: 0;
        }

        .loginFoot ul li span:hover {
            text-decoration: underline !important;
            opacity: 0.8 !important;
        }

        /* 清除浮动 */
        .clearfix::after {
            content: '' !important;
            display: table !important;
            clear: both !important;
        }

        /* 屏蔽忘记密码等选项 */
        body > div.content > div.login > div.positionContent > div.loginContent > div.ipLogin > div.checkbox {
            display: none !important;
        }
    `;

    document.head.appendChild(style);

    // 添加CCUT Logo
    const ccutLogo = document.createElement('img');
    ccutLogo.src = 'https://www.ccut.edu.cn/images/logo.png';
    ccutLogo.className = 'pku-logo';
    document.body.appendChild(ccutLogo);

    // 监听DOM变化，处理动态加载的元素
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach((node) => {
                    // 处理扫码登录区域
                    if (node.classList && node.classList.contains('codeLogin')) {
                        const scanTip = document.createElement('div');
                        scanTip.className = 'scan-tip';
                        scanTip.textContent = '请使用企业微信扫描二维码登录';
                        node.appendChild(scanTip);

                        const backButton = document.createElement('div');
                        backButton.className = 'back-to-password';
                        backButton.textContent = '返回密码登录';
                        backButton.onclick = () => {
                            document.querySelector('.loginContent').style.display = 'block';
                            document.querySelector('.codeLogin').style.display = 'none';
                            document.querySelector('.loginFoot').style.display = 'block';
                        };
                        node.appendChild(backButton);
                    }
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // 优化原有的登录切换函数
    const originalLoginModeQacode = window.loginModeQacode;
    window.loginModeQacode = function (loginType, isSecondAuth) {
        if (typeof originalLoginModeQacode === 'function') {
            originalLoginModeQacode(loginType, isSecondAuth);
        }

        document.querySelector('.loginContent').style.display = 'none';
        document.querySelector('.codeLogin').style.display = 'block';
        document.querySelector('.loginFoot').style.display = 'none';
    };

    // 初始化页面元素
    function initializeUI() {
        // 移除原有背景
        const bodyBox = document.getElementById('bodyBox');
        if (bodyBox) {
            bodyBox.style.display = 'none';
        }

        // 优化验证码输入框
        const captchaInput = document.getElementById('captcha');
        if (captchaInput) {
            captchaInput.style.paddingLeft = '40px';
        }

        // 添加clearfix类
        const inputGroups = document.querySelectorAll('.inputGroup');
        inputGroups.forEach(group => {
            group.classList.add('clearfix');
        });
    }

    // 页面加载完成后初始化UI
    window.addEventListener('load', initializeUI);
})();