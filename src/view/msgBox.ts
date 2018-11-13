/**Created by the LayaAirIDE*/
module view{
	export class msgBox extends ui.msgBoxUI{

		//private static msgBoxPool: msgBox[] = [];

		public static openMsgBox(msgContent: string, caller: any, confirmLabel: string, confirmCb: Function, data?:any) {
			var page = Laya.stage.addChild(new msgBox()) as msgBox;
			var args = [];
			for (var index = 0; index < arguments.length; index++) {
				var element = arguments[index];
				args.push(element);
			}
			page.frameOnce(2, page, page.initMsgBox, args);
		}

		public static openMsgBox2(msgContent: string, caller: any, confirmLabel: string, confirmCb: Function, cancelLab: string, cancelCb: Function, data?:any) {
			var page = Laya.stage.addChild(new msgBox()) as msgBox;
			var args = [];
			for (var index = 0; index < arguments.length; index++) {
				var element = arguments[index];
				args.push(element);
			}
			page.frameOnce(2, page, page.initMsgBox2, args);
		}

		private caller: any;
		private cancelCb: Function;
		private confirmCb: Function;
		private data: any;
		constructor(){
			super();
		}

		private initMsgBox(msgContent: string, caller: any, confirmLabel: string, confirmCb: Function, data?:any) {
			this.msg.text = msgContent;
			this.caller = caller;
			if (confirmLabel) {
				this.okBtn.label = confirmLabel;
			}
			this.confirmCb = confirmCb;
			this.okBtn.visible = true;
			this.confirmBtn.visible = false;
			this.cancelBtn.visible = false;
			this.okBtn.once(Laya.Event.CLICK, this, this.onClickOK);
			this.scaleX = AppMain.Instance.scale;
			this.scaleY = AppMain.Instance.scale;
			this.data = data;
		}

		private initMsgBox2(msgContent: string, caller: any, confirmLabel: string, confirmCb: Function, cancelLab: string, cancelCb: Function, data?:any) {
			this.msg.text = msgContent;
			this.caller = caller;
			if (confirmLabel) {
				this.confirmBtn.label = confirmLabel;
			}
			this.confirmCb = confirmCb;
			if (cancelLab) {
				this.cancelBtn.label = cancelLab;
			}
			this.cancelCb = cancelCb;
			this.okBtn.visible = false;
			this.confirmBtn.visible = true;
			this.cancelBtn.visible = true;
			this.confirmBtn.once(Laya.Event.CLICK, this, this.onClickConfirm);
			this.cancelBtn.once(Laya.Event.CLICK, this, this.onClickCancel);	
			this.scaleX = AppMain.Instance.scale;
			this.scaleY = AppMain.Instance.scale;	
			this.data = data;	
		}

		private onClickOK() {
			this.destroy();
			if (this.confirmCb) {
				this.confirmCb.call(this.caller, this.data);
			}
		}

		private onClickConfirm() {
			this.destroy();
			if (this.confirmCb) {
				this.confirmCb.call(this.caller, this.data);
			}
		}

		private onClickCancel() {
			this.destroy();
			if (this.cancelCb) {
				this.cancelCb.call(this.caller, this.data);
			}
		}
	}
}