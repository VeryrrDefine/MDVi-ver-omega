import type Decimal from 'break_eternity.js';

export function format(x: Decimal): string {
	if (x.isNan()) return 'NaN';
	else if (x.eq(0)) return '0';
	else if (x.sign == -1) return '-' + format(x.abs());
	else if (x.lt(0.001)) return '/' + format(x.recip());
	else if (x.lt(1000)) return x.toNumber().toFixed(3);
	else if (x.lt('e1e9')) {
		let exp = x.log10().floor();
		let exppow = exp.pow10();
		let mant = x.div(exppow);

		let mant2 = mant.toNumber().toFixed(3);
		if (parseFloat(mant2)==10) return `1.000e${exp.toNumber()+1}`
		return `${mant.toNumber().toFixed(3)}e${exp.toNumber()}`;
	} else if (x.lt('eeee9')) {
		return `e${format(x.log10())}`;
	} else {
		return `F${format(x.slog(10))}`;
	}
}
