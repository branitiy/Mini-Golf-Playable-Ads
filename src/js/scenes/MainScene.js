import Sizer from "../common/Sizer";
import Ball from "../objects/Ball";
import Hole from "../objects/Hole";
import CountStep from "../objects/CountStep";
import Border from "../objects/Border";
import Flag from "../objects/Flag";
import { levelsConfig } from "../configs/Levels";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({key: 'Main'});
    }

    create() {

        this.levelConfig = levelsConfig[0];

        this.matter.world.disableGravity();

        const shapes = this.cache.json.get('border_shapes');

        this.sizer = new Sizer(this);
        this.canvasCenter = this.sizer.getCanvasCenter();
        const scale = this.sizer.getScale(this.levelConfig.levelWidth, this.levelConfig.levelHeight);

        // бэкграунд
        const {width, height} = this.sizer.getParentSize();
        this.field = this.add.tileSprite(0, 0, width, height, "field_tile");
        this.field.setOrigin(0);

        // бордюр
        this.border = new Border(this, this.levelConfig.border, shapes, this.canvasCenter, scale);

        // лунка
        this.hole = new Hole(this, this.levelConfig.hole, this.canvasCenter, scale);

        // мяч
        this.ball = new Ball(this, this.levelConfig.ball, this.canvasCenter, scale);

        // флаг
        this.flag = new Flag(this, this.levelConfig.flag, this.canvasCenter, scale)

        // счетчик ходов
        this.countStep = new CountStep(this, this.levelConfig.countStep, this.canvasCenter, scale);

        // события ----------------------------------------

        // мяч в лунке
        this.hole.events.on('hittingHole', () => {
            const scale = this.sizer.getScale(this.levelConfig.levelWidth, this.levelConfig.levelHeight);
            this.ball.resetBall(this.canvasCenter.x + this.levelConfig.ball.x * scale, this.canvasCenter.y + this.levelConfig.ball.y * scale);
            this.countStep.setBestResult();
            this.countStep.resetStep();
            //console.log('Игра завершена!')
            if(typeof window.eventTracker !== 'undefined') window.eventTracker.ongameover();
        });

        // удар по мячу
        this.ball.events.on('hit', () => {
            if(!this.countStep.getNumStep()) {
                //console.log('Старт игры!');
                if(typeof window.eventTracker !== 'undefined') window.eventTracker.ongamestart();
            }
            this.countStep.increaseStep();
            //console.log('Шаг: ', this.countStep.getNumStep())
            if(typeof window.eventTracker !== 'undefined') window.eventTracker.turn(this.countStep.getNumStep());

        });

        this.input.on('pointerup', (pointer) => {
            this.ball.moveBall(pointer);
            this.input.manager.touch.capture = false;
        });

        this.input.on('pointermove', (pointer) => {
            this.ball.changeRotateBall(pointer);
        });

        this.input.manager.touch.capture = false;

    }

    resize() {

        const canvasCenter = this.sizer.getCanvasCenter();
        const scale = this.sizer.getScale(this.levelConfig.levelWidth, this.levelConfig.levelHeight);
        const {width, height} = this.sizer.getParentSize();
        this.field.setSize(width, height);
        this.border.updateSize(canvasCenter, scale);
        this.ball.updateSize(canvasCenter, scale);
        this.hole.updateSize(canvasCenter, scale);
        this.flag.updateSize(canvasCenter, scale);
        this.countStep.updateSize(canvasCenter, scale);

        this.canvasCenter.x = canvasCenter.x;
        this.canvasCenter.y = canvasCenter.y;

    }


}