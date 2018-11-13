var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**Created by the LayaAirIDE*/
var view;
(function (view) {
    var achievement = (function (_super) {
        __extends(achievement, _super);
        function achievement() {
            var _this = _super.call(this) || this;
            _this.selectedColor = "#ffffff";
            _this.unSelectedColor = "#004493";
            _this.selectedSkin = "smileStar/color_41daf8.png";
            _this.unSelectedSkin = "smileStar/color_d9d9d9.png";
            _this.frameOnce(2, _this, _this.onDelayInit);
            return _this;
        }
        achievement.show = function () {
            if (achievement.sInstance == null) {
                achievement.sInstance = Laya.stage.addChild(new achievement());
            }
            achievement.sInstance.visible = true;
        };
        achievement.hide = function () {
            if (achievement.sInstance) {
                achievement.sInstance.visible = false;
            }
        };
        achievement.prototype.onDelayInit = function () {
            this.exit.on(Laya.Event.CLICK, this, this.onClickExit);
            this.all.on(Laya.Event.CLICK, this, this.showContent, [0]);
            this.achieved.on(Laya.Event.CLICK, this, this.showContent, [1]);
            this.unAchieved.on(Laya.Event.CLICK, this, this.showContent, [2]);
            this.list.renderHandler = new Handler(this, this.onListRender);
        };
        achievement.prototype.onListRender = function (item, index) {
            //自定义list的渲染方式
        };
        achievement.prototype.onClickExit = function () {
            achievement.hide();
        };
        achievement.prototype.showContent = function (contentType) {
            if (contentType == 0) {
                this.all.skin = this.selectedSkin;
                this.allLab.color = this.selectedColor;
            }
            else {
                this.all.skin = this.unSelectedSkin;
                this.allLab.color = this.unSelectedColor;
            }
            if (contentType == 1) {
                this.achieved.skin = this.selectedSkin;
                this.achievedLab.color = this.selectedColor;
            }
            else {
                this.achieved.skin = this.unSelectedSkin;
                this.achievedLab.color = this.unSelectedColor;
            }
            if (contentType == 2) {
                this.unAchieved.skin = this.selectedSkin;
                this.unAchievedLab.color = this.selectedColor;
            }
            else {
                this.unAchieved.skin = this.unSelectedSkin;
                this.unAchievedLab.color = this.unSelectedColor;
            }
        };
        return achievement;
    }(ui.achievementUI));
    achievement.sInstance = null;
    view.achievement = achievement;
})(view || (view = {}));
//# sourceMappingURL=achievement.js.map