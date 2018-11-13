var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**Created by the LayaAirIDE*/
var view;
(function (view) {
    var main = (function (_super) {
        __extends(main, _super);
        function main() {
            var _this = _super.call(this) || this;
            _this.top = 0;
            _this.bottom = 0;
            _this.left = 0;
            _this.right = 0;
            _this.frameOnce(2, _this, _this.onDelayInit);
            return _this;
        }
        /**
         * static show
         */
        main.show = function () {
            if (main.sInstance == null) {
                main.sInstance = Laya.stage.addChild(new main());
            }
            main.sInstance.visible = true;
        };
        main.prototype.onDelayInit = function () {
            this.container.on("showContent", this, this.onShowContent);
            this.mailBtn.on(Laya.Event.CLICK, this, this.onShowContent, [0]);
            this.taskBtn.on(Laya.Event.CLICK, this, this.onShowContent, [1]);
            this.profileBtn.on(Laya.Event.CLICK, this, this.onShowContent, [2]);
            this.onShowContent(0);
        };
        main.prototype.onShowContent = function (contentType) {
            switch (contentType) {
                case 0:
                    view.mall.show(this.container);
                    view.task.hide();
                    view.profile.hide();
                    break;
                case 1:
                    view.mall.hide();
                    view.task.show(this.container);
                    view.profile.hide();
                    break;
                case 2:
                    view.mall.hide();
                    view.task.hide();
                    view.profile.show(this.container);
                    break;
            }
        };
        return main;
    }(ui.mainPageUI));
    main.sInstance = null;
    view.main = main;
})(view || (view = {}));
//# sourceMappingURL=main.js.map