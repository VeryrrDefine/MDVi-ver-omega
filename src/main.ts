import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import { load, save } from './core/player.ts';
import { injectToGlobal } from './globals.ts';
import { gameLoop } from './core/game-loop.ts';
import { temp } from './core/temp.ts';
import { progresses } from './ui/progress.ts';

await load();

const app = createApp(App);
app.mount('#app');

injectToGlobal();
setInterval(save, 3000);
setInterval(gameLoop, 40);
setInterval(() => (temp.progresses = progresses()), 100);
