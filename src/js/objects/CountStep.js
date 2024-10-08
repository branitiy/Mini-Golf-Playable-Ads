class CountStep extends Phaser.GameObjects.Container {

    titleBestResult = 'Лучший результат: ';
    titleStep = 'Ход: ';
    bestResult = 0;
    step = 0;

    constructor(scene, config, canvasCenter, scale) {
        super(scene);
        scene.add.existing(this);

        this.scene = scene;
        this.config = config;
        this.canvasCenter = canvasCenter;
        this.scale = scale;

        this.create();
    }

    create() {
        this.x = this.canvasCenter.x + (this.config.x * this.scale);
        this.y = this.canvasCenter.y + (this.config.y * this.scale);
        this.setScale(this.scale);
        this.textBestResult = this.createText(0, 0, 35, this.titleBestResult + this.bestResult);
        this.textStep = this.createText(0, 50, 50,  this.titleStep + this.step);
    }

    createText(x, y, s, t) {
        const text = new Phaser.GameObjects.Text(this.scene, x, y, t, {
            fontFamily: 'Arial',
            fontSize: s,
            color: '#ffffff'
        });

        text.setStroke('#444444', 10);

        this.add(text);
        return text;
    }

    increaseStep() {
        this.textStep.text = this.titleStep + (++this.step);
    }

    resetStep() {
        this.step = 0;
        this.textStep.text = this.titleStep + this.step;
    }

    setBestResult() {
        if(this.step < this.bestResult || this.bestResult === 0) {
            this.bestResult = this.step;
            this.textBestResult.text = this.titleBestResult + this.bestResult;
        }
    }

    getNumStep() {
        return this.step;
    }

    updateSize(canvasCenter, scale) {
        this.x = canvasCenter.x + this.config.x * scale;
        this.y = canvasCenter.y + this.config.y * scale;
        this.setScale(scale);
    }


}

export default CountStep