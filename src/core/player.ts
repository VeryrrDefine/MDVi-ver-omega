import Decimal from 'break_eternity.js';
import localforage from 'localforage';
import { reactive } from 'vue';
function initialPlayer() {
	return {
		saveCreateTime: Date.now(),
		lastTick: Date.now(),
		saveID: Math.floor(Math.random() * 2147483648),
		playerID: Math.floor(Math.random() * 2147483648),

		volumes: new Decimal(10),

		dimensions: [
			[new Decimal(0), new Decimal(0)],
			[new Decimal(0), new Decimal(0)],
			[new Decimal(0), new Decimal(0)],
			[new Decimal(0), new Decimal(0)],
		],
		currentTab: 0,

		tesseracts: new Decimal(0),
		unlockedTesseract: false,
unlockedDarkMatter:false,
		buyables: {
			t1: new Decimal(0),
			t2: new Decimal(0),
			t3: new Decimal(0),
			t4: new Decimal(0),
			t5: new Decimal(0),
			t6: new Decimal(0),
			t7: new Decimal(0),
		},
	};
}

export const player: ReturnType<typeof initialPlayer> = reactive(initialPlayer());
const SAVE_ID = 'mdvi-ver-omega';
export function save(info?: string) {
	localforage.setItem(SAVE_ID, JSON.stringify(player));
}

export function deepCopyProps(source: any, target: any) {
	for (const key in source) {
		if (source.hasOwnProperty(key)) {
			// 如果源对象的属性是对象或数组，则递归复制
			if (
				typeof source[key] === 'object' &&
				!(source[key] instanceof Decimal) &&
				source[key] !== null
			) {
				// 如果目标对象没有这个属性，或者属性是null，则创建一个新的
				if (
					!target.hasOwnProperty(key) ||
					target[key] == null ||
					Array.isArray(source[key]) !== Array.isArray(target[key])
				) {
					target[key] = Array.isArray(source[key]) ? [] : {};
				}
				// 递归复制属性
				deepCopyProps(source[key], target[key]);
			} else {
				if (target[key] instanceof Decimal) {
					target[key] = new Decimal(source[key]);
				}
				// 如果属性不是对象或数组，则直接复制
				else target[key] = source[key];
			}
		}
	}
}

export async function load() {
	let target = await localforage.getItem(SAVE_ID);
	if (typeof target === 'string') {
		deepCopyProps(JSON.parse(target), player);
		// Object.assign(player, JSON.parse(target));
	}
}

export function hardReset() {
	Object.assign(player, initialPlayer());
	save('force');
	location.reload();
}

export function hardResetConfirm() {
	if (confirm('确认硬重置？')) hardReset();
}
