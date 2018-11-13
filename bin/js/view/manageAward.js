var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
* name
*/
var view;
(function (view) {
    var manageAward = (function (_super) {
        __extends(manageAward, _super);
        function manageAward() {
            var _this = _super.call(this) || this;
            _this.pageIdx = 0;
            _this.pageSize = 20;
            _this.waiting = false;
            _this.frameOnce(2, _this, _this.onDelayInit);
            return _this;
        }
        manageAward.show = function () {
            if (manageAward.sInstance == null) {
                manageAward.sInstance = Laya.stage.addChild(new manageAward());
            }
            manageAward.sInstance.visible = true;
        };
        manageAward.hide = function () {
            if (manageAward.sInstance) {
                manageAward.sInstance.visible = false;
            }
        };
        manageAward.prototype.onDelayInit = function () {
            this.uploadBtn = Laya.Browser.document.createElement("input");
            this.freshUploadBtn();
            this.uploadBtn.type = "file"; //设置类型是file类型。
            this.uploadBtn.multiple = "multiple";
            this.uploadBtn.accept = "image/png,image/jpg"; //设置文件的格式为png；
            this.uploadBtn.style.position = "absolute";
            this.uploadBtn.style.zIndex = 999;
            Laya.Browser.document.body.appendChild(this.uploadBtn); //添加到页面；
            this.fileReader = new Laya.Browser.window.FileReader();
            var self = this;
            this.uploadBtn.onchange = function (e) {
                console.log("this.uploadBtn.onchange:" + self.uploadBtn.files.length);
                if (self.uploadBtn.files.length > 0) {
                    self.fileReader.readAsDataURL(self.uploadBtn.files[0]);
                }
            };
            this.fileReader.onload = function (evt) {
                console.log("this.fileReader.onload:" + (Laya.Browser.window.FileReader.DONE == self.fileReader.readyState));
                if (Laya.Browser.window.FileReader.DONE == self.fileReader.readyState) {
                    self.awardImage = self.uploadBtn.files[0];
                    self.selectedImg.loadImage(self.fileReader.result, 0, 0, self.selectedImg.width, self.selectedImg.height);
                }
            };
            this.exit.on(Laya.Event.CLICK, this, this.onClickExit);
            this.publishBtn.once(Laya.Event.CLICK, this, this.onClickPublish);
            this.mngTask.on(Laya.Event.CLICK, this, this.onToMngTask);
            this.goodsList.array = [];
            this.goodsList.renderHandler = new Handler(this, this.onListRender);
            AppMain.Instance.requestGoodsList(this, this.onListReturn, this.onReturnError, { pageIdx: this.pageIdx, pageSize: this.pageSize });
        };
        manageAward.prototype.onListRender = function (item, index) {
            //自定义list的渲染方式
            var image = item.getChildByName("img");
            var name = item.getChildByName("name");
            var btn = item.getChildByName("deleteBtn");
            var data = this.goodsList.array[index];
            image.graphics.clear();
            if (data.imgUrl) {
                image.loadImage(data.imgUrl, 0, 0, image.width, image.height);
            }
            name.text = data.name;
            btn.on(Laya.Event.CLICK, this, this.deleteAward, [data]);
            if (index == this.goodsList.array.length - 1) {
                AppMain.Instance.requestGoodsList(this, this.onListReturn, this.onReturnError, { pageIdx: this.pageIdx, pageSize: this.pageSize });
            }
        };
        manageAward.prototype.deleteAward = function (awardData) {
            if (this.waiting) {
                return;
            }
            this.waiting = true;
            console.log("delete:" + awardData.name);
            AppMain.Instance.requestDeleteAward(this, this.onDeleteReturn, this.onDeleteError, { awardId: awardData.id });
        };
        manageAward.prototype.onDeleteReturn = function (data) {
            this.waiting = false;
            if (data == null) {
                return;
            }
            var result = JSON.parse(data);
            if (result.code != 0) {
                view.msgBox.openMsgBox(result.msg, null, "确定", null);
                return;
            }
            for (var index = 0; index < this.goodsList.array.length; index++) {
                var element = this.goodsList.array[index];
                if (element.id == result.data) {
                    this.goodsList.deleteItem(index);
                    return;
                }
            }
        };
        manageAward.prototype.onDeleteError = function (data) {
            this.waiting = false;
            view.msgBox.openMsgBox(data, null, "确定", null);
        };
        manageAward.prototype.onListReturn = function (data) {
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
                this.goodsList.addItem(element);
            }
        };
        manageAward.prototype.onReturnError = function (data) {
            view.msgBox.openMsgBox(data, null, "确定", null);
        };
        manageAward.prototype.onClickPublish = function () {
            var result = this.checkPublishInput();
            if (result != null) {
                view.msgBox.openMsgBox(result, null, "确定", null);
                return;
            }
            AppMain.Instance.uploadImage(this, this.onUploadReturn, this.onPublishError, this.awardImage);
        };
        manageAward.prototype.onPublishError = function (data) {
            view.msgBox.openMsgBox(data, null, "确定", null);
            this.publishBtn.once(Laya.Event.CLICK, this, this.onClickPublish);
        };
        manageAward.prototype.onUploadReturn = function (data) {
            if (data == null) {
                this.publishBtn.once(Laya.Event.CLICK, this, this.onClickPublish);
                return;
            }
            var result = JSON.parse(data);
            if (result.code != 0) {
                view.msgBox.openMsgBox(result.msg, null, "确定", null);
                this.publishBtn.once(Laya.Event.CLICK, this, this.onClickPublish);
                return;
            }
            var uploadResponse = result.data;
            var imgUrl = uploadResponse.saveList[0];
            AppMain.Instance.publishAward(this, this.onPublishReturn, this.onPublishError, {
                name: this.awardName.text,
                price: this.awardVal.text,
                count: this.awardCount.text,
                imgUrl: imgUrl
            });
        };
        manageAward.prototype.onPublishReturn = function (data) {
            this.publishBtn.once(Laya.Event.CLICK, this, this.onClickPublish);
            view.msgBox.openMsgBox("发布成功", null, "确定", null);
        };
        manageAward.prototype.onToMngTask = function () {
            manageAward.hide();
            view.manageTask.show();
        };
        manageAward.prototype.onClickExit = function () {
            manageAward.hide();
        };
        manageAward.prototype.freshUploadBtn = function () {
            if (this.uploadBtn != null) {
                var newBtnBounds = this.chooseImg.getBounds();
                var selfPos = new laya.maths.Point(0, 0);
                selfPos = this.chooseImg.localToGlobal(selfPos);
                var uploadBtnBound = new laya.maths.Rectangle(selfPos.x / window.devicePixelRatio, selfPos.y / window.devicePixelRatio, newBtnBounds.width / window.devicePixelRatio, newBtnBounds.height / window.devicePixelRatio);
                var pos = "left:" + uploadBtnBound.x + "px;top:" + uploadBtnBound.y + "px;";
                var size = "width:" + uploadBtnBound.width + "px;height:" + uploadBtnBound.height + "px;";
                this.uploadBtn.style = "filter:alpha(opacity=0);opacity:0;" + size + pos;
                //this.uploadBtn.style="opacity:1;" + size + pos;
                console.log(size + pos);
            }
        };
        manageAward.prototype.checkPublishInput = function () {
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
        };
        return manageAward;
    }(ui.manageAwardUI));
    manageAward.sInstance = null;
    view.manageAward = manageAward;
})(view || (view = {}));
//# sourceMappingURL=manageAward.js.map