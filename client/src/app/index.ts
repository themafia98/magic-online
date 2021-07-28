import { Game } from 'phaser';

function bootstrap() {
  new Game({
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
  });
}

bootstrap();
