class Flag {
    constructor(scene, config, canvasCenter, scale) {

        this.scene = scene;
        this.canvasCenter = canvasCenter;
        this.scale = scale;
        this.config = config;

        this.create();
    }

    create() {
        this.image = this.scene.add.image(this.canvasCenter.x + (this.config.x * this.scale), this.canvasCenter.y + (this.config.y * this.scale), 'flag');
        this.image.depth = 2;
        this.image.setScale(this.scale);
        this.image.setAngle(5);
    }

    updateSize(canvasCenter, scale) {
        this.image.x = canvasCenter.x + this.config.x * scale;
        this.image.y = canvasCenter.y + this.config.y * scale;
        this.image.setScale(scale);
    }
}

export default Flag;