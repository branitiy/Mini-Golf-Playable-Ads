class Ball extends Phaser.GameObjects.Container {
    constructor(scene, config, canvasCenter, scale) {
        super(scene);
        scene.add.existing(this);

        this.scene = scene;
        this.config = config;
        this.canvasCenter = canvasCenter;
        this.scale = scale;
        this.pointerDown = false;
        this.angleOfRotation = 0;
        this.events = new Phaser.Events.EventEmitter();
        this.matterContainer = this.scene.matter.add.gameObject(this);

        this.create();
    }

    create() {

        // контейнер
        this.x = this.canvasCenter.x + (this.config.x * this.scale);
        this.y = this.canvasCenter.y + (this.config.y * this.scale);
        this.setSize(50, 50);
        this.setAngle(-90);
        this.setScale(this.scale);

        // мяч
        const ball = new Phaser.GameObjects.Image(this.scene, 0, 0,'ball');

        // стрелка
        this.hit = new Phaser.GameObjects.Image(this.scene, 0, 0,'hit_power', 'hit_power_1');
        this.hit.setAngle(90);
        this.hit.x = this.hit.height;
        this.hit.setVisible(false);

        // добавляем объекты в контейнер
        this.add([this.hit, ball]);

        // устанавливаем физическому контейнеру окружность
        this.matterContainer.setBody({
            type: 'circle',
            radius: 25 * this.scale
        });

        this.matterContainer.setStatic(true);
        this.matterContainer.setInteractive();

        // вешаем событие
        this.matterContainer.on('pointerdown', (pointer) => {
            this.scene.input.manager.touch.capture = true;
            this.focusBall(pointer);
        });

    }

    getAcceleration(pointer) {
        let diffX = (pointer.x - this.x) * 2;
        let diffY = (pointer.y - this.y) * 2;

        if (diffX < 0) {
            diffX = -diffX;
        }

        if (diffY < 0) {
            diffY = -diffY;
        }

        let acceleration = (diffX + diffY) / 5;
        if(acceleration > 25) acceleration = 25;
        return acceleration;
    }

    moveBall(pointer) {
        if(this.pointerDown) {
            this.hit.setVisible(false);
            const acceleration = this.getAcceleration(pointer) * this.scale;
            this.pointerDown = false;
            this.matterContainer.setStatic(false);
            const velocity = this.vectorFromAngle(this.angleOfRotation - 180, 3);
            this.matterContainer.setVelocity(velocity.x * acceleration, velocity.y * acceleration);
            // Мгновенно устанавливает угловую скорость тела. Положение, угол, сила и т. д. не изменяются.
            this.matterContainer.setAngularVelocity(0.005);
            // Устанавливает восстановление физического объекта.
            this.matterContainer.setBounce(1.15);
            // Sets new friction values for this Game Object's Matter Body.
            this.matterContainer.setFriction(0.001);
            this.events.emit('hit');
        }
    }

    focusBall() {
        this.pointerDown = true;
        this.matterContainer.setStatic(true);
        this.hit.setVisible(true);
    }

    changeRotateBall(pointer) {
        if(this.pointerDown) {
            this.angleOfRotation = this.angleFromLineSegment(pointer);
            this.matterContainer.setAngle(this.angleOfRotation - 180);
            this.changeHitPower(pointer);
        }
    }

    changeHitPower(pointer) {
        let acceleration = this.getAcceleration(pointer)
        if(acceleration < 5) {
            this.hit.setFrame('hit_power_1');
        } else if(acceleration > 5 && acceleration < 10) {
            this.hit.setFrame('hit_power_2');
        } else if(acceleration > 10 && acceleration < 15) {
            this.hit.setFrame('hit_power_3');
        } else if(acceleration > 20) {
            this.hit.setFrame('hit_power_4');
        }
    }

    vectorFromRadian(radian, precision) {
        let x = Math.cos(radian);
        let y = Math.sin(radian);
        if (!precision) {
            return {x: x, y: y};
        }
        return {x: x.toFixed(precision), y: y.toFixed(precision)};
    }

    vectorFromAngle(angle, precision) {
        return this.vectorFromRadian(angle * (Math.PI / 180), precision);
    }

    angleFromLineSegment(pointer) {
        return Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.matterContainer.x, this.matterContainer.y, pointer.x, pointer.y);
    }

    resetBall(x, y) {
        this.x = x;
        this.y = y;
        this.setAlpha(1);
    }

    updateSize(canvasCenter, scale) {
        this.x = canvasCenter.x + this.config.x * scale;
        this.y = canvasCenter.y + this.config.y * scale;
        this.setScale(scale);
    }

}

export default Ball