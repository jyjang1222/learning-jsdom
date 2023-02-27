import { NodeMember } from "./nodeMember.js";

export class ManagerMember{
    static instance = new ManagerMember()
    static getInstance(){
        return ManagerMember.instance;
    }

    start(){
        this.memberList = [];
        // 샘플로 관리자를 저장한다. 
        var admin = new NodeMember();
        admin.number = 1001;
        admin.id = "admin";
        admin.pw = "admin";
        this.memberList.push(admin);
    }

    putMember(data){
        var member = new NodeMember();
        var lastNumber = this.getLastNumber();
        member.number= lastNumber + 1;
        member.id = data[0];
        member.pw = data[1];
        this.memberList.push(member);
    }

    loginMember(data){
        console.log(data , this.memberList);
        for (var i in this.memberList){
            var member = this.memberList[i];
            if(data[0] == member.id && data[1] == member.pw){
                return member;
            }
        }
        return null;
    }

    getLastNumber(){
        var mx = 0;
        for (var i in this.memberList){
            if (mx < this.memberList[i].number){
                mx = this.memberList[i].number;
            }
        }
        return mx;
    }

}