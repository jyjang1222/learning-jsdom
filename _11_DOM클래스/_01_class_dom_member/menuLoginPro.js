
import { ManagerMember } from "./mangerMember.js";
import { NodeMember } from "./nodeMember.js";
import{Main} from "./_main.js";

export class MenuLoginPro{
    constructor(){

    }
    excute(data){
        console.log(data);
        var member = ManagerMember.getInstance().loginMember(data);
        if(member != null){
            alert("로그인이 성공했습니다.");
            Main.getInstance().login = member.id;
        }else{
            alert("로그인이 실패했습니다.");
            Main.getInstance().changePage("")
        }
    }
}