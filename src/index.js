import Phaser from 'phaser';
import BootScene from './js/scenes/BootScene.js';
import MainScene from './js/scenes/MainScene.js';

function init() {

    const parentPlayableAds = document.getElementById('playable-ads');

    const gameConfig = {
        type: Phaser.AUTO,
        parent: "playable-ads",
        width: parentPlayableAds.clientWidth,
        height: parentPlayableAds.clientHeight,
        backgroundColor: '#333333',
        physics: {
            default: 'matter',
            matter: {
                debug: false
            }
        },
        scene: null,
        input: {
            mouse: {
                preventDefaultWheel: false
            },
            touch: {
                capture: true
            }
        }
    };

    const game = new Phaser.Game(gameConfig);
    game.scene.add("Boot", BootScene);
    game.scene.add("Main", MainScene);
    game.scene.start("Boot");

    const onChangeScreen = () => {
        game.scale.resize(parentPlayableAds.clientWidth, parentPlayableAds.clientHeight);
        if (game.scene.scenes.length > 0) {
            let currentScene = game.scene.scenes[1];
            if (currentScene instanceof MainScene) {
                currentScene.resize();
            } else if (currentScene instanceof MainScene) {

            }
        }
    }

    const initialHeight = window.innerHeight;
    window.addEventListener('resize', () => {
        // если это телефон
        if (!game.device.os.desktop) {
            let heightDiff = initialHeight - window.innerHeight;
            // максимальная высота выезжающих панелей при скроллинге на мобильных устройствах
            // если изменение высоты больше 150 пикселей
            if (heightDiff > 150) {
                onChangeScreen();
            }
        } else { // если нет, ресайзим как обычно
            onChangeScreen();
        }
    });

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'test-events.js';
    document.head.appendChild(script);
}

window.addEventListener('load', init);


