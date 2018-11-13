
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class achievementUI extends View {
		public unAchieved:Laya.Image;
		public unAchievedLab:Laya.Label;
		public achieved:Laya.Image;
		public achievedLab:Laya.Label;
		public all:Laya.Image;
		public allLab:Laya.Label;
		public list:Laya.List;
		public exit:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":750,"top":0,"right":0,"left":0,"height":1334,"bottom":0},"child":[{"type":"Image","props":{"x":0,"top":0,"skin":"smileStar/color_ffffff.png","right":0,"left":0,"bottom":0,"sizeGrid":"8,8,8,8"}},{"type":"Image","props":{"y":69,"width":200,"var":"unAchieved","skin":"smileStar/color_d9d9d9.png","height":60,"centerX":0,"sizeGrid":"8,8,8,8"},"child":[{"type":"Label","props":{"var":"unAchievedLab","valign":"middle","top":0,"text":"待完成","right":0,"left":0,"fontSize":28,"font":"SimHei","color":"#004493","bottom":0,"align":"center"}}]},{"type":"Image","props":{"y":69,"width":200,"var":"achieved","skin":"smileStar/color_d9d9d9.png","height":60,"centerX":200,"sizeGrid":"8,8,8,8"},"child":[{"type":"Label","props":{"y":0,"x":-475,"var":"achievedLab","valign":"middle","top":0,"text":"已完成","right":0,"left":0,"fontSize":28,"font":"SimHei","color":"#004493","bottom":0,"align":"center"}}]},{"type":"Image","props":{"y":69,"width":200,"var":"all","skin":"smileStar/color_41daf8.png","height":60,"centerX":-200,"sizeGrid":"8,8,8,8"},"child":[{"type":"Label","props":{"var":"allLab","valign":"middle","top":0,"text":"成就总览","right":0,"left":0,"fontSize":28,"font":"SimHei","color":"#ffffff","bottom":0,"align":"center"}}]},{"type":"Image","props":{"width":160,"top":150,"skin":"smileStar/color_d9d9d9.png","height":40,"centerX":-270,"sizeGrid":"8,8,8,8"},"child":[{"type":"Label","props":{"valign":"middle","top":0,"text":"成就名称","right":0,"left":0,"fontSize":20,"font":"SimHei","color":"#000000","bottom":0,"align":"center"}}]},{"type":"Image","props":{"width":160,"top":150,"skin":"smileStar/color_d9d9d9.png","height":40,"centerX":-90,"sizeGrid":"8,8,8,8"},"child":[{"type":"Label","props":{"valign":"middle","top":0,"text":"达成条件","right":0,"left":0,"fontSize":20,"font":"SimHei","color":"#000000","bottom":0,"align":"center"}}]},{"type":"Image","props":{"width":160,"top":150,"skin":"smileStar/color_d9d9d9.png","height":40,"centerX":90,"sizeGrid":"8,8,8,8"},"child":[{"type":"Label","props":{"valign":"middle","top":0,"text":"微币奖励","right":0,"left":0,"fontSize":20,"font":"SimHei","color":"#000000","bottom":0,"align":"center"}}]},{"type":"Image","props":{"width":160,"top":150,"skin":"smileStar/color_d9d9d9.png","height":40,"centerX":270,"sizeGrid":"8,8,8,8"},"child":[{"type":"Label","props":{"valign":"middle","top":0,"text":"完成状态","right":0,"left":0,"fontSize":20,"font":"SimHei","color":"#000000","bottom":0,"align":"center"}}]},{"type":"List","props":{"x":0,"var":"list","vScrollBarSkin":"smileStar/vscroll.png","top":200,"right":0,"left":0,"bottom":0},"child":[{"type":"Box","props":{"right":0,"renderType":"render","left":0,"height":80},"child":[{"type":"Label","props":{"width":120,"valign":"middle","text":"富甲一方","name":"name","height":40,"fontSize":24,"font":"SimHei","centerY":0,"centerX":-275,"align":"center"}},{"type":"Label","props":{"width":220,"valign":"middle","text":"获得至少2季度全勤","overflow":"scroll","name":"condition","height":40,"fontSize":24,"font":"SimHei","color":"#000000","centerY":0,"centerX":-95,"align":"center"}},{"type":"Label","props":{"width":120,"valign":"middle","text":"200微币","name":"award","height":40,"fontSize":24,"font":"SimHei","centerY":0,"centerX":85,"align":"center"}},{"type":"Label","props":{"width":120,"valign":"middle","text":"已完成","name":"status","height":40,"fontSize":24,"font":"SimHei","centerY":0,"centerX":265,"align":"center"}}]}]},{"type":"Label","props":{"width":100,"var":"exit","valign":"top","top":10,"text":"退出","right":10,"height":60,"fontSize":30,"font":"Microsoft YaHei","color":"#000000","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.achievementUI.uiView);

        }

    }
}

