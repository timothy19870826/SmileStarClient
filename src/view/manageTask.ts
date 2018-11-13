/**Created by the LayaAirIDE*/
module view{
	export class manageTask extends ui.manageTaskUI{
		
		private static sInstance: manageTask = null;
		public static show() {
			if (manageTask.sInstance == null) {
				manageTask.sInstance = Laya.stage.addChild(new manageTask()) as manageTask;
			}
			manageTask.sInstance.visible = true;
		}

		public static hide() {
			if (manageTask.sInstance) {
				manageTask.sInstance.visible = false;
			}
		}

		constructor(){
			super();
			this.frameOnce(2, this, this.onDelayInit);
		}

		private pageIdx: number = 0;
		private pageSize: number = 20;
		private onDelayInit() {
			if (this.publishLogs.itemRender && this.publishLogs.itemRender.props) {
				this.publishLogs.itemRender.props.height *= AppMain.Instance.hScale;
			}	
			this.pageSize = this.publishLogs.height / this.publishLogs.itemRender.props.height;
			this.pageSize = Math.floor(this.pageSize);

			this.exit.on(Laya.Event.CLICK, this, this.onClickExit);
			this.publishBtn.once(Laya.Event.CLICK, this, this.onClickPublish);
			this.mngGoods.on(Laya.Event.CLICK, this, this.onToMngGoods);
			this.publishLogs.array = [];
			this.publishLogs.renderHandler = new Handler(this, this.onListRender);
			AppMain.Instance.requestTaskList(
				this, this.onListReturn, this.onListReturnError, {pageIdx:this.pageIdx, pageSize:this.pageSize, isActive:"0"});
		}

		private onListRender(item: Laya.Box, index: number) {
			//自定义list的渲染方式
			var log = item as Laya.Label;
			var data = this.publishLogs.array[index] as data.taskData;
			var state = data.state == 1 ? "进行中" : "已结束";
			log.text = (new Date(data.date)).toDateString() + "  " + data.publisher + "发布了任务 " + data.name + "[" + state + "]"; 
			if (index == this.publishLogs.array.length - 1) {
				console.log("request next page");
				AppMain.Instance.requestTaskList(
					this, this.onListReturn, this.onListReturnError, {pageIdx:this.pageIdx, pageSize:this.pageSize, isActive:"0"});
			}
			log.on(Laya.Event.CLICK, this, this.onEditTask, [data]);
		}

		private onEditTask(data: data.taskData) {
			if (data.state == 1) {
				msgBox.openMsgBox2("是否结束任务", this, null, this.onCloseTask, null, null, data);
			}
		}

		private onCloseTask(data: data.taskData) {
			AppMain.Instance.requestCloseTask(this, this.onCloseTaskReturn, this.onError, {taskId:data.id});
		}

		private onCloseTaskReturn(data: any) {
			if (data == null) {
				return ;
			}
			var result = JSON.parse(data);
			if (result.code != 0) {
				msgBox.openMsgBox(result.msg, null, "确定", null);
				return ;
			}
			for (var index = 0; index < this.publishLogs.array.length; index++) {
				var element = this.publishLogs.array[index] as data.taskData;
				if (element.id == result.data.id) {
					this.publishLogs.setItem(index, result.data);
					return ;
				}
			}
		}

		private onListReturn(data: any) {
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
			this.pageIdx++;
			for (var index = 0; index < result.data.length; index++) {
				var element = result.data[index];
				this.publishLogs.addItem(element);
			}
		}

		private onListReturnError(data: any) {
			msgBox.openMsgBox(data, null, "确定", null);
		}

		private onClickPublish() {
			AppMain.Instance.publishTask(this, this.onReturn, this.onError,
			 {
				 name:this.title.text,
				 expire:this.expire.text,
				 desc:this.desc.text,
				 needPerson:this.needPerson.text,
				 awardVal:this.award.text,
				 publisher:AppMain.adminData.desc
			});
		}

		private onReturn(data: any) {
			this.publishBtn.once(Laya.Event.CLICK, this, this.onClickPublish);
			if (data == null) {
				return ;
			}
			var result = JSON.parse(data);
			if (result.code != 0) {
				msgBox.openMsgBox(result.msg, null, "确定", null);
				return ;
			}
		}

		private onError(data: any) {
			this.publishBtn.once(Laya.Event.CLICK, this, this.onClickPublish);
			msgBox.openMsgBox(data, null, "确定", null);
		}

		private onToMngGoods() {
			manageTask.hide();
			manageAward.show();
		}

		private onClickExit() {
			manageTask.hide();
		}
	}
}