
import{Main} from "./_main.js";

export class MenuLogoutPage{
    constructor(){
        
    }
    excute(data){
        console.log("MenuLogoutPage");
        this.$tag = document.querySelector("#content");  

        var tag = "";
        tag += `     
            <h3>๋ก๊ทธ ์์<h3>        
        `;
        this.$tag.innerHTML = (tag);
    }
}