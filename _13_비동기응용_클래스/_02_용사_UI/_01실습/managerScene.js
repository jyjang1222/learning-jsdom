import {SceneTitle} from "./sceneTitle.js";

export class ManagerScene {
    // 싱글톤
    static instance = new ManagerScene();
    static getInstance() { return ManagerScene.instance; }

    start() {
        this.sceneList = {};
        this.setScene();

        this.curScene = null;
    }

    setScene() {
        this.sceneList["title"] = new SceneTitle();
    }

    changeScene(sceneName) {
        this.curScene = this.sceneList[sceneName];
        this.curScene.start();      // 이벤트 처리
    }

    draw() {
        this.curScene.draw();
    }

}