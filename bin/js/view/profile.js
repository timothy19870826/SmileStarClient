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
    var profile = (function (_super) {
        __extends(profile, _super);
        function profile() {
            var _this = _super.call(this) || this;
            _this.taskLogPageIdx = 0;
            _this.taskLogPageSize = 20;
            _this.moneyLogPageIdx = 0;
            _this.moneyLogPageSize = 20;
            _this.frameOnce(2, _this, _this.onDelayInit);
            return _this;
        }
        profile.show = function (root) {
            if (profile.sInstance == null) {
                if (root) {
                    profile.sInstance = root.addChild(new profile());
                }
                else {
                    profile.sInstance = Laya.stage.addChild(new profile());
                }
            }
            profile.sInstance.visible = true;
        };
        profile.hide = function () {
            if (profile.sInstance != null) {
                profile.sInstance.visible = false;
            }
        };
        profile.prototype.onDelayInit = function () {
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
            AppMain.Instance.requestMoneyLog(this, this.onMoneyLogReturn, this.onReturnError, { pageIdx: this.moneyLogPageIdx, pageSize: this.moneyLogPageSize, uid: AppMain.userData.uid });
            AppMain.Instance.requestTaskLog(this, this.onTaskLogReturn, this.onReturnError, { pageIdx: this.taskLogPageIdx, pageSize: this.taskLogPageSize, uid: AppMain.userData.uid });
        };
        profile.prototype.onTaskLogRender = function (item, index) {
            //自定义list的渲染方式
            var log = item;
            var data = this.taskLog.array[index];
            log.text = data.name + (data.state == 2 ? "已完成" : "进行中");
            if (index == this.taskLog.array.length - 1) {
                AppMain.Instance.requestTaskLog(this, this.onTaskLogReturn, this.onReturnError, { pageIdx: this.taskLogPageIdx, pageSize: this.taskLogPageSize, uid: AppMain.userData.uid });
            }
        };
        profile.prototype.onMoneyLogRender = function (item, index) {
            //自定义list的渲染方式
            var log = item;
            var data = this.moneyLog.array[index];
            if (data.income > 0) {
                log.text = "+" + data.income * 0.01 + " " + data.desc + " " + (new Date(data.date)).toDateString() + " 剩余：" + data.surplusFund * 0.01;
            }
            else {
                log.text = "-" + data.expenditure * 0.01 + " " + data.desc + " " + (new Date(data.date)).toDateString() + " 剩余：" + data.surplusFund * 0.01;
            }
            if (index == this.moneyLog.array.length - 1) {
                AppMain.Instance.requestMoneyLog(this, this.onMoneyLogReturn, this.onReturnError, { pageIdx: this.moneyLogPageIdx, pageSize: this.moneyLogPageSize, uid: AppMain.userData.uid });
            }
        };
        profile.prototype.onMoneyLogReturn = function (data) {
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
            this.moneyLogPageIdx++;
            for (var index = 0; index < result.data.length; index++) {
                var element = result.data[index];
                AppMain.awardDataList.push(element);
                this.moneyLog.addItem(element);
            }
        };
        profile.prototype.onTaskLogReturn = function (data) {
            if (data == null) {
                return;
            }
            var result = JSON.parse(data);
            if (result.code != 0) {
                view.msgBox.openMsgBox(result.message, null, "确定", null);
                return;
            }
            if (result.data == null || result.data.length == 0) {
                return;
            }
            this.taskLogPageIdx++;
            for (var index = 0; index < result.data.length; index++) {
                var element = result.data[index];
                AppMain.awardDataList.push(element);
                this.taskLog.addItem(element);
            }
        };
        profile.prototype.onReturnError = function (data) {
            view.msgBox.openMsgBox(data, null, "确定", null);
        };
        profile.prototype.showMall = function () {
            this.parent.event("showContent", 0);
        };
        profile.prototype.showAchievement = function () {
            view.achievement.show();
        };
        profile.prototype.showManager = function () {
        };
        return profile;
    }(ui.profileUI));
    profile.sInstance = null;
    view.profile = profile;
})(view || (view = {}));
//# sourceMappingURL=profile.js.map