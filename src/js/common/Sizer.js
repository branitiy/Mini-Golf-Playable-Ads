class Sizer {

    constructor(scene) {
        this.scene = scene;
    }

    getScale(width, height) {
        let scale;
        const scaleW = this.scene.game.scale.parentSize.width / width;
        const scaleH = this.scene.game.scale.parentSize.height / height;
        if (scaleW < scaleH) {
            scale = scaleW;
        } else {
            scale = scaleH;
        }
        return scale;
    }

    getCanvasCenter() {

        const {width, height} = this.getParentSize();

        return {
            x: width / 2,
            y: height / 2
        }
    }

    getParentSize() {
        return this.scene.game.scale.parentSize;
    }

}

export default Sizer;