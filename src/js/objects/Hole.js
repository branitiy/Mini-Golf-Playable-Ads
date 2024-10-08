class Hole extends Phaser.GameObjects.Container {
    constructor(scene, config, canvasCenter, scale) {
        super(scene);
        scene.add.existing(this);

        this.scene = scene;
        this.config = config;
        this.canvasCenter = canvasCenter;
        this.scale = scale;

        this.matterContainer = this.scene.matter.add.gameObject(this);
        this.events = new Phaser.Events.EventEmitter();

        this.create();
    }

    create() {

        // контейнер
        this.x = this.canvasCenter.x + (this.config.x * this.scale);
        this.y = this.canvasCenter.y + (this.config.y * this.scale);
        this.setSize(90, 90);
        this.setScale(this.scale);

        // лунка
        const hole = new Phaser.GameObjects.Image(this.scene, 0, 0,'hole');
        this.add(hole);

        // физический контейнер
        this.matterContainer.setBody({
            type: 'circle',
            radius: 20 * this.scale
        });

        this.matterContainer.setSensor(true);

        this.matterContainer.setOnCollide(pair => {

            let speed = Math.sqrt(Math.pow(pair.bodyB.gameObject.body.velocity.x, 2) + Math.pow(pair.bodyB.gameObject.body.velocity.y, 2), 5);

            if(speed < 3) speed = 3;
            if(speed > 5) speed = 5;

            pair.bodyB.gameObject.setStatic(true);

            this.scene.tweens.add({
                targets: pair.bodyB.gameObject,
                x: pair.bodyA.gameObject.x,
                y: pair.bodyA.gameObject.y,
                alpha : 0,
                ease: 'Bounce',
                duration: 1000 / speed,
                onComplete: () => {
                    this.events.emit('hittingHole');
                }
            });

        });

    }

    updateSize(canvasCenter, scale) {
        this.x = canvasCenter.x + this.config.x * scale;
        this.y = canvasCenter.y + this.config.y * scale;
        this.setScale(scale);
    }


}

export default Hole