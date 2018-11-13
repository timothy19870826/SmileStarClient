/**Created by the LayaAirIDE*/
module view{
	export class mall extends ui.mallUI{

		private static sInstance: mall = null;
		public static show(root?: laya.ui.Component) {
			if (mall.sInstance == null) {
				if (root) {
					mall.sInstance = root.addChild(new mall()) as mall;
				}
				else {
					mall.sInstance = Laya.stage.addChild(new mall()) as mall;
				}
			}
			mall.sInstance.visible = true;
		}

		public static hide() {
			if (mall.sInstance != null) {
				mall.sInstance.visible = false;
			}
		}

		constructor(){
			super();
			this.frameOnce(2, this, this.onDelayInit);
		}

		private pageIdx: number = 0;
		private pageSize: number = 20;
		private onDelayInit() {
			if (this.goodsList.itemRender && this.goodsList.itemRender.props) {
				this.goodsList.itemRender.props.width *= AppMain.Instance.scale;
				this.goodsList.itemRender.props.height *= AppMain.Instance.scale;
			}
			this.pageSize = this.goodsList.width / this.goodsList.itemRender.props.width * 
							this.goodsList.height / this.goodsList.itemRender.props.height;
			this.pageSize = Math.floor(this.pageSize);
			this.goodsList.array = [];
			this.goodsList.renderHandler = new Handler(this, this.onListRender);
			AppMain.Instance.requestGoodsList(this, this.onListReturn, this.onListReturnError, {pageIdx:this.pageIdx, pageSize:this.pageSize});
		}

		private onListRender(item: Laya.Box, index: number) {
			//自定义list的渲染方式
			var image = item.getChildByName("img") as Laya.Image;
			var name = item.getChildByName("desc") as Laya.Label;
			var data = this.goodsList.array[index] as data.awardData;
			image.graphics.clear();
			if (data.imgUrl) {
				image.loadImage(data.imgUrl, 0, 0, image.width, image.height);
			}
			name.text = data.name;
			if (index == this.goodsList.array.length - 1) {				
				AppMain.Instance.requestGoodsList(this, this.onListReturn, this.onListReturnError, {pageIdx:this.pageIdx, pageSize:this.pageSize});
			}
			item.on(Laya.Event.CLICK, this, this.onSelectedItem, [index]);
		}

		private onSelectedItem(index: number) {
			var data = this.goodsList.array[index] as data.awardData;
			if (AppMain.userData.capitalWeibi < data.price) {
				msgBox.openMsgBox("资源不足以兑换该奖品，请继续加油", null, "确定", null);
				return ;
			}
			msgImgBox.openMsgBox2(data.imgUrl, "确任对话该奖品吗？", this, null, this.onExchangeAward, null, null, data);
			this.goodsList.selectedItem = null;
		}

		private onExchangeAward(data: data.awardData) {
			AppMain.Instance.requestExchangeAward(this, this.onExchangeReturn, this.onExchangeError, {uid:AppMain.userData.uid,awardId:data.id,exchangeNum:1});
		}

		private onExchangeError(data: any) {
			msgBox.openMsgBox(data, null, null, null);
		}

		private onExchangeReturn(data: any) {
			if (data == null) {
				return ;
			}
			var result = JSON.parse(data);
			if (result.code != 0) {
				msgBox.openMsgBox(result.msg, null, null, null);
				return ;
			}
			msgBox.openMsgBox("奖品[" + result.data.name + "]兑换成功", null, null, null);
			for (var index = 0; index < this.goodsList.array.length; index++) {
				var element = this.goodsList.array[index] as data.awardData;
				if (element.id == result.data.id) {
					this.goodsList.setItem(index, result.data);
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
				this.goodsList.addItem(element);
			}
		}

		private onListReturnError(data: any) {
			msgBox.openMsgBox(data, null, "确定", null);
		}
	}
}