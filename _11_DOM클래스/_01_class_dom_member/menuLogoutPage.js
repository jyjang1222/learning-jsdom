
import{Main} from "./_main.js";

export class MenuLogoutPage{
    constructor(){
        
    }
    excute(data){
        console.log("MenuLogoutPage");
        this.$tag = document.querySelector("#content");  

        var tag = "";
        tag += `     
            <h3>로그 아웃<h3>        
        `;
        this.$tag.innerHTML = (tag);
    }
}