import test = ui.test.TestPageUI;
import Label = Laya.Label;
import Handler = Laya.Handler;
import Loader = Laya.Loader;
import WebGL = Laya.WebGL;

class AppMain {

	private static sInstance: AppMain = null;
	public static get Instance() {
		if (AppMain.sInstance == null) {
			AppMain.sInstance = new AppMain();
		}
		return AppMain.sInstance;
	}

	public static userData: data.userData = null;
	public static adminData: data.adminData = null;
	public static awardDataList: data.awardData[] = [];
	public static taskDataList: data.taskData[] = [];
	public static userMoneyLogList: data.userMoneyLog[] = [];
	public static userTaskLogList: data.userTaskLog[] = [];
	public static userAchivementList: data.userAchievement[] = [];
	
	public scale: number = 1;
	public hScale: number = 1;
	public vScale: number = 1;
	public init() {
		this.hScale = screen.availWidth * window.devicePixelRatio / 750;
		this.vScale = screen.availHeight * window.devicePixelRatio / 1334;
		this.scale = Math.min(this.hScale, this.vScale);
		//程序入口
		Laya.init(screen.availWidth * window.devicePixelRatio, screen.availHeight * window.devicePixelRatio);
		//Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
		//Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
		//激活资源版本控制
		Laya.ResourceVersion.enable("version.json", Handler.create(this, this.beginLoad), Laya.ResourceVersion.FILENAME_VERSION);
	}

	private beginLoad() {
		Laya.loader.load(["res/atlas/comp.atlas", "res/atlas/smileStar.atlas"], Handler.create(this, this.onLoaded));
	}

	private onLoaded() {
		view.login.open();
	}

	private static API_URL = "http://192.168.1.200:8080/SmileStar/";
	/**
	 * post
	 */
	public post(apiName: string, caller: any, completedListener: Function, errorListener: Function, data: any) {
		var xhr = new Laya.HttpRequest();
		xhr.http.timeout = 0;
		xhr.on(Laya.Event.COMPLETE, caller, completedListener);
		xhr.on(Laya.Event.ERROR, caller, errorListener);
		xhr.send(AppMain.API_URL + apiName, this.toFormData(data), "post");
	}

	private static requestAdminLoginApi: string = "UserData?account/adminLogin";
	/**
	 * requestAdminLogin
	 */
	public requestAdminLogin(caller: any, completedListener: Function, errorListener: Function, data: any) {
		this.post(AppMain.requestAdminLoginApi, caller, completedListener, errorListener, data);
	}

	private static requestLoginApi:string = "UserData?account/login";
	/**
	 * requestLogin
	 */
	public requestLogin(caller: any, completedListener: Function, errorListener: Function, data: any) {
		this.post(AppMain.requestLoginApi, caller, completedListener, errorListener, data);
	}

	private static requestRegistApi:string = "UserData?account/register";
	/**
	 * requestRegist
	 */
	public requestRegist(caller: any, completedListener: Function, errorListener: Function, data: any) {
		this.post(AppMain.requestRegistApi, caller, completedListener, errorListener, data);
	}

	private static requestManagerLoginApi:string = "UserData?account/register";
	/**
	 * requestManagerLogin
	 */
	public requestManagerLogin(caller: any, completedListener: Function, errorListener: Function, data: any) {
		this.post(AppMain.requestRegistApi, caller, completedListener, errorListener, data);
	}

	private static reqeustGoodsListApi:string = "LobbyData?award/queryPage";
	/**
	 * requestGoodsList
	 */
	public requestGoodsList(caller: any, completedListener: Function, errorListener: Function, data: any) {
		this.post(AppMain.reqeustGoodsListApi, caller, completedListener, errorListener, data);
	}

	private static requestExchangeApi:string = "LobbyData?award/exchange";
	/**
	 * requestExchangeAward
	 */
	public requestExchangeAward(caller: any, completedListener: Function, errorListener: Function, data: any) {
		this.post(AppMain.requestExchangeApi, caller, completedListener, errorListener, data);
	}

