
import { ManagerMember } from "./mangerMember.js";
import{Main} from "./_main.js";

export class MenuMemberListPage{
    constructor(){
        
    }
    excute(data){
        console.log("MenuMemberListPage");
        var memberList = ManagerMember.getInstance().memberList;
        this.$tag = document.querySelector("#content");  
        var tag = "";
        tag += `     
            <h3>회원 전체 목록 </h3>
            <table border="1">
                <tr>
                    <td>번호</td>
                    <td>아이디</td>
                    <td>비밀번호</td>
                    <td>삭제</td>
                </tr>   
            `;
            for(var i in memberList){
                var member = memberList[i];            
                tag += `
                    <tr>
                        <td>${member.number}</td>
                        <td>${member.id}</td>
                        <td>${member.pw}</td>
                        <td><button>삭제</button></td>
                    </tr>
                `;
            }
            tag +=
            `
            </table>

            <br>
            <button id="btn-mainPage">메인메뉴</button>
        `;
        this.$tag.innerHTML = (tag);

        this.$btn= document.querySelector('#btn-mainPage');
        this.$btn.addEventListener('click', this.mainPage);
            
    }

    mainPage = (event) => {
        Main.getInstance().changePage("menu-mainPage",  null);
    }
}