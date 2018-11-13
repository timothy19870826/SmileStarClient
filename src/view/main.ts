/**Created by the LayaAirIDE*/
module view{
	export class main extends ui.mainPageUI{

		private static sInstance: main = null;
		/**
		 * static show
		 */
		public static show() {
			if (main.sInstance == null) {
				main.sInstance = Laya.stage.addChild(new main()) as main;
			}
			main.sInstance.visible = true;
		}

		constructor(){
			super();
			this.top = 0;
			this.bottom = 0;
			this.left = 0;
			this.right = 0;
			this.frameOnce(2, this, this.onDelayInit);
		}

		private onDelayInit() {
			this.container.on("showContent", this, this.onShowContent);
			this.mailBtn.on(Laya.Event.CLICK, this, this.onShowContent, [0]);
			this.taskBtn.on(Laya.Event.CLICK, this, this.onShowContent, [1]);
			this.profileBtn.on(Laya.Event.CLICK, this, this.onShowContent, [2]);
			this.onShowContent(0);
		}

		private onShowContent(contentType) {
			switch (contentType) {
				case 0:
					mall.show(this.container);
					task.hide();
					profile.hide();
					break;
				case 1:
					mall.hide();
					task.show(this.container);
					profile.hide();
					break;
				case 2:
					mall.hide();
					task.hide();
					profile.show(this.container);
					break;
			}
		}
	}
}