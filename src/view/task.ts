/**Created by the LayaAirIDE*/
module view{
	export class task extends ui.taskUI{

		private static sInstance: task = null;
		public static show(root?: laya.ui.Component) {
			if (task.sInstance == null) {
				if (root) {
					task.sInstance = root.addChild(new task()) as task;
				}
				else {
					task.sInstance = Laya.stage.addChild(new task()) as task;
				}
			}
			task.sInstance.visible = true;
		}

		public static hide() {
			if (task.sInstance != null) {
				task.sInstance.visible = false;
			}
		}

		constructor(){
			super();
			this.frameOnce(2, this, this.onDelayInit);
		}

		private pageIdx: number = 0;
		private pageSize: number = 20;
		private onDelayInit() {
			if (this.taskList.itemRender && this.taskList.itemRender.props) {
				this.taskList.itemRender.props.height *= AppMain.Instance.hScale;
			}	
			this.pageSize = this.taskList.height / this.taskList.itemRender.props.height;
			this.pageSize = Math.floor(this.pageSize);
			this.taskList.array = [];
			this.taskList.repeatX = 1;
			this.taskList.renderHandler = new Handler(this, this.onListRender);
			AppMain.Instance.requestTaskList(this, this.onListReturn, this.onListReturnError, {pageIdx:this.pageIdx, pageSize:this.pageSize, isActive:"1"});
		}

		private onListRender(item: Laya.Box, index: number) {
			//自定义list的渲染方式
			var awardDesc = item.getChildByName("awardDesc") as Laya.Label;
			var taskName = item.getChildByName("taskName") as Laya.Label;
			var chances = item.getChildByName("chances") as Laya.Label;
			var leftChance = item.getChildByName("leftChance") as Laya.Label;
			var publisDate = item.getChildByName("publisDate") as Laya.Label;
			var publisher = item.getChildByName("publisher") as Laya.Label;
			var taskDesc = item.getChildByName("taskDesc") as Laya.Label;
			var data = this.taskList.array[index] as data.taskData;
			taskName.text = data.name;
			awardDesc.text = data.awardVal.toString();
			chances.text = data.needPerson.toString();
			leftChance.text = (data.needPerson - data.curPerson).toString();
			publisDate.text = (new Date(data.date)).toDateString();
			publisher.text = data.publisher;
			taskDesc.text = data.desc;
			if (index == this.taskList.array.length - 1) {
				AppMain.Instance.requestTaskList(this, this.onListReturn, this.onListReturnError, {pageIdx:this.pageIdx, pageSize:this.pageSize, isActive:"1"});
			}
			item.on(Laya.Event.CLICK, this, this.onSelectedItem, [index]);
		}

		private onSelectedItem(index: number) {
			var data = this.taskList.array[index] as data.taskData;
			msgBox.openMsgBox2("确认领取任务：" + data.name + "?", this, null, this.onReceiveTask, null, null, data);
		}

		private onReceiveTask(data: data.taskData) {
			AppMain.Instance.requestRecieveTask(this, this.onReceiveReturn, this.onReceiveError, {uid:AppMain.userData.uid,taskId:data.id});
		}

		private onReceiveError(data: any) {
			msgBox.openMsgBox(data, null, null, null);
		}

		private onReceiveReturn(data: any) {
			if (data == null) {
				return ;
			}
			var result = JSON.parse(data);
			if (result.code != 0) {
				msgBox.openMsgBox(result.msg, null, null, null);
				return ;
			}
			msgBox.openMsgBox("任务[" + result.data.name + "]领取成功", null, null, null);
			for (var index = 0; index < this.taskList.array.length; index++) {
				var element = this.taskList.array[index] as data.taskData;
				if (element.id == result.data.id) {
					this.taskList.setItem(index, result.data);
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
				AppMain.awardDataList.push(element);
				this.taskList.addItem(element);
			}
		}

		private onListReturnError(data: any) {
			msgBox.openMsgBox(data, null, "确定", null);
		}
	}
}