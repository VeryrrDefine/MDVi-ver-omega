import type Decimal from 'break_eternity.js';
import { player } from './player';
import { format } from '../ui/format';

type CurrencyOption = {
	get(): Decimal;
	set(x: Decimal): void;
	display(): string;
};

export enum Currencies {
	VOLUMES,
	TESSERACTS,
}

export const CurrencyOptions = {
	[Currencies.VOLUMES]: {
		get() {
			return player.volumes;
		},
		set(x: Decimal) {
			player.volumes = x;
		},
		display() {
			return 'm^4 四维体积';
		},
	},
	[Currencies.TESSERACTS]: {
		get() {
			return player.tesseracts;
		},
		set(x: Decimal) {
			player.tesseracts = x;
		},
		display() {
			return '超立方体';
		},
	},
} as const satisfies Record<Currencies, CurrencyOption>;
