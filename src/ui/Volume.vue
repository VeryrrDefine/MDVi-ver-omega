<template>
	<span v-if="volume.lt(1e12)"> {{ format(volume) }} m<sup>4</sup> </span>
	<span v-else-if="volume.lt(1e24)"> {{ format(volume.div(1e12)) }} km<sup>4</sup> </span>
	<span v-else-if="volume.lt(1e36)"> {{ format(volume.div(1e24)) }} Mm<sup>4</sup> </span>
	<span v-else-if="volume.lt(1e48)"> {{ format(volume.div(1e36)) }} Gm<sup>4</sup> </span>
	<span v-else-if="volume.lt((299792458 * 86400) ** 4)">
		{{ format(volume.div(1e48)) }} Tm<sup>4</sup>
	</span>
	<span v-else-if="volume.lt((299792458 * 31536000) ** 4)">
		{{ format(volume.div((299792458 * 86400) ** 4)) }} ld<sup>4</sup>
	</span>
	<span v-else-if="volume.lt((299792458 * 31536000) ** 4 * 1e12)">
		{{ format(volume.div((299792458 * 31536000) ** 4)) }} ly<sup>4</sup>
	</span>
	<span v-else-if="volume.lt((299792458 * 31536000) ** 4 * 1e24)">
		{{ format(volume.div((299792458 * 31536000) ** 4 * 1e12)) }} kly<sup>4</sup>
	</span>
	<span v-else-if="volume.lt((299792458 * 31536000) ** 4 * 1e36)">
		{{ format(volume.div((299792458 * 31536000) ** 4 * 1e24)) }} Mly<sup>4</sup>
	</span>
	<span v-else-if="volume.lt((299792458 * 31536000 * 930000000000) ** 4)">
		{{ format(volume.div((299792458 * 31536000) ** 4 * 1e36)) }} Gly<sup>4</sup>
	</span>
	<span v-else-if="volume.lt('e1000000111.776441')">
		{{ format(volume.div((299792458 * 31536000 * 930000000000) ** 4)) }} d<sub>uni</sub
		><sup>4</sup>
	</span>
	<span v-else> {{ format(volume.log10().div('e1000000111.776441')) }} mlt<sup>4</sup> </span>
	<!-- <span v-else-if="volume.lt((299792458 * 31536000) ** 4 * 1e60)">
		{{ format(volume.div((299792458 * 31536000) ** 4 * 1e48)) }} Tly<sup>4</sup>
	</span>
	<span v-else-if="volume.lt((299792458 * 31536000) ** 4 * 1e72)">
		{{ format(volume.div((299792458 * 31536000) ** 4 * 1e60)) }} Ply<sup>4</sup>
	</span>
	<span v-else-if="volume.lt((299792458 * 31536000) ** 4 * 1e84)">
		{{ format(volume.div((299792458 * 31536000) ** 4 * 1e72)) }} Ely<sup>4</sup>
	</span>
	<span v-else-if="volume.lt((299792458 * 31536000) ** 4 * 1e96)">
		{{ format(volume.div((299792458 * 31536000) ** 4 * 1e84)) }} Zly<sup>4</sup>
	</span>
	<span v-else-if="volume.lt((299792458 * 31536000) ** 4 * 1e108)">
		{{ format(volume.div((299792458 * 31536000) ** 4 * 1e96)) }} Yly<sup>4</sup>
	</span> -->
	<!-- <span v-else> {{ format(volume) }} m<sup>4</sup> </span> -->
</template>

<script lang="ts" setup>
import Decimal from 'break_eternity.js';
import { format } from './format';

const prop = defineProps<{
	volume: Decimal;
}>();
</script>
