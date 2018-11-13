var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**Created by the LayaAirIDE*/
var view;
(function (view) {
    var mall = (function (_super) {
        __extends(mall, _super);
        function mall() {
            var _this = _super.call(this) || this;
            _this.pageIdx = 0;
            _this.pageSize = 20;
            _this.frameOnce(2, _this, _this.onDelayInit);
            return _this;
        }
        mall.show = function (root) {
            if (mall.sInstance == null) {
                if (root) {
                    mall.sInstance = root.addChild(new mall());
                }
                else {
                    mall.sInstance = Laya.stage.addChild(new mall());
                }
            }
            mall.sInstance.visible = true;
        };
        mall.hide = function () {
            if (mall.sInstance != null) {
                mall.sInstance.visible = false;
            }
        };
        mall.prototype.onDelayInit = function () {
            if (this.goodsList.itemRender && this.goodsList.itemRender.props) {
                this.goodsList.itemRender.props.width *= AppMain.Instance.scale;
                this.goodsList.itemRender.props.height *= AppMain.Instance.scale;
            }
            this.pageSize = this.goodsList.width / this.goodsList.itemRender.props.width *
                this.goodsList.height / this.goodsList.itemRender.props.height;
            this.pageSize = Math.floor(this.pageSize);
            this.goodsList.array = [];
            this.goodsList.renderHandler = new Handler(this, this.onListRender);
            AppMain.Instance.requestGoodsList(this, this.onListReturn, this.onListReturnError, { pageIdx: this.pageIdx, pageSize: this.pageSize });
        };
        mall.prototype.onListRender = function (item, index) {
            //自定义list的渲染方式
            var image = item.getChildByName("img");
            var name = item.getChildByName("desc");
            var data = this.goodsList.array[index];
            image.graphics.clear();
            if (data.imgUrl) {
                image.loadImage(data.imgUrl, 0, 0, image.width, image.height);
            }
            name.text = data.name;
            if (index == this.goodsList.array.length - 1) {
                AppMain.Instance.requestGoodsList(this, this.onListReturn, this.onListReturnError, { pageIdx: this.pageIdx, pageSize: this.pageSize });
            }
            item.on(Laya.Event.CLICK, this, this.onSelectedItem, [index]);
        };
        mall.prototype.onSelectedItem = function (index) {
            var data = this.goodsList.array[index];
            if (AppMain.userData.capitalWeibi < data.price) {
                view.msgBox.openMsgBox("资源不足以兑换该奖品，请继续加油", null, "确定", null);
                return;
            }
            view.msgImgBox.openMsgBox2(data.imgUrl, "确任对话该奖品吗？", this, null, this.onExchangeAward, null, null, data);
            this.goodsList.selectedItem = null;
        };
        mall.prototype.onExchangeAward = function (data) {
            AppMain.Instance.requestExchangeAward(this, this.onExchangeReturn, this.onExchangeError, { uid: AppMain.userData.uid, awardId: data.id, exchangeNum: 1 });
        };
        mall.prototype.onExchangeError = function (data) {
            view.msgBox.openMsgBox(data, null, null, null);
        };
        mall.prototype.onExchangeReturn = function (data) {
            if (data == null) {
                return;
            }
            var result = JSON.parse(data);
            if (result.code != 0) {
                view.msgBox.openMsgBox(result.msg, null, null, null);
                return;
            }
            view.msgBox.openMsgBox("奖品[" + result.data.name + "]兑换成功", null, null, null);
            for (var index = 0; index < this.goodsList.array.length; index++) {
                var element = this.goodsList.array[index];
                if (element.id == result.data.id) {
                    this.goodsList.setItem(index, result.data);
                    return;
                }
            }
        };
        mall.prototype.onListReturn = function (data) {
            if (data == null) {
                return;
            }
            var result = JSON.parse(data);
            if (result.code != 0) {
                view.msgBox.openMsgBox(result.msg, null, "确定", null);
                return;
            }
            if (result.data == null || result.data.length == 0) {
                return;
            }
            this.pageIdx++;
            for (var index = 0; index < result.data.length; index++) {
                var element = result.data[index];
                AppMain.awardDataList.push(element);
                this.goodsList.addItem(element);
            }
        };
        mall.prototype.onListReturnError = function (data) {
            view.msgBox.openMsgBox(data, null, "确定", null);
        };
        return mall;
    }(ui.mallUI));
    mall.sInstance = null;
    view.mall = mall;
})(view || (view = {}));
//# sourceMappingURL=mall.js.map