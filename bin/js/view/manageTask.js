var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**Created by the LayaAirIDE*/
var view;
(function (view) {
    var manageTask = (function (_super) {
        __extends(manageTask, _super);
        function manageTask() {
            var _this = _super.call(this) || this;
            _this.pageIdx = 0;
            _this.pageSize = 20;
            _this.frameOnce(2, _this, _this.onDelayInit);
            return _this;
        }
        manageTask.show = function () {
            if (manageTask.sInstance == null) {
                manageTask.sInstance = Laya.stage.addChild(new manageTask());
            }
            manageTask.sInstance.visible = true;
        };
        manageTask.hide = function () {
            if (manageTask.sInstance) {
                manageTask.sInstance.visible = false;
            }
        };
        manageTask.prototype.onDelayInit = function () {
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
            AppMain.Instance.requestTaskList(this, this.onListReturn, this.onListReturnError, { pageIdx: this.pageIdx, pageSize: this.pageSize, isActive: "0" });
        };
        manageTask.prototype.onListRender = function (item, index) {
            //自定义list的渲染方式
            var log = item;
            var data = this.publishLogs.array[index];
            var state = data.state == 1 ? "进行中" : "已结束";
            log.text = (new Date(data.date)).toDateString() + "  " + data.publisher + "发布了任务 " + data.name + "[" + state + "]";
            if (index == this.publishLogs.array.length - 1) {
                console.log("request next page");
                AppMain.Instance.requestTaskList(this, this.onListReturn, this.onListReturnError, { pageIdx: this.pageIdx, pageSize: this.pageSize, isActive: "0" });
            }
            log.on(Laya.Event.CLICK, this, this.onEditTask, [data]);
        };
        manageTask.prototype.onEditTask = function (data) {
            if (data.state == 1) {
                view.msgBox.openMsgBox2("是否结束任务", this, null, this.onCloseTask, null, null, data);
            }
        };
        manageTask.prototype.onCloseTask = function (data) {
            AppMain.Instance.requestCloseTask(this, this.onCloseTaskReturn, this.onError, { taskId: data.id });
        };
        manageTask.prototype.onCloseTaskReturn = function (data) {
            if (data == null) {
                return;
            }
            var result = JSON.parse(data);
            if (result.code != 0) {
                view.msgBox.openMsgBox(result.msg, null, "确定", null);
                return;
            }
            for (var index = 0; index < this.publishLogs.array.length; index++) {
                var element = this.publishLogs.array[index];
                if (element.id == result.data.id) {
                    this.publishLogs.setItem(index, result.data);
                    return;
                }
            }
        };
        manageTask.prototype.onListReturn = function (data) {
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
                this.publishLogs.addItem(element);
            }
        };
        manageTask.prototype.onListReturnError = function (data) {
            view.msgBox.openMsgBox(data, null, "确定", null);
        };
        manageTask.prototype.onClickPublish = function () {
            AppMain.Instance.publishTask(this, this.onReturn, this.onError, {
                name: this.title.text,
                expire: this.expire.text,
                desc: this.desc.text,
                needPerson: this.needPerson.text,
                awardVal: this.award.text,
                publisher: AppMain.adminData.desc
            });
        };
        manageTask.prototype.onReturn = function (data) {
            this.publishBtn.once(Laya.Event.CLICK, this, this.onClickPublish);
            if (data == null) {
                return;
            }
            var result = JSON.parse(data);
            if (result.code != 0) {
                view.msgBox.openMsgBox(result.msg, null, "确定", null);
                return;
            }
        };
        manageTask.prototype.onError = function (data) {
            this.publishBtn.once(Laya.Event.CLICK, this, this.onClickPublish);
            view.msgBox.openMsgBox(data, null, "确定", null);
        };
        manageTask.prototype.onToMngGoods = function () {
            manageTask.hide();
            view.manageAward.show();
        };
        manageTask.prototype.onClickExit = function () {
            manageTask.hide();
        };
        return manageTask;
    }(ui.manageTaskUI));
    manageTask.sInstance = null;
    view.manageTask = manageTask;
})(view || (view = {}));
//# sourceMappingURL=manageTask.js.map