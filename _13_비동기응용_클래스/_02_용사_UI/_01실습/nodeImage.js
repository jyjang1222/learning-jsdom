
export class NodeImage {

    constructor(width, height, imagePath) {
        this.image = new Image();

        this.image.width = width;
        this.image.height = height;
        this.image.imagePath = imagePath;
    }

}