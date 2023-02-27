
import{Main} from "./_main.js";

export class MenuMainPage{
    constructor(){
        
    }
    excute(data){
        this.$tag = document.querySelector("#content");  

        var tag = "";
        tag += `     
            <button id="btn-joinForm">회원가입</button>
            <button id="btn-loginForm">로그인</button>
            <button id="btn-memberListPage">전체회원목록</button>         
        `;
        this.$tag.innerHTML = (tag);

        this.$btn= document.querySelector('#btn-joinForm');
        this.$btn.addEventListener('click', this.joinForm);
    
        this.$btn= document.querySelector('#btn-loginForm');
        this.$btn.addEventListener('click', this.loginForm);

        this.$btn= document.querySelector('#btn-memberListPage');
        this.$btn.addEventListener('click', this.memberListPage);
    }

    joinForm = (event) => {
        Main.getInstance().changePage("menu-joinForm" , null);
    }

    loginForm = (event) => {
        Main.getInstance().changePage("menu-loginForm" , null);
    }

    memberListPage = (event) => {
        Main.getInstance().changePage("menu-memberListPage" , null);
    }

}   