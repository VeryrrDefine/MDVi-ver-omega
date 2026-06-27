import Decimal from 'break_eternity.js';
import { player } from './player';
import { t1, t2, t3 } from './buyables';

export function dimensionCost(id: number) {
	let baseIncrement = new Decimal(10).pow(id + 1);

	return baseIncrement.pow(player.dimensions[id][1].add(1));
}

export function buyDimension(id: number) {
	const cost = dimensionCost(id);
	if (player.volumes.gte(cost)) {
		player.dimensions[id][0] = player.dimensions[id][0].add(1);
		player.dimensions[id][1] = player.dimensions[id][1].add(1);
		if (player.buyables.t7.gte(1)) {} else
		player.volumes = player.volumes.sub(cost);
	}
}

export function dimensionMult(id: number) {
	let base = new Decimal(1.5);
	if (player.buyables.t4.gte(1)) base = new Decimal(1.6);

	base = base.pow(player.dimensions[id][1]);

	if (player.buyables.t1.gte(1) && id == 0) base = base.mul(t1.effect());
	if (player.buyables.t2.gte(1) && id == 3) base = base.mul(t2.effect());
	if (player.buyables.t3.gte(1) && id == 1) base = base.mul(t3.effect());

	return base;
}

export function dimensionLoop(tick: number) {
	for (let i = 3; i >= 1; i--) {
		player.dimensions[i - 1][0] = player.dimensions[i - 1][0].add(
			player.dimensions[i][0].mul(dimensionMult(i)).mul(tick / 1000),
		);
	}
}
