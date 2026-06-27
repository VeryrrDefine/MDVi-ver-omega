import Decimal from 'break_eternity.js';
import { player } from './player';

export function tesseractGain() {
	if (player.volumes.lt(1e12)) return new Decimal(0);
	let b =  player.volumes.div(1e12).root(3)
	
	if (player.buyables.t5.gte(1))
		b = b.mul(10);
	
	return b.floor();
}

export function tesseractReset() {
	if (player.volumes.lt(1e12)) return;
	player.tesseracts = player.tesseracts.add(tesseractGain());
	for (let i = 0; i < player.dimensions.length; i++) {
		player.dimensions[i][0] = new Decimal(0);
		player.dimensions[i][1] = new Decimal(0);
	}
	player.volumes = new Decimal(10);
}
