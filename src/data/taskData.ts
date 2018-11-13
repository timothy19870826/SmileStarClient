/**
* name 
*/
module data{
	export class taskData{

		public id: number;
		public name: string;
		public desc: string;
		public needPerson: number;
		public curPerson: number;
		public awardVal: number;
		public state: number; // 1：进行中，2：已结束，3：已过期
		public date: number;
		public publisher: string;

		constructor(){

		}
	}
}