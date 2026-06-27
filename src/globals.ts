import Decimal from 'break_eternity.js';
import { player } from './core/player';

declare global {
	interface Window {
		player?: typeof player;
		Decimal?: typeof Decimal;
	}
}
export function injectToGlobal() {
	window.player = player;
	window.Decimal = Decimal;
}
