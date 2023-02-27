
import{Main} from "./_main.js";

export class MenuLoginForm{
    constructor(){
        
    }
    excute(data){
        console.log("MenuLoginForm");
        this.$tag = document.querySelector("#content");  

        var tag = "";
        tag += `     
            <h3>로그인<h3>
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
                    <td><button id="btn-loginPro">로그인</button></td>
                </tr>
            </table>
            <br>
            <button id="btn-mainPage">메인메뉴</button>
        `;
        this.$tag.innerHTML = (tag);

        this.$btn= document.querySelector('#btn-loginPro');
        this.$btn.addEventListener('click', this.loginPro);    

        this.$btn= document.querySelector('#btn-mainPage');
        this.$btn.addEventListener('click', this.mainPage);    

    }

    loginPro = (event) =>{
        var id= document.querySelector('#data-id').value;
        var pw= document.querySelector('#data-pw').value;
        var data = [];
        data.push(id);
        data.push(pw);
        console.log(data);
      
        Main.getInstance().changePage("menu-loginPro",  data);
    }

    mainPage = (event) => {
        Main.getInstance().changePage("menu-mainPage",  null);
    }

}