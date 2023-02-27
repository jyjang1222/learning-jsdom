import {NodeImage} from "./nodeImage.js";

export class ManagerImage {
    // 싱글톤
    static instance = new ManagerImage();
    static getInstance() { return ManagerImage.instance; }
    
    start() {
        this.imageList = {};
        this.managerImageSetList();
    }

    managerImageSetList() {
        this.managerImageSet("타이블_배경화면", 1280, 720, "images/title/타이블_배경화면.png");
    }

    managerImageSet(imageName, width, height, imagePath) {
        let nodeImage = new NodeImage(width, height, imagePath);
        this.imageList[imageName] = nodeImage;
    }

    draw() {
        
    }

}