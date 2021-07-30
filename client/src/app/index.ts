import { Game } from 'phaser';
import gameConfig from './config/gameConfig';

function bootstrap() {
  fetch('/api/post/hello')
    .then((response) => {
      if (response.status === 200) {
        return response.text();
      }
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });
  new Game(gameConfig);
}

bootstrap();
