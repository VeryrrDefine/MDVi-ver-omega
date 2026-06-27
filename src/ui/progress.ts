import { player } from '../core/player';
import { format } from './format';

export function progresses(): [number, string] {
	if (player.volumes.lt(1e12) && !player.unlockedTesseract) {
		return [player.volumes.clampMin(1).log10().div(12).toNumber(), `解锁下一层`];
	}if (player.volumes.lt(1e40) && !player.unlockedDarkMatter) {
		return [player.volumes.clampMin(1).log10().div(40).toNumber(), `解锁第二层(1e4 Gm^4)`];
	}
	return [NaN, '???'];
}
