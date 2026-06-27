<script setup lang="ts">
import Decimal from 'break_eternity.js';
import { hardResetConfirm, player } from './core/player';
import { buyDimension, dimensionCost, dimensionMult } from './core/dimensions';
import { format } from './ui/format';
import Volume from './ui/Volume.vue';
import { volumesGain } from './core/game-loop.ts';
import { temp } from './core/temp.ts';
import { tesseractGain, tesseractReset } from './core/tesseract.ts';
import Buyable from './ui/Buyable.vue';
import { t1, t2, t3, t4, t5, t6, t7 } from './core/buyables.ts';
const a = new Decimal(3);
</script>

<template>
	<header>
		<div class="center">
			<p>
				你有 <span class="big"><Volume :volume="player.volumes" /></span> 四维体积
			</p>
			<p>每秒获取 <Volume :volume="volumesGain()" /></p>
		</div>
	</header>
	<main>
		<div class="center">
			<button @click="() => (player.currentTab = 0)">体积</button>
			<button @click="() => (player.currentTab = 1)">设置</button>
			<button @click="() => (player.currentTab = 3)">关于</button>
			<button @click="() => (player.currentTab = 2)" v-if="player.unlockedTesseract">
				超立方体
			</button>
		</div>
		<div class="center">
			<progress max="1" v-if="isNaN(temp.progresses[0])" /><progress
				max="1"
				:value="temp.progresses[0]"
				v-else
			/>
			{{ temp.progresses[1] }}
		</div>
		<div class="center" v-if="player.currentTab == 0">
			<div>
				第一维度 {{ format(player.dimensions[0][1]) }} +{{
					format(player.dimensions[0][0])
				}}
				×{{ format(dimensionMult(0)) }}
				<button @click="() => buyDimension(0)">
					价格: <Volume :volume="dimensionCost(0)" />
				</button>
			</div>
			<div>
				第二维度 {{ format(player.dimensions[1][1]) }} +{{
					format(player.dimensions[1][0])
				}}
				×{{ format(dimensionMult(1)) }}
				<button @click="() => buyDimension(1)">
					价格: <Volume :volume="dimensionCost(1)" />
				</button>
			</div>
			<div>
				第三维度 {{ format(player.dimensions[2][1]) }} +{{
					format(player.dimensions[2][0])
				}}
				×{{ format(dimensionMult(2)) }}
				<button @click="() => buyDimension(2)">
					价格: <Volume :volume="dimensionCost(2)" />
				</button>
			</div>
			<div>
				第四维度 {{ format(player.dimensions[3][1]) }} +{{
					format(player.dimensions[3][0])
				}}
				×{{ format(dimensionMult(3)) }}
				<button @click="() => buyDimension(3)">
					价格: <Volume :volume="dimensionCost(3)" />
				</button>
			</div>
		</div>
		<div class="center" v-if="player.currentTab == 1">
			<button @click="() => hardResetConfirm()">硬重置</button>
		</div>
		<div class="center" v-if="player.currentTab == 2">
			<p>你有 {{ format(player.tesseracts) }} 超立方体</p>
			<button @click="() => tesseractReset()">
				重置之前的进度，获得 {{ format(tesseractGain()) }} 超立方体
			</button>
			<Buyable :buyable="t1" />
			<Buyable :buyable="t2" />
			<Buyable :buyable="t3" />
			<Buyable :buyable="t4" />
			<Buyable :buyable="t5" />
			<Buyable :buyable="t6" />
			<Buyable :buyable="t7" />
		</div>
		<div class="center" v-if="player.currentTab == 3">
			<p>作者: VeryrrDefine</p>
			<p>多维-体积增量 ver. ω (1.0.0)</p>
		</div>
	</main>
</template>

<style scoped>
header {
	position: sticky;
	top: 0;
	z-index: 10;
}
.big {
	font-size: 32px;
}
main {
	border: 6px;
}
</style>
