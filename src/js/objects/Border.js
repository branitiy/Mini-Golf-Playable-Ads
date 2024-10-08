class Border {
    constructor(scene, config, shapes, canvasCenter, scale) {

        this.scene = scene;
        this.canvasCenter = canvasCenter;
        this.shapes = shapes;
        this.scale = scale;
        this.config = config;
        this.units = [];

        this.create();
    }

    create() {
        this.config.forEach((border) => {
            const matterSprite = this.scene.matter.add.sprite(this.canvasCenter.x + border.x * this.scale, this.canvasCenter.y + border.y * this.scale, 'border', border.frame, {shape: this.shapes[border.frame]});
            matterSprite.setAngle(border.angle);
            matterSprite.setScale(this.scale)
            this.units.push(matterSprite);
        });
    }

    updateSize(canvasCenter, scale) {
        this.units.forEach((el, i) => {
            el.x = canvasCenter.x + this.config[i].x * scale;
            el.y = canvasCenter.y + this.config[i].y * scale;
            el.setScale(scale)
        });
    }
}

export default Border;