var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**Created by the LayaAirIDE*/
var view;
(function (view) {
    var login = (function (_super) {
        __extends(login, _super);
        function login() {
            var _this = _super.call(this) || this;
            _this.frameOnce(2, _this, _this.onDelayInit);
            _this.top = 0;
            _this.bottom = 0;
            _this.left = 0;
            _this.right = 0;
            return _this;
        }
        login.open = function () {
            if (login.sInstance == null) {
                var page = new login();
                login.sInstance = Laya.stage.addChild(page);
            }
            login.sInstance.visible = true;
        };
        login.close = function () {
            if (login.sInstance == null) {
                return;
            }
            var page = login.sInstance;
            login.sInstance = null;
            page.destroy();
        };
        login.prototype.onDelayInit = function () {
            this.loginBtn.on(Laya.Event.CLICK, this, this.onClickLogin);
            this.registBtn.on(Laya.Event.CLICK, this, this.onShowRegist);
            this.mangerBtn.on(Laya.Event.CLICK, this, this.onClickAdminLogin);
            this.backBtn.on(Laya.Event.CLICK, this, this.back2Login);
            this.registBtn2.on(Laya.Event.CLICK, this, this.onClickRegist);
            var scale = Math.min(screen.availWidth * window.devicePixelRatio / 750, screen.availHeight * window.devicePixelRatio / 1334);
            this.root.scaleX = scale;
            this.root.scaleY = scale;
            this.root.visible = true;
        };
        login.prototype.onClickLogin = function () {
            if (this.checkLoginInput() == false) {
                return;
            }
            AppMain.Instance.requestLogin(this, this.onLoginReturn, this.onReturnError, { account: this.login_account.text, password: this.login_pwd.text });
        };
        login.prototype.onClickRegist = function () {
            if (this.checkRegistInput() == false) {
                return;
            }
            AppMain.Instance.requestLogin(this, this.onLoginReturn, this.onReturnError, { account: this.login_account.text, password: this.login_pwd.text });
            view.main.show();
            login.close();
        };
        login.prototype.onClickAdminLogin = function () {
            if (this.checkLoginInput() == false) {
                return;
            }
            AppMain.Instance.requestAdminLogin(this, this.onAdminLoginReturn, this.onReturnError, { account: this.login_account.text, password: this.login_pwd.text });
        };
        login.prototype.onLoginReturn = function (data) {
            if (data == null) {
                return;
            }
            var result = JSON.parse(data);
            if (result.code != 0) {
                view.msgBox.openMsgBox(result.msg, null, "确定", null);
                return;
            }
            AppMain.userData = result.data;
            view.main.show();
            login.close();
        };
        login.prototype.onAdminLoginReturn = function (data) {
            if (data == null) {
                return;
            }
            var result = JSON.parse(data);
            if (result.code != 0) {
                view.msgBox.openMsgBox(result.msg, null, "确定", null);
                return;
            }
            AppMain.adminData = result.data;
            view.manageTask.show();
        };
        login.prototype.onReturnError = function (data) {
            view.msgBox.openMsgBox(data, null, "确定", null);
        };
        login.prototype.onShowRegist = function () {
            this.registView.visible = true;
            this.loginView.visible = false;
        };
        login.prototype.back2Login = function () {
            this.registView.visible = false;
            this.loginView.visible = true;
        };
        login.prototype.checkLoginInput = function () {
            return true;
        };
        login.prototype.checkRegistInput = function () {
            if (this.regist_pwd.text != this.confirm_pwd.text) {
                return false;
            }
            return true;
        };
        return login;
    }(ui.loginUI));
    login.sInstance = null;
    view.login = login;
})(view || (view = {}));
//# sourceMappingURL=login.js.map