module ui {
    export class loginUI extends View {
		public root:Laya.Box;
		public loginView:Laya.Box;
		public login_account:Laya.TextInput;
		public login_pwd:Laya.TextInput;
		public loginBtn:Laya.Button;
		public registBtn:Laya.Button;
		public mangerBtn:Laya.Button;
		public registView:Laya.Box;
		public regist_account:Laya.TextInput;
		public regist_pwd:Laya.TextInput;
		public confirm_pwd:Laya.TextInput;
		public backBtn:Laya.Button;
		public registBtn2:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"top":0,"skin":"smileStar/color_41daf8.png","right":0,"left":0,"bottom":0,"sizeGrid":"8,8,8,8"}},{"type":"Box","props":{"width":750,"visible":false,"var":"root","height":1334,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"y":546,"x":176,"var":"loginView","centerY":50,"centerX":0},"child":[{"type":"Label","props":{"y":5,"width":150,"text":"佣兵编号：","height":40,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":75,"width":150,"text":"佣兵密令：","height":40,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"TextInput","props":{"x":156,"width":240,"var":"login_account","type":"text","skin":"smileStar/color_efefef.png","prompt":"  请输入账号","height":50,"fontSize":24,"font":"Microsoft YaHei","color":"#000000","sizeGrid":"8,8,8,8"}},{"type":"TextInput","props":{"y":70,"x":156,"width":240,"var":"login_pwd","type":"password","skin":"smileStar/color_efefef.png","prompt":"  请输入密码","height":50,"fontSize":24,"font":"Microsoft YaHei","color":"#000000","sizeGrid":"8,8,8,8"}},{"type":"Button","props":{"y":190,"width":180,"var":"loginBtn","stateNum":1,"skin":"smileStar/color_efefef.png","labelSize":24,"labelFont":"Microsoft YaHei","label":"登陆","height":60,"sizeGrid":"8,8,8,8"}},{"type":"Button","props":{"y":190,"x":216,"width":180,"var":"registBtn","stateNum":1,"skin":"smileStar/color_efefef.png","labelSize":24,"labelFont":"Microsoft YaHei","label":"注册","height":60,"sizeGrid":"8,8,8,8"}},{"type":"Button","props":{"y":283,"x":218,"width":180,"var":"mangerBtn","stateNum":1,"skin":"smileStar/color_efefef.png","labelSize":24,"labelFont":"Microsoft YaHei","label":"神秘人登陆","height":60,"sizeGrid":"8,8,8,8"}}]},{"type":"Box","props":{"y":547,"x":177,"visible":false,"var":"registView","centerY":25,"centerX":0},"child":[{"type":"Label","props":{"y":5,"width":150,"text":"佣兵编号：","height":40,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":75,"width":150,"text":"佣兵密令：","height":40,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"TextInput","props":{"x":156,"width":240,"var":"regist_account","type":"text","skin":"smileStar/color_efefef.png","prompt":"  请输入账号","height":50,"fontSize":24,"font":"Microsoft YaHei","color":"#000000","sizeGrid":"8,8,8,8"}},{"type":"TextInput","props":{"y":70,"x":156,"width":240,"var":"regist_pwd","type":"password","skin":"smileStar/color_efefef.png","prompt":"  请输入密码","height":50,"fontSize":24,"font":"Microsoft YaHei","color":"#000000","sizeGrid":"8,8,8,8"}},{"type":"Label","props":{"y":150,"x":0,"width":150,"text":"确认密令：","height":40,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"TextInput","props":{"y":145,"x":156,"width":240,"var":"confirm_pwd","type":"password","skin":"smileStar/color_efefef.png","prompt":"  请确认密码","height":50,"fontSize":24,"font":"Microsoft YaHei","color":"#000000","sizeGrid":"8,8,8,8"}},{"type":"Button","props":{"y":230,"x":0,"width":180,"var":"backBtn","stateNum":1,"skin":"smileStar/color_efefef.png","labelSize":24,"labelFont":"Microsoft YaHei","label":"返回","height":60,"sizeGrid":"8,8,8,8"}},{"type":"Button","props":{"y":230,"x":216,"width":180,"var":"registBtn2","stateNum":1,"skin":"smileStar/color_efefef.png","labelSize":24,"labelFont":"Microsoft YaHei","label":"注册","height":60,"sizeGrid":"8,8,8,8"}}]},{"type":"Label","props":{"y":368,"x":150,"text":"SmileStar","height":199,"fontSize":100,"font":"Microsoft YaHei","color":"#f9f9f9","centerY":-200,"centerX":0,"bold":false,"align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.loginUI.uiView);

        }

    }
}

module ui {
    export class mainPageUI extends View {
		public container:Laya.Image;
		public head:Laya.Image;
		public title:Laya.Label;
		public foot:Laya.Image;
		public profileBtn:Laya.Image;
		public mailBtn:Laya.Image;
		public taskBtn:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"x":0,"var":"container","top":100,"skin":"smileStar/color_d9d9d9.png","right":0,"left":0,"bottom":120,"sizeGrid":"8,8,8,8"}},{"type":"Image","props":{"var":"head","top":0,"skin":"smileStar/color_41daf8.png","right":0,"left":0,"hitTestPrior":false,"height":100,"sizeGrid":"8,8,8,8"},"child":[{"type":"Label","props":{"width":300,"var":"title","valign":"top","text":"不可描述","height":80,"fontSize":60,"font":"Microsoft YaHei","color":"#efefef","centerY":0,"centerX":0,"align":"center"}}]},{"type":"Image","props":{"var":"foot","skin":"smileStar/color_41daf8.png","right":0,"left":0,"hitTestPrior":false,"height":120,"bottom":0,"sizeGrid":"8,8,8,8"},"child":[{"type":"Image","props":{"width":72,"var":"profileBtn","skin":"smileStar/screening_icon_dynamic_default@2x.png","height":72,"centerY":0,"centerX":200}},{"type":"Image","props":{"width":72,"var":"mailBtn","skin":"smileStar/screening_icon_good_default@2x.png","height":72,"centerY":0,"centerX":-200}},{"type":"Image","props":{"width":72,"var":"taskBtn","skin":"smileStar/screening_icon_shangjia_default.png@2x.png","height":72,"centerY":0,"centerX":0}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.mainPageUI.uiView);

        }

    }
}

