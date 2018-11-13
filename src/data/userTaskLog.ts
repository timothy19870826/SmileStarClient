/*
* name;
*/
module data{
	export class userTaskLog{
        
        public id: number;
        public taskId: number;
        public state: number; // 1：进行中，2：已结束，3：已过期
        public uid: number;
        public name: string;
        public date: number;

        constructor(){

        }
    }
}