
import { ManagerMember } from "./mangerMember.js";
import { NodeMember } from "./nodeMember.js";
import{Main} from "./_main.js";

export class MenuJoinPro{
    constructor(){

    }
    excute(data){
        ManagerMember.getInstance().putMember(data);
        alert("회원가입을 축하합니다");
        Main.getInstance().changePage("menu-mainPage" , null);
    }
}