
import{Main} from "./_main.js";
import { ManagerMember } from "./mangerMember.js";

export class MenuJoinForm{
    constructor(){

    }
    excute(data){

        this.$tag = document.querySelector("#content");  

        var tag = "";
        tag += `     
            <h3>회원가입<h3>
            <table border="1">
                <tr>
                    <td>아이디</td>
                    <td><input id="data-id"></td>
                </tr>
                <tr>
                    <td>비밀번호</td>
                    <td><input id="data-pw"></td;
                </tr>
                <tr>
                    <td><button id="btn-joinPro">회원가입</button></td>
                </tr>
            </table>

            <br>
            <button id="btn-mainPage">메인메뉴</button>
        `;
        this.$tag.innerHTML = (tag);

        this.$btn= document.querySelector('#btn-joinPro');
        this.$btn.addEventListener('click', this.joinPro);    

        this.$btn= document.querySelector('#btn-mainPage');
        this.$btn.addEventListener('click', this.mainPage);    
    }

    joinPro = (event) => {
        var id= document.querySelector('#data-id').value;
        var pw= document.querySelector('#data-pw').value;
        var data = [];
        data.push(id);
        data.push(pw);
        ManagerMember.getInstance().putMember(data);
        alert("회원가입을 축하합니다");
        Main.getInstance().changePage("menu-mainPage" , null);
     
    }


    mainPage = (event) => {
        Main.getInstance().changePage("menu-mainPage",  null);
    }
}