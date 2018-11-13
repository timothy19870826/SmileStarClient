var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**Created by the LayaAirIDE*/
var view;
(function (view) {
    var msgImgBox = (function (_super) {
        __extends(msgImgBox, _super);
        function msgImgBox() {
            return _super.call(this) || this;
        }
        msgImgBox.openMsgBox = function (imgURL, msgContent, caller, confirmLabel, confirmCb, data) {
            var page = Laya.stage.addChild(new msgImgBox());
            var args = [];
            for (var index = 0; index < arguments.length; index++) {
                var element = arguments[index];
                args.push(element);
            }
            page.frameOnce(2, page, page.initMsgBox, args);
        };
        msgImgBox.openMsgBox2 = function (imgURL, msgContent, caller, confirmLabel, confirmCb, cancelLab, cancelCb, data) {
            var page = Laya.stage.addChild(new msgImgBox());
            var args = [];
            for (var index = 0; index < arguments.length; index++) {
                var element = arguments[index];
                args.push(element);
            }
            page.frameOnce(2, page, page.initMsgBox2, args);
        };
        msgImgBox.prototype.initMsgBox = function (imgURL, msgContent, caller, confirmLabel, confirmCb, data) {
            if (imgURL) {
                this.img.visible = true;
                try {
                    this.img.graphics.clear();
                    this.img.graphics.loadImage(imgURL, 0, 0, this.img.width, this.img.height);
                }
                catch (error) {
                    this.img.visible = false;
                }
            }
            else {
                this.img.visible = false;
            }
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
        msgImgBox.prototype.initMsgBox2 = function (imgURL, msgContent, caller, confirmLabel, confirmCb, cancelLab, cancelCb, data) {
            if (imgURL) {
                this.img.visible = true;
                try {
                    this.img.graphics.clear();
                    this.img.graphics.loadImage(imgURL, 0, 0, this.img.width, this.img.height);
                }
                catch (error) {
                    this.img.visible = false;
                }
            }
            else {
                this.img.visible = false;
            }
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
        msgImgBox.prototype.onClickOK = function () {
            this.destroy();
            if (this.confirmCb) {
                this.confirmCb.call(this.caller, this.data);
            }
        };
        msgImgBox.prototype.onClickConfirm = function () {
            this.destroy();
            if (this.confirmCb) {
                this.confirmCb.call(this.caller, this.data);
            }
        };
        msgImgBox.prototype.onClickCancel = function () {
            this.destroy();
            if (this.cancelCb) {
                this.cancelCb.call(this.caller, this.data);
            }
        };
        return msgImgBox;
    }(ui.msgImgBoxUI));
    view.msgImgBox = msgImgBox;
})(view || (view = {}));
//# sourceMappingURL=msgImgBox.js.map