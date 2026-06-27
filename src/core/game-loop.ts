import { buyDimension, dimensionLoop, dimensionMult } from './dimensions';
import { player } from './player';

export function volumesGain() {
	let gain = player.dimensions[0][0].mul(dimensionMult(0));

	return gain;
}
export function simulate(tick: number) {
	player.volumes = player.volumes.add(volumesGain().mul(tick / 1000)).clampMax(9.999e39);
	
	dimensionLoop(tick);
}

export function gameLoop() {
	if (player.volumes.gte(9.999e39)) {return;}
	let difference = Date.now() - player.lastTick;
	simulate(difference);
	if (!player.unlockedTesseract && player.volumes.gte(1e12)) {
		player.unlockedTesseract = true;
	}
	if (player.buyables.t7.gte(1)) {
		for (let i = 0; i < 4; i++) {
			buyDimension(i)
		}
	}
	player.lastTick = Date.now();
}
