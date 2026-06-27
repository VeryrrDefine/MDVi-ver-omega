import Decimal from 'break_eternity.js';
import { Currencies, CurrencyOptions } from './currencies';
import { player } from './player';
import { green } from '../utils/htmlfuncs';
import { format } from '../ui/format';

export class Buyable {
	description(): string {
		return 'Example upgrade';
	}
	cost(amount: Decimal): Decimal {
		return Decimal.dInf;
	}
	currency: Currencies = Currencies.VOLUMES;
	buy() {
		let amount = this.getAmount();
		if (amount.gte(this.cap())) return;
		let cost = this.cost(amount);
		if (CurrencyOptions[this.currency].get().gte(cost)) {
			CurrencyOptions[this.currency].set(CurrencyOptions[this.currency].get().sub(cost));
			this.setAmount(amount.add(1));
		}
	}
	cap(): Decimal {
		return new Decimal(1);
	}
	getAmount() {
		return new Decimal(0);
	}
	setAmount(x: Decimal): void {}
	moreInfomations(): string{return ""}

}

class T1 extends Buyable{
	description(): string {
		return '基于超立方体加成第一维度';
	}
	cost(amount: Decimal): Decimal {
		return Decimal.dOne;
	}
	currency: Currencies = Currencies.TESSERACTS;
	getAmount(): Decimal {
		return player.buyables.t1;
	}
	setAmount(x: Decimal) {
		player.buyables.t1 = x;
	}
	effect(): Decimal {
		let res =  player.tesseracts.add(1.1)
		
		if (player.buyables.t6.gte(1)) {
			res = res.pow(1.4);
		} else {
			res = res.pow(1.2);
		}

		return res;
	}
	moreInfomations(): string {
		return green(`当前: x${format(this.effect())}`)
	}
}


class T2 extends Buyable{
	description(): string {
		return '四维体积加成第四维度';
	}
	cost(amount: Decimal): Decimal {
		return new Decimal(15);
	}
	currency: Currencies = Currencies.TESSERACTS;
	getAmount(): Decimal {
		return player.buyables.t2;
	}
	setAmount(x: Decimal) {
		player.buyables.t2 = x;
	}
	effect(): Decimal {
		return player.volumes.clampMin(10).log10().root(2.5);
	}
	moreInfomations(): string {
		return green(`当前: x${format(this.effect())}`)
	}
}

class T3 extends Buyable{
	description(): string {
		return '基于购买次数与第四维度加成第二维度';
	}
	cost(amount: Decimal): Decimal {
		return new Decimal(50).mul(amount.pow_base(2));
	}
	cap(): Decimal {
		return Decimal.dInf
	}
	currency: Currencies = Currencies.TESSERACTS;
	getAmount(): Decimal {
		return player.buyables.t3;
	}
	setAmount(x: Decimal) {
		player.buyables.t3 = x;
	}
	effect(): Decimal {
		return (player.dimensions[3][0].add(1).mul(this.getAmount().add(1)));
	}
	moreInfomations(): string {
		return green(`当前: x${format(this.effect())}`)
	}
}


class T4 extends Buyable{
	description(): string {
		return '维度乘数底数从1.5变为1.6';
	}
	cost(amount: Decimal): Decimal {
		return new Decimal(150);
	}
	currency: Currencies = Currencies.TESSERACTS;
	getAmount(): Decimal {
		return player.buyables.t4;
	}
	setAmount(x: Decimal) {
		player.buyables.t4 = x;
	}
}



class T5 extends Buyable{
	description(): string {
		return '超立方体x10';
	}
	cost(amount: Decimal): Decimal {
		return new Decimal(250);
	}
	currency: Currencies = Currencies.TESSERACTS;
	getAmount(): Decimal {
		return player.buyables.t5;
	}
	setAmount(x: Decimal) {
		player.buyables.t5 = x;
	}
}

class T6 extends Buyable{
	description(): string {
		return '提升t1的效果';
	}
	cost(amount: Decimal): Decimal {
		return new Decimal(1e4);
	}
	currency: Currencies = Currencies.TESSERACTS;
	getAmount(): Decimal {
		return player.buyables.t6;
	}
	setAmount(x: Decimal) {
		player.buyables.t6 = x;
	}
}


class T7 extends Buyable{
	description(): string {
		return '自动购买维度，购买维度不消耗四维体积';
	}
	cost(amount: Decimal): Decimal {
		return new Decimal(3e6);
	}
	currency: Currencies = Currencies.TESSERACTS;
	getAmount(): Decimal {
		return player.buyables.t7;
	}
	setAmount(x: Decimal) {
		player.buyables.t7 = x;
	}
}

export const t1 = new T1();
export const t2 = new T2();
export const t3 = new T3();
export const t4 = new T4();
export const t5 = new T5();
export const t6 = new T6();
export const t7 = new T7();