module ui {
    export class mallUI extends View {
		public goodsList:Laya.List;

        public static  uiView:any ={"type":"View","props":{"width":750,"top":0,"scaleY":1,"scaleX":1,"right":0,"left":0,"hitTestPrior":false,"height":1334,"bottom":0},"child":[{"type":"List","props":{"x":10,"var":"goodsList","vScrollBarSkin":"smileStar/vscroll.png","top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Box","props":{"width":186,"renderType":"render","height":300},"child":[{"type":"Image","props":{"y":2,"x":2,"top":2,"skin":"smileStar/color_ffffff.png","right":2,"left":2,"bottom":2,"sizeGrid":"8,8,8,8"}},{"type":"Image","props":{"y":10,"x":10,"top":10,"right":10,"name":"img","left":10,"bottom":60}},{"type":"Label","props":{"y":245,"x":20,"text":"99999","right":20,"name":"desc","left":20,"height":50,"fontSize":32,"font":"Microsoft YaHei","bottom":5,"align":"center"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.mallUI.uiView);

        }

    }
}

module ui {
    export class manageAwardUI extends View {
		public exit:Laya.Label;
		public mngTask:Laya.Button;
		public goodsList:Laya.List;
		public selectedImg:Laya.Image;
		public chooseImg:Laya.Button;
		public awardVal:Laya.TextInput;
		public awardCount:Laya.TextInput;
		public publishBtn:Laya.Button;
		public awardName:Laya.TextInput;

        public static  uiView:any ={"type":"View","props":{"width":750,"top":0,"right":0,"left":0,"height":1334,"bottom":0},"child":[{"type":"Image","props":{"y":30,"x":30,"top":0,"skin":"smileStar/color_d9d9d9.png","right":0,"left":0,"hitTestPrior":false,"height":100,"sizeGrid":"8,8,8,8"},"child":[{"type":"Label","props":{"width":300,"valign":"middle","text":"宝藏管理","height":80,"fontSize":42,"font":"SimHei","color":"#000000","centerY":0,"centerX":0,"align":"center"}},{"type":"Label","props":{"width":100,"var":"exit","valign":"middle","text":"退出","right":20,"height":80,"fontSize":36,"font":"SimHei","color":"#000000","centerY":0,"align":"center"}}]},{"type":"Image","props":{"y":30,"x":30,"skin":"smileStar/color_d9d9d9.png","right":0,"left":0,"hitTestPrior":false,"height":100,"bottom":0,"sizeGrid":"8,8,8,8"},"child":[{"type":"Button","props":{"width":160,"var":"mngTask","stateNum":1,"skin":"smileStar/color_ffffff.png","right":20,"labelSize":24,"labelFont":"SimHei","label":"管理任务","height":60,"centerY":0,"sizeGrid":"8,8,8,8"}}]},{"type":"Image","props":{"y":20,"x":30,"top":100,"skin":"smileStar/color_d9d9d9.png","right":0,"left":0,"bottom":100,"sizeGrid":"8,8,8,8"},"child":[{"type":"Image","props":{"top":10,"skin":"smileStar/color_ffffff.png","right":10,"left":10,"height":500,"sizeGrid":"8,8,8,8"},"child":[{"type":"List","props":{"var":"goodsList","top":20,"right":0,"left":0,"hitTestPrior":false,"hScrollBarSkin":"comp/hscroll.png","bottom":20},"child":[{"type":"Box","props":{"x":10,"width":220,"top":0,"renderType":"render","hitTestPrior":false,"height":420},"child":[{"type":"Image","props":{"top":2,"skin":"smileStar/color_ffffff.png","right":2,"left":2,"bottom":2,"sizeGrid":"8,8,8,8"}},{"type":"Image","props":{"top":10,"right":10,"name":"img","mouseEnabled":false,"left":10,"height":300}},{"type":"Label","props":{"text":"name","right":20,"name":"name","mouseEnabled":false,"left":20,"height":50,"fontSize":32,"font":"Microsoft YaHei","bottom":55,"align":"center"}},{"type":"Button","props":{"stateNum":1,"skin":"smileStar/color_d9d9d9.png","right":20,"name":"deleteBtn","left":20,"labelSize":24,"labelFont":"Microsoft YaHei","label":"下架","height":50,"bottom":10,"sizeGrid":"8,8,8,8"}}]}]}]},{"type":"Image","props":{"width":730,"top":610,"skin":"smileStar/color_ffffff.png","right":10,"left":10,"height":574,"bottom":0,"sizeGrid":"8,8,8,8"},"child":[{"type":"Box","props":{"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"width":240,"var":"selectedImg","height":360}},{"type":"Button","props":{"y":385,"x":20,"width":200,"var":"chooseImg","stateNum":1,"skin":"smileStar/color_d9d9d9.png","labelSize":24,"labelFont":"Microsoft YaHei","label":"选择图片","height":60,"sizeGrid":"8,8,8,8"}},{"type":"Label","props":{"y":5,"x":284,"width":200,"text":"输入宝物价值：","height":30,"fontSize":24,"font":"Microsoft YaHei"}},{"type":"TextInput","props":{"y":45,"x":284,"width":260,"var":"awardVal","type":"number","skin":"smileStar/color_d9d9d9.png","prompt":"宝物价值","height":60,"fontSize":24,"font":"Microsoft YaHei","sizeGrid":"8,8,8,8"}},{"type":"Label","props":{"y":60,"x":554,"width":60,"text":"微币","height":30,"fontSize":24,"font":"Microsoft YaHei"}},{"type":"Label","props":{"y":128,"x":284,"width":200,"text":"输入宝物数量：","height":30,"fontSize":24,"font":"Microsoft YaHei"}},{"type":"TextInput","props":{"y":168,"x":284,"width":260,"var":"awardCount","type":"number","skin":"smileStar/color_d9d9d9.png","prompt":"宝物数量","height":60,"fontSize":24,"font":"Microsoft YaHei","sizeGrid":"8,8,8,8"}},{"type":"Label","props":{"y":183,"x":554,"width":60,"text":"个","height":30,"fontSize":24,"font":"Microsoft YaHei"}},{"type":"Button","props":{"y":385,"x":284,"width":200,"var":"publishBtn","stateNum":1,"skin":"smileStar/color_d9d9d9.png","labelSize":24,"labelFont":"Microsoft YaHei","label":"确认上架","height":60,"sizeGrid":"8,8,8,8"}},{"type":"Label","props":{"y":255,"x":284,"width":200,"text":"输入宝物名称：","height":30,"fontSize":24,"font":"Microsoft YaHei"}},{"type":"TextInput","props":{"y":295,"x":284,"width":260,"var":"awardName","skin":"smileStar/color_d9d9d9.png","prompt":"宝物名称","height":60,"fontSize":24,"font":"Microsoft YaHei","sizeGrid":"8,8,8,8"}}]}]},{"type":"Label","props":{"y":550,"text":"上架宝物","fontSize":36,"font":"SimHei","color":"#000000","centerX":0}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.manageAwardUI.uiView);

        }

    }
}

module ui {
    export class manageTaskUI extends View {
		public title:Laya.TextInput;
		public expire:Laya.TextInput;
		public award:Laya.TextInput;
		public needPerson:Laya.TextInput;
		public desc:Laya.TextInput;
		public publishBtn:Laya.Button;
		public publishLogs:Laya.List;
		public exit:Laya.Label;
		public mngGoods:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":750,"top":0,"right":0,"left":0,"height":1334,"bottom":0},"child":[{"type":"Image","props":{"top":100,"skin":"smileStar/color_d9d9d9.png","right":0,"left":0,"bottom":100,"sizeGrid":"8,8,8,8"},"child":[{"type":"Image","props":{"top":10,"skin":"smileStar/color_ffffff.png","right":10,"left":10,"height":460,"sizeGrid":"8,8,8,8"},"child":[{"type":"Box","props":{"width":730,"height":460,"centerY":0,"centerX":0},"child":[{"type":"Label","props":{"y":24,"x":100,"width":160,"valign":"middle","top":24,"text":"任务标题：","left":100,"height":40,"fontSize":28,"font":"SimHei","color":"#000000","align":"left"}},{"type":"Label","props":{"x":100,"width":160,"valign":"middle","top":82,"text":"有效时间：","left":100,"height":40,"fontSize":28,"font":"SimHei","color":"#000000","align":"left"}},{"type":"Label","props":{"x":100,"width":160,"valign":"middle","top":192,"text":"需求人数：","left":100,"height":40,"fontSize":28,"font":"SimHei","color":"#000000","align":"left"}},{"type":"Label","props":{"x":100,"width":160,"valign":"middle","top":138,"text":"微币数量：","left":100,"height":40,"fontSize":28,"font":"SimHei","color":"#000000","align":"left"}},{"type":"Label","props":{"x":100,"width":160,"valign":"middle","top":251,"text":"任务说明：","left":100,"height":40,"fontSize":28,"font":"SimHei","color":"#000000","align":"left"}},{"type":"TextInput","props":{"y":24,"x":280,"width":320,"var":"title","valign":"middle","top":24,"skin":"smileStar/textinput.png","prompt":"任务标题","overflow":"scroll","left":280,"height":40,"fontSize":24,"font":"SimHei","align":"left","sizeGrid":"8,8,8,8"}},{"type":"TextInput","props":{"x":280,"width":320,"var":"expire","valign":"middle","top":82,"skin":"smileStar/textinput.png","prompt":"天，自发布日起","overflow":"scroll","left":280,"height":40,"fontSize":24,"font":"SimHei","align":"left","sizeGrid":"8,8,8,8"}},{"type":"TextInput","props":{"x":280,"width":320,"var":"award","valign":"middle","top":138,"skin":"smileStar/textinput.png","prompt":"请输入奖励微币数量（总数）","overflow":"scroll","left":280,"height":40,"fontSize":24,"font":"SimHei","align":"left","sizeGrid":"8,8,8,8"}},{"type":"TextInput","props":{"x":280,"width":320,"var":"needPerson","valign":"middle","top":192,"skin":"smileStar/textinput.png","prompt":"请输入需求人数","overflow":"scroll","left":280,"height":40,"fontSize":24,"font":"SimHei","align":"left","sizeGrid":"8,8,8,8"}},{"type":"TextInput","props":{"x":280,"width":320,"var":"desc","valign":"top","top":250,"skin":"smileStar/textinput.png","prompt":"任务说明","overflow":"scroll","left":280,"fontSize":24,"font":"SimHei","bottom":80,"align":"left","sizeGrid":"8,8,8,8"}},{"type":"Button","props":{"y":390,"x":560,"width":160,"var":"publishBtn","stateNum":1,"skin":"smileStar/color_d9d9d9.png","right":10,"labelSize":20,"labelFont":"Microsoft YaHei","label":"发布","height":60,"bottom":10,"sizeGrid":"8,8,8,8"}}]}]},{"type":"Image","props":{"top":560,"skin":"smileStar/color_ffffff.png","right":10,"left":10,"bottom":0,"sizeGrid":"8,8,8,8"},"child":[{"type":"List","props":{"var":"publishLogs","vScrollBarSkin":"smileStar/vscroll.png","top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Label","props":{"valign":"middle","text":"任务xyz","right":0,"renderType":"render","left":0,"height":60,"fontSize":28,"font":"SimHei","color":"#222222","align":"center"}}]}]},{"type":"Label","props":{"y":500,"x":20,"text":"发布日志","fontSize":36,"font":"SimHei","color":"#000000"}}]},{"type":"Image","props":{"top":0,"skin":"smileStar/color_d9d9d9.png","right":0,"left":0,"hitTestPrior":false,"height":100,"sizeGrid":"8,8,8,8"},"child":[{"type":"Label","props":{"width":300,"valign":"middle","text":"任务管理","height":80,"fontSize":42,"font":"SimHei","color":"#000000","centerY":0,"centerX":0,"align":"center"}},{"type":"Label","props":{"width":100,"var":"exit","valign":"middle","text":"退出","right":20,"height":80,"fontSize":36,"font":"SimHei","color":"#000000","centerY":0,"align":"center"}}]},{"type":"Image","props":{"y":20,"x":20,"skin":"smileStar/color_d9d9d9.png","right":0,"left":0,"hitTestPrior":false,"height":100,"bottom":0,"sizeGrid":"8,8,8,8"},"child":[{"type":"Button","props":{"width":160,"var":"mngGoods","stateNum":1,"skin":"smileStar/color_ffffff.png","right":20,"labelSize":24,"labelFont":"SimHei","label":"管理宝库","height":60,"centerY":0,"sizeGrid":"8,8,8,8"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.manageTaskUI.uiView);

        }

    }
}

module ui {
    export class msgBoxUI extends View {
		public confirmBtn:Laya.Button;
		public cancelBtn:Laya.Button;
		public okBtn:Laya.Button;
		public msg:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":550,"height":334,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"top":0,"skin":"smileStar/color_ffffff.png","right":0,"left":0,"bottom":0,"sizeGrid":"8,8,8,8"},"child":[{"type":"Button","props":{"width":160,"var":"confirmBtn","top":250,"stateNum":1,"skin":"smileStar/color_d9d9d9.png","left":60,"labelSize":24,"labelFont":"SimHei","label":"确定","height":60,"sizeGrid":"8,8,8,8"}},{"type":"Button","props":{"width":160,"var":"cancelBtn","top":250,"stateNum":1,"skin":"smileStar/color_d9d9d9.png","right":60,"labelSize":24,"labelFont":"SimHei","label":"取消","height":60,"sizeGrid":"8,8,8,8"}},{"type":"Button","props":{"y":10,"width":160,"var":"okBtn","top":250,"stateNum":1,"skin":"smileStar/color_d9d9d9.png","labelSize":24,"labelFont":"SimHei","label":"确定","height":60,"centerX":0,"sizeGrid":"8,8,8,8"}},{"type":"Label","props":{"wordWrap":true,"var":"msg","valign":"middle","top":20,"text":"label","right":40,"overflow":"scroll","left":40,"fontSize":24,"font":"SimHei","color":"#000000","bottom":120,"align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.msgBoxUI.uiView);

        }

    }
}

module ui {
    export class msgImgBoxUI extends View {
		public confirmBtn:Laya.Button;
		public cancelBtn:Laya.Button;
		public okBtn:Laya.Button;
		public msg:Laya.Label;
		public img:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":550,"height":334,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"top":0,"skin":"smileStar/color_ffffff.png","right":0,"left":0,"bottom":0,"sizeGrid":"8,8,8,8"},"child":[{"type":"Button","props":{"width":160,"var":"confirmBtn","top":250,"stateNum":1,"skin":"smileStar/color_d9d9d9.png","left":60,"labelSize":24,"labelFont":"SimHei","label":"确定","height":60,"sizeGrid":"8,8,8,8"}},{"type":"Button","props":{"width":160,"var":"cancelBtn","top":250,"stateNum":1,"skin":"smileStar/color_d9d9d9.png","right":60,"labelSize":24,"labelFont":"SimHei","label":"取消","height":60,"sizeGrid":"8,8,8,8"}},{"type":"Button","props":{"y":10,"width":160,"var":"okBtn","top":250,"stateNum":1,"skin":"smileStar/color_d9d9d9.png","labelSize":24,"labelFont":"SimHei","label":"确定","height":60,"centerX":0,"sizeGrid":"8,8,8,8"}},{"type":"Label","props":{"wordWrap":true,"var":"msg","valign":"middle","top":20,"text":"label","right":40,"overflow":"scroll","left":200,"height":194,"fontSize":24,"font":"SimHei","color":"#000000","bottom":120,"align":"center"}},{"type":"Image","props":{"var":"img","top":20,"right":360,"left":20,"bottom":120}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.msgImgBoxUI.uiView);

        }

    }
}

module ui {
    export class profileUI extends View {
		public info:View;
		public money:Laya.Label;
		public title:Laya.Label;
		public gotoMall:Laya.Button;
		public toAchievements:Laya.Button;
		public secretBtn:Laya.Button;
		public moneyLog:Laya.List;
		public taskLog:Laya.List;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":750,"top":0,"right":0,"left":0,"height":1334,"bottom":0},"child":[{"type":"Image","props":{"y":0,"x":0,"top":0,"skin":"smileStar/color_ffffff.png","right":0,"left":0,"height":223,"sizeGrid":"8,8,8,8"},"child":[{"type":"View","props":{"width":750,"var":"info","height":160,"centerY":0,"centerX":0},"child":[{"type":"Label","props":{"y":72,"x":135,"top":40,"text":"账户余额：","left":110,"fontSize":24,"font":"Microsoft YaHei","color":"#222222"}},{"type":"Label","props":{"y":132,"x":135,"top":100,"text":"我的称号：","left":110,"fontSize":24,"font":"Microsoft YaHei","color":"#222222"}},{"type":"Label","props":{"y":72,"x":255,"width":200,"var":"money","top":40,"text":"100000","left":230,"fontSize":24,"font":"Microsoft YaHei","color":"#222222"}},{"type":"Label","props":{"y":132,"x":255,"width":200,"var":"title","top":100,"text":"初出茅庐","left":230,"fontSize":24,"font":"Microsoft YaHei","color":"#222222"}},{"type":"Button","props":{"y":72,"x":475,"width":120,"var":"gotoMall","top":40,"stateNum":1,"skin":"smileStar/color_d9d9d9.png","left":450,"labelSize":18,"labelFont":"Microsoft YaHei","label":"兑换奖品","height":40,"sizeGrid":"8,8,8,8"}},{"type":"Button","props":{"y":132,"x":475,"width":120,"var":"toAchievements","top":100,"stateNum":1,"skin":"smileStar/color_d9d9d9.png","left":450,"labelSize":18,"labelFont":"Microsoft YaHei","label":"查看成就","height":40,"sizeGrid":"8,8,8,8"}},{"type":"Button","props":{"y":67,"x":625,"width":100,"var":"secretBtn","top":35,"stateNum":1,"skin":"smileStar/color_d9d9d9.png","left":600,"labelSize":18,"labelFont":"Microsoft YaHei","label":"神秘入口","height":100,"sizeGrid":"8,8,8,8"}}]}]},{"type":"Label","props":{"top":246,"text":"微币流水","fontSize":36,"font":"Microsoft YaHei","color":"#000000","centerX":0}},{"type":"Image","props":{"top":310,"skin":"smileStar/color_ffffff.png","right":0,"left":0,"height":410,"sizeGrid":"8,8,8,8"}},{"type":"List","props":{"var":"moneyLog","vScrollBarSkin":"smileStar/vscroll.png","top":310,"right":0,"left":0,"height":400},"child":[{"type":"Label","props":{"text":"12345678901234567890","right":0,"renderType":"render","left":0,"height":60,"fontSize":38,"font":"Microsoft YaHei","align":"center"}}]},{"type":"Label","props":{"top":740,"text":"任务日志","fontSize":36,"font":"Microsoft YaHei","color":"#000000","centerX":0}},{"type":"Image","props":{"top":800,"skin":"smileStar/color_ffffff.png","right":0,"left":0,"bottom":0,"sizeGrid":"8,8,8,8"}},{"type":"List","props":{"var":"taskLog","vScrollBarSkin":"smileStar/vscroll.png","top":820,"right":0,"left":0,"bottom":0},"child":[{"type":"Label","props":{"y":0,"x":0,"text":"12345678901234567890","right":0,"renderType":"render","left":0,"height":60,"fontSize":38,"font":"Microsoft YaHei","align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.profileUI.uiView);

        }

    }
}

module ui {
    export class taskUI extends View {
		public taskList:Laya.List;

        public static  uiView:any ={"type":"View","props":{"width":750,"top":0,"right":0,"left":0,"height":1334,"bottom":0},"child":[{"type":"List","props":{"var":"taskList","vScrollBarSkin":"smileStar/vscroll.png","top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Box","props":{"right":0,"renderType":"render","left":0,"height":240},"child":[{"type":"Image","props":{"y":2,"x":0,"top":2,"skin":"smileStar/color_ffffff.png","right":0,"left":0,"bottom":2,"sizeGrid":"8,8,8,8"}},{"type":"Label","props":{"y":20,"x":20,"top":20,"text":"任务名称：","mouseEnabled":false,"left":20,"fontSize":24,"font":"Microsoft YaHei","color":"#222222"}},{"type":"Label","props":{"y":57,"x":20,"top":57,"text":"需求人数：","mouseEnabled":false,"left":20,"fontSize":24,"font":"Microsoft YaHei","color":"#222222"}},{"type":"Label","props":{"y":95,"x":20,"top":95,"text":"剩余名额：","mouseEnabled":false,"left":20,"fontSize":24,"font":"Microsoft YaHei","color":"#222222"}},{"type":"Label","props":{"y":132,"x":20,"top":132,"text":"发布时间：","mouseEnabled":false,"left":20,"fontSize":24,"font":"Microsoft YaHei","color":"#222222"}},{"type":"Label","props":{"y":169,"x":20,"top":169,"text":"发  布  人：","mouseEnabled":false,"left":20,"fontSize":24,"font":"Microsoft YaHei","color":"#222222"}},{"type":"Label","props":{"top":57,"text":"任务说明","mouseEnabled":false,"left":385,"fontSize":24,"font":"Microsoft YaHei","color":"#222222"}},{"type":"Label","props":{"y":20,"x":140,"width":160,"top":20,"name":"taskName","mouseEnabled":false,"left":140,"height":20,"fontSize":24,"font":"Microsoft YaHei","color":"#222222"}},{"type":"Label","props":{"y":57,"x":140,"width":160,"top":57,"name":"chances","mouseEnabled":false,"left":140,"height":20,"fontSize":24,"font":"Microsoft YaHei","color":"#222222"}},{"type":"Label","props":{"y":95,"x":140,"width":160,"top":95,"name":"leftChance","mouseEnabled":false,"left":140,"height":20,"fontSize":24,"font":"Microsoft YaHei","color":"#222222"}},{"type":"Label","props":{"y":132,"x":140,"width":160,"top":132,"name":"publisDate","mouseEnabled":false,"left":140,"height":20,"fontSize":24,"font":"Microsoft YaHei","color":"#222222"}},{"type":"Label","props":{"y":169,"x":140,"width":160,"top":169,"name":"publisher","mouseEnabled":false,"left":140,"height":20,"fontSize":24,"font":"Microsoft YaHei","color":"#222222"}},{"type":"Label","props":{"top":95,"right":20,"name":"taskDesc","mouseEnabled":false,"left":385,"fontSize":24,"font":"Microsoft YaHei","color":"#222222","bottom":48}},{"type":"Button","props":{"y":200,"x":630,"width":100,"visible":false,"stateNum":1,"skin":"smileStar/color_d9d9d9.png","right":20,"name":"getTask","labelSize":18,"labelFont":"Microsoft YaHei","label":"领取","height":30,"bottom":10,"sizeGrid":"8,8,8,8"}},{"type":"Label","props":{"top":20,"text":"任务奖励：","mouseEnabled":false,"left":385,"fontSize":24,"font":"Microsoft YaHei","color":"#222222"}},{"type":"Label","props":{"width":160,"top":20,"name":"awardDesc","mouseEnabled":false,"left":500,"height":20,"fontSize":24,"font":"Microsoft YaHei","color":"#222222"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.taskUI.uiView);

        }

    }
}

module ui.test {
    export class manageUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"x":10,"top":100,"skin":"smileStar/color_d9d9d9.png","right":0,"left":0,"bottom":100,"sizeGrid":"8,8,8,8"},"child":[{"type":"Image","props":{"top":10,"skin":"smileStar/color_ffffff.png","right":10,"left":10,"height":460,"sizeGrid":"8,8,8,8"},"child":[{"type":"Label","props":{"width":160,"valign":"middle","top":24,"text":"微币数量：","left":100,"height":40,"fontSize":28,"font":"SimHei","color":"#000000","align":"left"}},{"type":"Label","props":{"width":160,"valign":"middle","top":84,"text":"需求人数：","left":100,"height":40,"fontSize":28,"font":"SimHei","color":"#000000","align":"left"}},{"type":"Label","props":{"x":10,"width":160,"valign":"middle","top":144,"text":"任务说明：","left":100,"height":40,"fontSize":28,"font":"SimHei","color":"#000000","align":"left"}},{"type":"TextInput","props":{"width":320,"valign":"middle","top":24,"skin":"smileStar/textinput.png","prompt":"请输入奖励微币数量（总数）","overflow":"scroll","left":280,"height":40,"fontSize":24,"font":"SimHei","align":"left","sizeGrid":"8,8,8,8"}},{"type":"TextInput","props":{"x":10,"width":320,"valign":"middle","top":84,"skin":"smileStar/textinput.png","prompt":"请输入需求人数","overflow":"scroll","left":280,"height":40,"fontSize":24,"font":"SimHei","align":"left","sizeGrid":"8,8,8,8"}},{"type":"TextInput","props":{"x":20,"width":320,"valign":"top","top":144,"skin":"smileStar/textinput.png","prompt":"任务说明","overflow":"scroll","left":280,"fontSize":24,"font":"SimHei","bottom":80,"align":"left","sizeGrid":"8,8,8,8"}},{"type":"Button","props":{"width":160,"stateNum":1,"skin":"smileStar/color_d9d9d9.png","right":10,"labelSize":20,"labelFont":"SimHei","label":"发布","height":40,"bottom":10,"sizeGrid":"8,8,8,8"}}]},{"type":"Image","props":{"top":560,"skin":"smileStar/color_ffffff.png","right":10,"left":10,"bottom":0,"sizeGrid":"8,8,8,8"},"child":[{"type":"List","props":{"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Label","props":{"valign":"middle","text":"任务xyz","right":0,"renderType":"render","left":0,"height":60,"fontSize":28,"font":"SimHei","color":"#222222","align":"center"}}]}]},{"type":"Label","props":{"y":500,"x":20,"text":"发布日志","fontSize":36,"font":"SimHei","color":"#000000"}}]},{"type":"Image","props":{"y":10,"x":10,"top":0,"skin":"smileStar/color_d9d9d9.png","right":0,"left":0,"hitTestPrior":false,"height":100,"sizeGrid":"8,8,8,8"},"child":[{"type":"Label","props":{"width":300,"valign":"middle","text":"不可描述","height":80,"fontSize":42,"font":"SimHei","color":"#000000","centerY":0,"centerX":0,"align":"center"}},{"type":"Label","props":{"width":100,"valign":"middle","text":"退出","right":20,"height":80,"fontSize":36,"font":"SimHei","color":"#000000","centerY":0,"align":"center"}}]},{"type":"Image","props":{"y":10,"x":10,"skin":"smileStar/color_d9d9d9.png","right":0,"left":0,"hitTestPrior":false,"height":100,"bottom":0,"sizeGrid":"8,8,8,8"},"child":[{"type":"Button","props":{"width":160,"stateNum":1,"skin":"smileStar/color_ffffff.png","right":20,"labelSize":24,"labelFont":"SimHei","label":"管理宝库","height":40,"bottom":30,"sizeGrid":"8,8,8,8"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.test.manageUI.uiView);

        }

    }
}

module ui.test {
    export class TestPageUI extends View {
		public btn:Laya.Button;
		public clip:Laya.Clip;
		public combobox:Laya.ComboBox;
		public tab:Laya.Tab;
		public list:Laya.List;
		public btn2:Laya.Button;
		public check:Laya.CheckBox;
		public radio:Laya.RadioGroup;
		public box:Laya.Box;

        public static  uiView:any ={"type":"View","child":[{"props":{"x":0,"y":0,"skin":"comp/bg.png","sizeGrid":"30,4,4,4","width":600,"height":400},"type":"Image"},{"props":{"x":41,"y":56,"skin":"comp/button.png","label":"点我赋值","width":150,"height":37,"sizeGrid":"4,4,4,4","var":"btn"},"type":"Button"},{"props":{"x":401,"y":56,"skin":"comp/clip_num.png","clipX":10,"var":"clip"},"type":"Clip"},{"props":{"x":220,"y":143,"skin":"comp/combobox.png","labels":"select1,select2,selecte3","selectedIndex":1,"sizeGrid":"4,20,4,4","width":200,"height":23,"var":"combobox"},"type":"ComboBox"},{"props":{"x":220,"y":96,"skin":"comp/tab.png","labels":"tab1,tab2,tab3","var":"tab"},"type":"Tab"},{"props":{"x":259,"y":223,"skin":"comp/vscroll.png","height":150},"type":"VScrollBar"},{"props":{"x":224,"y":223,"skin":"comp/vslider.png","height":150},"type":"VSlider"},{"type":"List","child":[{"type":"Box","child":[{"props":{"skin":"comp/label.png","text":"this is a list","x":26,"y":5,"width":78,"height":20,"fontSize":14,"name":"label"},"type":"Label"},{"props":{"x":0,"y":2,"skin":"comp/clip_num.png","clipX":10,"name":"clip"},"type":"Clip"}],"props":{"name":"render","x":0,"y":0,"width":112,"height":30}}],"props":{"x":452,"y":68,"width":128,"height":299,"vScrollBarSkin":"comp/vscroll.png","repeatX":1,"var":"list"}},{"props":{"x":563,"y":4,"skin":"comp/btn_close.png","name":"close"},"type":"Button"},{"props":{"x":41,"y":112,"skin":"comp/button.png","label":"点我赋值","width":150,"height":66,"sizeGrid":"4,4,4,4","labelSize":30,"labelBold":true,"var":"btn2"},"type":"Button"},{"props":{"x":220,"y":188,"skin":"comp/checkbox.png","label":"checkBox1","var":"check"},"type":"CheckBox"},{"props":{"x":220,"y":61,"skin":"comp/radiogroup.png","labels":"radio1,radio2,radio3","var":"radio"},"type":"RadioGroup"},{"type":"Panel","child":[{"props":{"skin":"comp/image.png"},"type":"Image"}],"props":{"x":299,"y":223,"width":127,"height":150,"vScrollBarSkin":"comp/vscroll.png"}},{"props":{"x":326,"y":188,"skin":"comp/checkbox.png","label":"checkBox2","labelColors":"#ff0000"},"type":"CheckBox"},{"type":"Box","child":[{"props":{"y":70,"skin":"comp/progress.png","width":150,"height":14,"sizeGrid":"4,4,4,4","name":"progress"},"type":"ProgressBar"},{"props":{"y":103,"skin":"comp/label.png","text":"This is a Label","width":137,"height":26,"fontSize":20,"name":"label"},"type":"Label"},{"props":{"y":148,"skin":"comp/textinput.png","text":"textinput","width":150,"name":"input"},"type":"TextInput"},{"props":{"skin":"comp/hslider.png","width":150,"name":"slider"},"type":"HSlider"},{"props":{"y":34,"skin":"comp/hscroll.png","width":150,"name":"scroll"},"type":"HScrollBar"}],"props":{"x":41,"y":197,"var":"box"}}],"props":{"width":600,"height":400}};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.test.TestPageUI.uiView);

        }

    }
}
