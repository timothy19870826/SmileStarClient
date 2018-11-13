/**
* name 
*/
module view{
	export class profile extends ui.profileUI{

		private static sInstance: profile = null;
		public static show(root?: laya.ui.Component) {
			if (profile.sInstance == null) {
				if (root) {
					profile.sInstance = root.addChild(new profile()) as profile;
				}
				else {
					profile.sInstance = Laya.stage.addChild(new profile()) as profile;
				}
			}
			profile.sInstance.visible = true;
		}

		public static hide() {
			if (profile.sInstance != null) {
				profile.sInstance.visible = false;
			}
		}

		constructor(){
			super();
			this.frameOnce(2, this, this.onDelayInit);
		}

		private taskLogPageIdx: number = 0;
		private taskLogPageSize: number = 20;
		private moneyLogPageIdx: number = 0;
		private moneyLogPageSize: number = 20;
		private onDelayInit() {

			this.info.scaleX = AppMain.Instance.scale;
			this.info.scaleY = AppMain.Instance.scale;

			this.title.text = AppMain.userData.title;
			this.money.text = (AppMain.userData.capitalWeibi * 0.01).toString();

			if (this.taskLog.itemRender && this.taskLog.itemRender.props) {
				this.taskLog.itemRender.props.height *= AppMain.Instance.hScale;
			}	
			this.taskLogPageSize = this.taskLog.height / this.taskLog.itemRender.props.height;
			this.taskLogPageSize = Math.floor(this.taskLogPageSize);
			if (this.moneyLog.itemRender && this.moneyLog.itemRender.props) {
				this.moneyLog.itemRender.props.height *= AppMain.Instance.hScale;
			}	
			this.moneyLogPageSize = this.moneyLog.height / this.moneyLog.itemRender.props.height;
			this.moneyLogPageSize = Math.floor(this.moneyLogPageSize);
			this.info.scaleX = AppMain.Instance.scale;
			this.info.scaleY = AppMain.Instance.scale;
			this.gotoMall.on(Laya.Event.CLICK, this, this.showMall);
			this.toAchievements.on(Laya.Event.CLICK, this, this.showAchievement);
			this.secretBtn.on(Laya.Event.CLICK, this, this.showManager);
			this.taskLog.array = [];
			this.taskLog.renderHandler = new Handler(this, this.onTaskLogRender);
			this.moneyLog.array = [];
			this.moneyLog.renderHandler = new Handler(this, this.onMoneyLogRender);
			AppMain.Instance.requestMoneyLog(this, this.onMoneyLogReturn, this.onReturnError, 
				{pageIdx:this.moneyLogPageIdx, pageSize:this.moneyLogPageSize, uid:AppMain.userData.uid});
			AppMain.Instance.requestTaskLog(this, this.onTaskLogReturn, this.onReturnError, 
				{pageIdx:this.taskLogPageIdx, pageSize:this.taskLogPageSize, uid:AppMain.userData.uid});
		}

		private onTaskLogRender(item: Laya.Box, index: number) {
			//自定义list的渲染方式
			var log = item as Laya.Label;
			var data = this.taskLog.array[index] as data.userTaskLog;
			log.text = data.name + (data.state == 2 ? "已完成" : "进行中");
			if (index == this.taskLog.array.length - 1) {				
				AppMain.Instance.requestTaskLog(this, this.onTaskLogReturn, this.onReturnError, 
					{pageIdx:this.taskLogPageIdx, pageSize:this.taskLogPageSize, uid:AppMain.userData.uid});
			}
		}

		private onMoneyLogRender(item: Laya.Box, index: number) {
			//自定义list的渲染方式
			var log = item as Laya.Label;
			var data = this.moneyLog.array[index] as data.userMoneyLog;
			if (data.income > 0) {
				log.text = "+" + data.income * 0.01 + " " + data.desc + " " + (new Date(data.date)).toDateString() + " 剩余：" + data.surplusFund * 0.01;
			}
			else {
				log.text = "-" + data.expenditure * 0.01 + " " + data.desc + " " + (new Date(data.date)).toDateString() + " 剩余：" + data.surplusFund * 0.01;
			}
			if (index == this.moneyLog.array.length - 1) {
				AppMain.Instance.requestMoneyLog(this, this.onMoneyLogReturn, this.onReturnError, 
					{pageIdx:this.moneyLogPageIdx, pageSize:this.moneyLogPageSize, uid:AppMain.userData.uid});
			}
		}

		private onMoneyLogReturn(data: any) {
			if (data == null) {
				return ;
			}
			var result = JSON.parse(data);
			if (result.code != 0) {
				msgBox.openMsgBox(result.msg, null, "确定", null);
				return ;
			}
			if (result.data == null || result.data.length == 0) {
				return ;
			}
			this.moneyLogPageIdx++;
			for (var index = 0; index < result.data.length; index++) {
				var element = result.data[index];
				AppMain.awardDataList.push(element);
				this.moneyLog.addItem(element);
			}
		}

		private onTaskLogReturn(data: any) {
			if (data == null) {
				return ;
			}
			var result = JSON.parse(data);
			if (result.code != 0) {
				msgBox.openMsgBox(result.message, null, "确定", null);
				return ;
			}
			if (result.data == null || result.data.length == 0) {
				return ;
			}
			this.taskLogPageIdx++;
			for (var index = 0; index < result.data.length; index++) {
				var element = result.data[index];
				AppMain.awardDataList.push(element);
				this.taskLog.addItem(element);
			}
		}

		private onReturnError(data: any) {
			msgBox.openMsgBox(data, null, "确定", null);
		}

		private showMall() {
			this.parent.event("showContent", 0);
		}

		private showAchievement() {
			achievement.show();
		}

		private showManager() {
			
		}
	}
}