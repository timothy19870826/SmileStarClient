var test = ui.test.TestPageUI;
var Label = Laya.Label;
var Handler = Laya.Handler;
var Loader = Laya.Loader;
var WebGL = Laya.WebGL;
var AppMain = (function () {
    function AppMain() {
        this.scale = 1;
        this.hScale = 1;
        this.vScale = 1;
    }
    Object.defineProperty(AppMain, "Instance", {
        get: function () {
            if (AppMain.sInstance == null) {
                AppMain.sInstance = new AppMain();
            }
            return AppMain.sInstance;
        },
        enumerable: true,
        configurable: true
    });
    AppMain.prototype.init = function () {
        this.hScale = screen.availWidth * window.devicePixelRatio / 750;
        this.vScale = screen.availHeight * window.devicePixelRatio / 1334;
        this.scale = Math.min(this.hScale, this.vScale);
        //程序入口
        Laya.init(screen.availWidth * window.devicePixelRatio, screen.availHeight * window.devicePixelRatio);
        //Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        //Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        //激活资源版本控制
        Laya.ResourceVersion.enable("version.json", Handler.create(this, this.beginLoad), Laya.ResourceVersion.FILENAME_VERSION);
    };
    AppMain.prototype.beginLoad = function () {
        Laya.loader.load(["res/atlas/comp.atlas", "res/atlas/smileStar.atlas"], Handler.create(this, this.onLoaded));
    };
    AppMain.prototype.onLoaded = function () {
        view.login.open();
    };
    /**
     * post
     */
    AppMain.prototype.post = function (apiName, caller, completedListener, errorListener, data) {
        var xhr = new Laya.HttpRequest();
        xhr.http.timeout = 0;
        xhr.on(Laya.Event.COMPLETE, caller, completedListener);
        xhr.on(Laya.Event.ERROR, caller, errorListener);
        xhr.send(AppMain.API_URL + apiName, this.toFormData(data), "post");
    };
    /**
     * requestAdminLogin
     */
    AppMain.prototype.requestAdminLogin = function (caller, completedListener, errorListener, data) {
        this.post(AppMain.requestAdminLoginApi, caller, completedListener, errorListener, data);
    };
    /**
     * requestLogin
     */
    AppMain.prototype.requestLogin = function (caller, completedListener, errorListener, data) {
        this.post(AppMain.requestLoginApi, caller, completedListener, errorListener, data);
    };
    /**
     * requestRegist
     */
    AppMain.prototype.requestRegist = function (caller, completedListener, errorListener, data) {
        this.post(AppMain.requestRegistApi, caller, completedListener, errorListener, data);
    };
    /**
     * requestManagerLogin
     */
    AppMain.prototype.requestManagerLogin = function (caller, completedListener, errorListener, data) {
        this.post(AppMain.requestRegistApi, caller, completedListener, errorListener, data);
    };
    /**
     * requestGoodsList
     */
    AppMain.prototype.requestGoodsList = function (caller, completedListener, errorListener, data) {
        this.post(AppMain.reqeustGoodsListApi, caller, completedListener, errorListener, data);
    };
    /**
     * requestExchangeAward
     */
    AppMain.prototype.requestExchangeAward = function (caller, completedListener, errorListener, data) {
        this.post(AppMain.requestExchangeApi, caller, completedListener, errorListener, data);
    };
    /**
     * requestTaskList
     */
    AppMain.prototype.requestTaskList = function (caller, completedListener, errorListener, data) {
        this.post(AppMain.requestTaskListApi, caller, completedListener, errorListener, data);
    };
    /**
     * requestRecieveTask
     */
    AppMain.prototype.requestRecieveTask = function (caller, completedListener, errorListener, data) {
        this.post(AppMain.requestRecieveTaskApi, caller, completedListener, errorListener, data);
    };
    /**
     * requestMoneyLog
     */
    AppMain.prototype.requestMoneyLog = function (caller, completedListener, errorListener, data) {
        this.post(AppMain.requestMoneyLogApi, caller, completedListener, errorListener, data);
    };
    /**
     * requestTaskLog
     */
    AppMain.prototype.requestTaskLog = function (caller, completedListener, errorListener, data) {
        this.post(AppMain.requestTaskLogApi, caller, completedListener, errorListener, data);
    };
    /**
     * reqeustAchievement
     */
    AppMain.prototype.requestAchievement = function (caller, completedListener, errorListener, data) {
        this.post(AppMain.requestAchievementLogApi, caller, completedListener, errorListener, data);
    };
    /**
     * publishTask
     */
    AppMain.prototype.publishTask = function (caller, completedListener, errorListener, data) {
        this.post(AppMain.requestPublishTaskApi, caller, completedListener, errorListener, data);
    };
    /**
     * publishAward
     */
    AppMain.prototype.publishAward = function (caller, completedListener, errorListener, data) {
        this.post(AppMain.requestPublishAwardApi, caller, completedListener, errorListener, data);
    };
    /**
     * reqeustDeleteAward
     */
    AppMain.prototype.requestDeleteAward = function (caller, completedListener, errorListener, data) {
        this.post(AppMain.requestDeleteAwardApi, caller, completedListener, errorListener, data);
    };
    /**
     * requestCloseTask
     */
    AppMain.prototype.requestCloseTask = function (caller, completedListener, errorListener, data) {
        this.post(AppMain.requestCloseTaskApi, caller, completedListener, errorListener, data);
    };
    AppMain.prototype.uploadImage = function (caller, completedListener, errorListener, image) {
        var formData = new FormData();
        //var objFile=new File(["First Line Text"],"test.json");
        //formData.append("files", objFile);
        formData.append("files", image);
        var xhr = new Laya.HttpRequest();
        xhr.http.timeout = 0;
        xhr.once(Laya.Event.COMPLETE, caller, completedListener);
        xhr.once(Laya.Event.ERROR, caller, errorListener);
        xhr.send(AppMain.API_URL + AppMain.uploadImageApi, formData, "post", null, ["enctype", "multipart/form-data"]);
    };
    AppMain.prototype.toFormData = function (data) {
        var type = Object.prototype.toString.apply(data);
        type = type.substring(8, type.length - 1);
        switch (type) {
            case "Null":
            case "Undefined":
                return null;
            case "Boolean":
            case "String":
            case "Number":
                return "data=" + data.toString();
            case "Array":
                return "data=" + data.join(",");
            case "Function":
                return this.toFormData(data.call(data.caller));
            case "Object":
                var res = "&";
                for (var key in data) {
                    var element = data[key];
                    res += key + "=" + element + "&";
                }
                return res.substring(1, res.length - 1);
            default:
                return null;
        }
    };
    return AppMain;
}());
AppMain.sInstance = null;
AppMain.userData = null;
AppMain.adminData = null;
AppMain.awardDataList = [];
AppMain.taskDataList = [];
AppMain.userMoneyLogList = [];
AppMain.userTaskLogList = [];
AppMain.userAchivementList = [];
AppMain.API_URL = "http://192.168.1.200:8080/SmileStar/";
AppMain.requestAdminLoginApi = "UserData?account/adminLogin";
AppMain.requestLoginApi = "UserData?account/login";
AppMain.requestRegistApi = "UserData?account/register";
AppMain.requestManagerLoginApi = "UserData?account/register";
AppMain.reqeustGoodsListApi = "LobbyData?award/queryPage";
AppMain.requestExchangeApi = "LobbyData?award/exchange";
AppMain.requestTaskListApi = "LobbyData?task/queryPage";
AppMain.requestRecieveTaskApi = "LobbyData?task/receive";
AppMain.requestMoneyLogApi = "UserData?userlog/queryMoneyLog";
AppMain.requestTaskLogApi = "UserData?userlog/queryTaskLog";
AppMain.requestAchievementLogApi = "UserData?userlog/queryAchievementLog";
AppMain.requestPublishTaskApi = "LobbyData?task/add";
AppMain.requestPublishAwardApi = "LobbyData?award/add";
AppMain.requestDeleteAwardApi = "LobbyData?award/delete";
AppMain.requestCloseTaskApi = "LobbyData?task/close";
AppMain.uploadImageApi = "FileUtils?file/upload";
AppMain.Instance.init();
//# sourceMappingURL=LayaUISample.js.map