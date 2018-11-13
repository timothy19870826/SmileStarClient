/**Created by the LayaAirIDE*/
module view{
	export class login extends ui.loginUI{

		private static sInstance: login = null;
		public static open() {
			if (login.sInstance == null) {
				var page = new login();
				login.sInstance = Laya.stage.addChild(page) as login;
			}
			login.sInstance.visible = true;
		}

		public static close() {
			if (login.sInstance == null) {
				return ;
			}
			var page = login.sInstance;
			login.sInstance = null;
			page.destroy();
		}

		constructor(){
			super();
			this.frameOnce(2, this, this.onDelayInit);
			this.top = 0;
			this.bottom = 0;
			this.left = 0;
			this.right = 0;
		}

		private onDelayInit() {
			this.loginBtn.on(Laya.Event.CLICK, this, this.onClickLogin);
			this.registBtn.on(Laya.Event.CLICK, this, this.onShowRegist);
			this.mangerBtn.on(Laya.Event.CLICK, this, this.onClickAdminLogin);
			this.backBtn.on(Laya.Event.CLICK, this, this.back2Login);
			this.registBtn2.on(Laya.Event.CLICK, this, this.onClickRegist);
			var scale = Math.min(screen.availWidth * window.devicePixelRatio / 750, screen.availHeight * window.devicePixelRatio / 1334);
			this.root.scaleX = scale;
			this.root.scaleY = scale;
			this.root.visible = true;
		}

		private onClickLogin() {
			if (this.checkLoginInput() == false) {
				return ;
			}
			AppMain.Instance.requestLogin(
				this, this.onLoginReturn, this.onReturnError, 
				{account:this.login_account.text, password:this.login_pwd.text});
		}

		private onClickRegist() {
			if (this.checkRegistInput() == false) {
				return ;
			}
			AppMain.Instance.requestLogin(
				this, this.onLoginReturn, this.onReturnError, 
				{account:this.login_account.text, password:this.login_pwd.text});
			main.show();
			login.close();
		}

		private onClickAdminLogin() {
			if (this.checkLoginInput() == false) {
				return ;
			}
			AppMain.Instance.requestAdminLogin(
				this, this.onAdminLoginReturn, this.onReturnError, 
				{account:this.login_account.text, password:this.login_pwd.text});
		}

		private onLoginReturn(data: any) {
			if (data == null) {
				return;
			}
			var result = JSON.parse(data);
			if (result.code != 0) {
				msgBox.openMsgBox(result.msg, null, "确定", null);
				return;
			}
			AppMain.userData = result.data;
			main.show();
			login.close();
		}

		private onAdminLoginReturn(data: any) {
			if (data == null) {
				return;
			}
			var result = JSON.parse(data);
			if (result.code != 0) {
				msgBox.openMsgBox(result.msg, null, "确定", null);
				return;
			}
			AppMain.adminData = result.data;
			manageTask.show();
		}

		private onReturnError(data: any) {
			msgBox.openMsgBox(data, null, "确定", null);
		}

		private onShowRegist() {
			this.registView.visible = true;
			this.loginView.visible = false;
		}

		private back2Login() {
			this.registView.visible = false;
			this.loginView.visible = true;
		}

		private checkLoginInput() {
			return true;
		}

		private checkRegistInput() {
			if (this.regist_pwd.text != this.confirm_pwd.text) {
				return false;
			}
			return true;
		}
	}
}