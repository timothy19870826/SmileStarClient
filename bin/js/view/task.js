var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**Created by the LayaAirIDE*/
var view;
(function (view) {
    var task = (function (_super) {
        __extends(task, _super);
        function task() {
            var _this = _super.call(this) || this;
            _this.pageIdx = 0;
            _this.pageSize = 20;
            _this.frameOnce(2, _this, _this.onDelayInit);
            return _this;
        }
        task.show = function (root) {
            if (task.sInstance == null) {
                if (root) {
                    task.sInstance = root.addChild(new task());
                }
                else {
                    task.sInstance = Laya.stage.addChild(new task());
                }
            }
            task.sInstance.visible = true;
        };
        task.hide = function () {
            if (task.sInstance != null) {
                task.sInstance.visible = false;
            }
        };
        task.prototype.onDelayInit = function () {
            if (this.taskList.itemRender && this.taskList.itemRender.props) {
                this.taskList.itemRender.props.height *= AppMain.Instance.hScale;
            }
            this.pageSize = this.taskList.height / this.taskList.itemRender.props.height;
            this.pageSize = Math.floor(this.pageSize);
            this.taskList.array = [];
            this.taskList.repeatX = 1;
            this.taskList.renderHandler = new Handler(this, this.onListRender);
            AppMain.Instance.requestTaskList(this, this.onListReturn, this.onListReturnError, { pageIdx: this.pageIdx, pageSize: this.pageSize, isActive: "1" });
        };
        task.prototype.onListRender = function (item, index) {
            //自定义list的渲染方式
            var awardDesc = item.getChildByName("awardDesc");
            var taskName = item.getChildByName("taskName");
            var chances = item.getChildByName("chances");
            var leftChance = item.getChildByName("leftChance");
            var publisDate = item.getChildByName("publisDate");
            var publisher = item.getChildByName("publisher");
            var taskDesc = item.getChildByName("taskDesc");
            var data = this.taskList.array[index];
            taskName.text = data.name;
            awardDesc.text = data.awardVal.toString();
            chances.text = data.needPerson.toString();
            leftChance.text = (data.needPerson - data.curPerson).toString();
            publisDate.text = (new Date(data.date)).toDateString();
            publisher.text = data.publisher;
            taskDesc.text = data.desc;
            if (index == this.taskList.array.length - 1) {
                AppMain.Instance.requestTaskList(this, this.onListReturn, this.onListReturnError, { pageIdx: this.pageIdx, pageSize: this.pageSize, isActive: "1" });
            }
            item.on(Laya.Event.CLICK, this, this.onSelectedItem, [index]);
        };
        task.prototype.onSelectedItem = function (index) {
            var data = this.taskList.array[index];
            view.msgBox.openMsgBox2("确认领取任务：" + data.name + "?", this, null, this.onReceiveTask, null, null, data);
        };
        task.prototype.onReceiveTask = function (data) {
            AppMain.Instance.requestRecieveTask(this, this.onReceiveReturn, this.onReceiveError, { uid: AppMain.userData.uid, taskId: data.id });
        };
        task.prototype.onReceiveError = function (data) {
            view.msgBox.openMsgBox(data, null, null, null);
        };
        task.prototype.onReceiveReturn = function (data) {
            if (data == null) {
                return;
            }
            var result = JSON.parse(data);
            if (result.code != 0) {
                view.msgBox.openMsgBox(result.msg, null, null, null);
                return;
            }
            view.msgBox.openMsgBox("任务[" + result.data.name + "]领取成功", null, null, null);
            for (var index = 0; index < this.taskList.array.length; index++) {
                var element = this.taskList.array[index];
                if (element.id == result.data.id) {
                    this.taskList.setItem(index, result.data);
                    return;
                }
            }
        };
        task.prototype.onListReturn = function (data) {
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
                this.taskList.addItem(element);
            }
        };
        task.prototype.onListReturnError = function (data) {
            view.msgBox.openMsgBox(data, null, "确定", null);
        };
        return task;
    }(ui.taskUI));
    task.sInstance = null;
    view.task = task;
})(view || (view = {}));
//# sourceMappingURL=task.js.map