/**Created by the LayaAirIDE*/
module view{
	export class achievement extends ui.achievementUI{

		private static sInstance: achievement = null;
		public static show() {
			if (achievement.sInstance == null) {
				achievement.sInstance = Laya.stage.addChild(new achievement()) as achievement;
			}
			achievement.sInstance.visible = true;
		}

		public static hide() {
			if (achievement.sInstance) {
				achievement.sInstance.visible = false;
			}
		}

		constructor(){
			super();
			this.frameOnce(2, this, this.onDelayInit);
		}

		private onDelayInit() {
			this.exit.on(Laya.Event.CLICK, this, this.onClickExit);
			this.all.on(Laya.Event.CLICK, this, this.showContent, [0]);
			this.achieved.on(Laya.Event.CLICK, this, this.showContent, [1]);
			this.unAchieved.on(Laya.Event.CLICK, this, this.showContent, [2]);
			this.list.renderHandler = new Handler(this, this.onListRender);
		}

		private onListRender(item: Laya.Box, index: number) {
			//自定义list的渲染方式
		}

		private onClickExit() {
			achievement.hide();
		}

		private selectedColor = "#ffffff";
		private unSelectedColor = "#004493";
		private selectedSkin = "smileStar/color_41daf8.png";
		private unSelectedSkin = "smileStar/color_d9d9d9.png";
		private showContent(contentType) {
			if (contentType == 0) {
				this.all.skin = this.selectedSkin;
				this.allLab.color = this.selectedColor;
			}
			else {
				this.all.skin = this.unSelectedSkin;
				this.allLab.color = this.unSelectedColor;
			}
			if (contentType == 1) {
				this.achieved.skin = this.selectedSkin;
				this.achievedLab.color = this.selectedColor;
			}
			else {
				this.achieved.skin = this.unSelectedSkin;
				this.achievedLab.color = this.unSelectedColor;
			}
			if (contentType == 2) {
				this.unAchieved.skin = this.selectedSkin;
				this.unAchievedLab.color = this.selectedColor;
			}
			else {
				this.unAchieved.skin = this.unSelectedSkin;
				this.unAchievedLab.color = this.unSelectedColor;
			}
		}
	}
}