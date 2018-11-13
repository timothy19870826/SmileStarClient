var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**Created by the LayaAirIDE*/
var view;
(function (view) {
    var msgBox = (function (_super) {
        __extends(msgBox, _super);
        function msgBox() {
            return _super.call(this) || this;
        }
        //private static msgBoxPool: msgBox[] = [];
        msgBox.openMsgBox = function (msgContent, caller, confirmLabel, confirmCb, data) {
            var page = Laya.stage.addChild(new msgBox());
            var args = [];
            for (var index = 0; index < arguments.length; index++) {
                var element = arguments[index];
                args.push(element);
            }
            page.frameOnce(2, page, page.initMsgBox, args);
        };
        msgBox.openMsgBox2 = function (msgContent, caller, confirmLabel, confirmCb, cancelLab, cancelCb, data) {
            var page = Laya.stage.addChild(new msgBox());
            var args = [];
            for (var index = 0; index < arguments.length; index++) {
                var element = arguments[index];
                args.push(element);
            }
            page.frameOnce(2, page, page.initMsgBox2, args);
        };
        msgBox.prototype.initMsgBox = function (msgContent, caller, confirmLabel, confirmCb, data) {
            this.msg.text = msgContent;
            this.caller = caller;
            if (confirmLabel) {
                this.okBtn.label = confirmLabel;
            }
            this.confirmCb = confirmCb;
            this.okBtn.visible = true;
            this.confirmBtn.visible = false;
            this.cancelBtn.visible = false;
            this.okBtn.once(Laya.Event.CLICK, this, this.onClickOK);
            this.scaleX = AppMain.Instance.scale;
            this.scaleY = AppMain.Instance.scale;
            this.data = data;
        };
        msgBox.prototype.initMsgBox2 = function (msgContent, caller, confirmLabel, confirmCb, cancelLab, cancelCb, data) {
            this.msg.text = msgContent;
            this.caller = caller;
            if (confirmLabel) {
                this.confirmBtn.label = confirmLabel;
            }
            this.confirmCb = confirmCb;
            if (cancelLab) {
                this.cancelBtn.label = cancelLab;
            }
            this.cancelCb = cancelCb;
            this.okBtn.visible = false;
            this.confirmBtn.visible = true;
            this.cancelBtn.visible = true;
            this.confirmBtn.once(Laya.Event.CLICK, this, this.onClickConfirm);
            this.cancelBtn.once(Laya.Event.CLICK, this, this.onClickCancel);
            this.scaleX = AppMain.Instance.scale;
            this.scaleY = AppMain.Instance.scale;
            this.data = data;
        };
        msgBox.prototype.onClickOK = function () {
            this.destroy();
            if (this.confirmCb) {
                this.confirmCb.call(this.caller, this.data);
            }
        };
        msgBox.prototype.onClickConfirm = function () {
            this.destroy();
            if (this.confirmCb) {
                this.confirmCb.call(this.caller, this.data);
            }
        };
        msgBox.prototype.onClickCancel = function () {
            this.destroy();
            if (this.cancelCb) {
                this.cancelCb.call(this.caller, this.data);
            }
        };
        return msgBox;
    }(ui.msgBoxUI));
    view.msgBox = msgBox;
})(view || (view = {}));
//# sourceMappingURL=msgBox.js.map