	private static requestTaskListApi:string = "LobbyData?task/queryPage";
	/**
	 * requestTaskList
	 */
	public requestTaskList(caller: any, completedListener: Function, errorListener: Function, data: any) {
		this.post(AppMain.requestTaskListApi, caller, completedListener, errorListener, data);
	}

	private static requestRecieveTaskApi:string = "LobbyData?task/receive";
	/**
	 * requestRecieveTask
	 */
	public requestRecieveTask(caller: any, completedListener: Function, errorListener: Function, data: any) {
		this.post(AppMain.requestRecieveTaskApi, caller, completedListener, errorListener, data);
	}

	private static requestMoneyLogApi:string = "UserData?userlog/queryMoneyLog";
	/**
	 * requestMoneyLog
	 */
	public requestMoneyLog(caller: any, completedListener: Function, errorListener: Function, data: any) {
		this.post(AppMain.requestMoneyLogApi, caller, completedListener, errorListener, data);
	}

	private static requestTaskLogApi:string = "UserData?userlog/queryTaskLog";
	/**
	 * requestTaskLog
	 */
	public requestTaskLog(caller: any, completedListener: Function, errorListener: Function, data: any) {
		this.post(AppMain.requestTaskLogApi, caller, completedListener, errorListener, data);
	}

	private static requestAchievementLogApi:string = "UserData?userlog/queryAchievementLog";
	/**
	 * reqeustAchievement
	 */
	public requestAchievement(caller: any, completedListener: Function, errorListener: Function, data: any) {
		this.post(AppMain.requestAchievementLogApi, caller, completedListener, errorListener, data);
	}

	private static requestPublishTaskApi:string = "LobbyData?task/add";
	/**
	 * publishTask
	 */
	public publishTask(caller: any, completedListener: Function, errorListener: Function, data: any) {
		this.post(AppMain.requestPublishTaskApi, caller, completedListener, errorListener, data);
	}

	private static requestPublishAwardApi:string = "LobbyData?award/add";
	/**
	 * publishAward
	 */
	public publishAward(caller: any, completedListener: Function, errorListener: Function, data: any) {
		this.post(AppMain.requestPublishAwardApi, caller, completedListener, errorListener, data);
	}

	private static requestDeleteAwardApi:string = "LobbyData?award/delete";
	/**
	 * reqeustDeleteAward
	 */
	public requestDeleteAward(caller: any, completedListener: Function, errorListener: Function, data: any) {
		this.post(AppMain.requestDeleteAwardApi, caller, completedListener, errorListener, data);
	}

	private static requestCloseTaskApi:string = "LobbyData?task/close";
	/**
	 * requestCloseTask
	 */
	public requestCloseTask(caller: any, completedListener: Function, errorListener: Function, data: any) {
		this.post(AppMain.requestCloseTaskApi, caller, completedListener, errorListener, data);
	}

	private static uploadImageApi:string = "FileUtils?file/upload";
	public uploadImage(caller: any, completedListener: Function, errorListener: Function, image: any): void {
		var formData: any = new FormData();
		//var objFile=new File(["First Line Text"],"test.json");
		//formData.append("files", objFile);
		formData.append("files", image);
		var xhr: Laya.HttpRequest = new Laya.HttpRequest();
		xhr.http.timeout = 0;
		xhr.once(Laya.Event.COMPLETE, caller, completedListener);
		xhr.once(Laya.Event.ERROR, caller, errorListener);
		xhr.send(AppMain.API_URL + AppMain.uploadImageApi, formData, "post", null, ["enctype", "multipart/form-data"]);
	}

	private toFormData(data: any) {
		var type: string = Object.prototype.toString.apply(data);
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
				var res = "&"
				for (var key in data) {
					var element = data[key];
					res += key + "=" + element + "&";
				}
				return res.substring(1, res.length - 1);
			default:
			return null;
		}
	}
}

AppMain.Instance.init();