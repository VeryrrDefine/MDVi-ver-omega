<template>
	<div class="buyable">
		{{ buyable.description() }}({{ format(buyable.getAmount()) }})
		<div v-html="buyable.moreInfomations()"></div>
		<button @click="() => buyable.buy()" v-if="buyable.getAmount().lt(buyable.cap())">
			花费 {{ format(buyable.cost(buyable.getAmount())) }}
			{{ CurrencyOptions[buyable.currency].display() }}购买
		</button>
	</div>
</template>

<style lang="scss" scoped>
.buyable {
	border: 1px solid gray;
	width: 150px;
	margin: auto;
	margin-top: 5px;
	margin-bottom: 5px;
	padding: 8px;
}
</style>

<script lang="ts" setup>
import type { Buyable } from '../core/buyables';
import { CurrencyOptions } from '../core/currencies';
import { format } from './format';

const props = defineProps<{
	buyable: Buyable;
}>();
</script>
