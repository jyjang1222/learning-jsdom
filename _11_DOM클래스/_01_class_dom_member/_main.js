import { MenuMainPage } from "./menuMainPage.js";
import { MenuJoinForm } from "./menuJoinForm.js";
import { MenuLoginForm } from "./menuLoginForm.js";
import { MenuLogoutPage } from "./menuLogoutPage.js";
import { MenuJoinPro } from "./menuJoinPro.js";
import { ManagerMember } from "./mangerMember.js";
import { MenuLoginPro } from "./menuLoginPro.js";
import { MenuMemberListPage } from "./menuMemberListPage.js";

export class Main{
    static instance = new Main()
    static getInstance(){
        return Main.instance;
    }
    start(){
        this.login = null;
        ManagerMember.getInstance().start();

        this.setClassList();
        this.changePage("menu-mainPage" , null);
    }

    setClassList(){
        this.pageList = {};
        this.pageList["menu-mainPage"] = new MenuMainPage();
        this.pageList["menu-joinForm"] = new MenuJoinForm();
        this.pageList["menu-loginForm"] = new MenuLoginForm();
        this.pageList["menu-logoutPage"] = new MenuLogoutPage();
      //  this.pageList["menu-joinPro"] = new MenuJoinPro();
        this.pageList["menu-loginPro"] = new MenuLoginPro();
        this.pageList["menu-memberListPage"] = new MenuMemberListPage();
    }

    changePage(pageName , data){
        this.pageList[pageName].excute(data);
    }
 
}

Main.getInstance().start();
