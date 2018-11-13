/**
* name 
*/
module view{
	export class manageAward extends ui.manageAwardUI{

		private static sInstance: manageAward = null;
		public static show() {
			if (manageAward.sInstance == null) {
				manageAward.sInstance = Laya.stage.addChild(new manageAward()) as manageAward;
			}
			manageAward.sInstance.visible = true;
		}

		public static hide() {
			if (manageAward.sInstance) {
				manageAward.sInstance.visible = false;
			}
		}

		constructor(){
			super();
			this.frameOnce(2, this, this.onDelayInit);
		}

		private awardImage: any;
		private uploadBtn:any;
		private fileReader:any;
		private pageIdx: number = 0;
		private pageSize: number = 20;
		private onDelayInit() {

			this.uploadBtn = Laya.Browser.document.createElement("input");
			this.freshUploadBtn();
			this.uploadBtn.type ="file";//设置类型是file类型。
			this.uploadBtn.multiple = "multiple";
			this.uploadBtn.accept="image/png,image/jpg";//设置文件的格式为png；
			this.uploadBtn.style.position ="absolute";
			this.uploadBtn.style.zIndex = 999;
			Laya.Browser.document.body.appendChild(this.uploadBtn);//添加到页面；
			this.fileReader = new  Laya.Browser.window.FileReader();
			var self = this;
			this.uploadBtn.onchange = function(e:any):void
			{
				console.log("this.uploadBtn.onchange:" + self.uploadBtn.files.length);
				if(self.uploadBtn.files.length>0)
				{
					self.fileReader.readAsDataURL(self.uploadBtn.files[0]);
				}
			};
			this.fileReader.onload = function(evt):void
			{  
				console.log("this.fileReader.onload:" + (Laya.Browser.window.FileReader.DONE == self.fileReader.readyState));
				if(Laya.Browser.window.FileReader.DONE == self.fileReader.readyState)
				{
					self.awardImage = self.uploadBtn.files[0];
					self.selectedImg.loadImage(self.fileReader.result,0,0,self.selectedImg.width,self.selectedImg.height);
				}
			};

			this.exit.on(Laya.Event.CLICK, this, this.onClickExit);
			this.publishBtn.once(Laya.Event.CLICK, this, this.onClickPublish);
			this.mngTask.on(Laya.Event.CLICK, this, this.onToMngTask);
			this.goodsList.array = [];
			this.goodsList.renderHandler = new Handler(this, this.onListRender);
			AppMain.Instance.requestGoodsList(this, this.onListReturn, this.onReturnError, {pageIdx:this.pageIdx, pageSize:this.pageSize});
		}

		private onListRender(item: Laya.Box, index: number) {
			//自定义list的渲染方式
			var image = item.getChildByName("img") as Laya.Image;
			var name = item.getChildByName("name") as Laya.Label;
			var btn = item.getChildByName("deleteBtn") as Laya.Button;
			var data = this.goodsList.array[index] as data.awardData;
			image.graphics.clear();
			if (data.imgUrl) {
				image.loadImage(data.imgUrl, 0, 0, image.width, image.height);
			}
			name.text = data.name;
			btn.on(Laya.Event.CLICK, this, this.deleteAward, [data]);
			if (index == this.goodsList.array.length - 1) {
				AppMain.Instance.requestGoodsList(
					this, this.onListReturn, this.onReturnError, {pageIdx:this.pageIdx, pageSize:this.pageSize});
			}
		}

		private waiting: boolean = false;
		private deleteAward(awardData: data.awardData) {
			if (this.waiting) {
				return ;
			}
			this.waiting = true;
			console.log("delete:" + awardData.name);
			AppMain.Instance.requestDeleteAward(this, this.onDeleteReturn, this.onDeleteError, {awardId:awardData.id});
		}

		private onDeleteReturn(data: any) {
			this.waiting = false;
			if (data == null) {
				return ;
			}
			var result = JSON.parse(data);
			if (result.code != 0) {
				msgBox.openMsgBox(result.msg, null, "确定", null);
				return ;
			}
			for (var index = 0; index < this.goodsList.array.length; index++) {
				var element = this.goodsList.array[index] as data.awardData;
				if (element.id == result.data) {
					this.goodsList.deleteItem(index);
					return ;
				}
			}
		}

		private onDeleteError(data: any) {
			this.waiting = false;
			msgBox.openMsgBox(data, null, "确定", null);
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
				this.goodsList.addItem(element);
			}
		}

		private onReturnError(data: any) {
			msgBox.openMsgBox(data, null, "确定", null);
		}

		
		private onClickPublish() {
			var result = this.checkPublishInput();
			if (result != null) {
				msgBox.openMsgBox(result, null, "确定", null);
				return ;
			}
			AppMain.Instance.uploadImage(this, this.onUploadReturn, this.onPublishError, this.awardImage);
		}

		private onPublishError(data: any) {
			msgBox.openMsgBox(data, null, "确定", null);
			this.publishBtn.once(Laya.Event.CLICK, this, this.onClickPublish);
		}

		private onUploadReturn(data: any) {			
			if (data == null) {
				this.publishBtn.once(Laya.Event.CLICK, this, this.onClickPublish);
				return ;
			}
			var result = JSON.parse(data);
			if (result.code != 0) {
				msgBox.openMsgBox(result.msg, null, "确定", null);
				this.publishBtn.once(Laya.Event.CLICK, this, this.onClickPublish);
				return ;
			}

			var uploadResponse = result.data as data.uploadFileResponse;
			var imgUrl = uploadResponse.saveList[0];
			AppMain.Instance.publishAward(this, this.onPublishReturn, this.onPublishError, 
			{
				name:this.awardName.text,
				price:this.awardVal.text,
				count:this.awardCount.text,
				imgUrl:imgUrl
			});
		}

		private onPublishReturn(data: any) {
			this.publishBtn.once(Laya.Event.CLICK, this, this.onClickPublish);
			msgBox.openMsgBox("发布成功", null, "确定", null);
		}

		private onToMngTask() {
			manageAward.hide();
			manageTask.show();
		}

		private onClickExit() {
			manageAward.hide();
		}		
		
		private freshUploadBtn() {
			if (this.uploadBtn != null){
				var newBtnBounds = this.chooseImg.getBounds();
				var selfPos = new laya.maths.Point(0, 0);
				selfPos = this.chooseImg.localToGlobal(selfPos);
				var uploadBtnBound = new laya.maths.Rectangle(
					selfPos.x / window.devicePixelRatio,
					selfPos.y / window.devicePixelRatio, 
					newBtnBounds.width / window.devicePixelRatio, 
					newBtnBounds.height / window.devicePixelRatio);
				var pos = "left:" + uploadBtnBound.x + "px;top:" + uploadBtnBound.y + "px;";
				var size = "width:" + uploadBtnBound.width + "px;height:" + uploadBtnBound.height + "px;";
				this.uploadBtn.style="filter:alpha(opacity=0);opacity:0;" + size + pos;
				//this.uploadBtn.style="opacity:1;" + size + pos;
				console.log(size + pos);
			}
		}

		private checkPublishInput() {
			if (this.awardImage == null) {
				return "请选择图片";
			}
			if (this.awardCount.text == null || this.awardCount.text.length == 0) {
				return "请设置奖品存量";
			}
			if (this.awardVal.text == null || this.awardVal.text.length == 0) {
				return "请设置奖品兑换值";
			}
			if (this.awardName.text == null || this.awardName.text.length == 0) {
				return "请设置奖品名称";
			}
			return null;
		}
	}
}