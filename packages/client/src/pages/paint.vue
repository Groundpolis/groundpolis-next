<template>
<div ref="el" class="xmcpanca">
	<transition :name="$store.state.animation ? 'fade' : ''" mode="out-in">
		<header class="toolbar">
			<h1 class="title"><i class="fas fa-paint-brush icon"></i> {{ i18n.ts.paint }}</h1>
			<div class="commands">
				<button v-tooltip="i18n.ts._gp._paint.new" class="command _button"><i class="fas fa-file"></i></button>
				<button v-tooltip="i18n.ts._gp._paint.open" class="command _button"><i class="fas fa-folder-open"></i></button>
				<button v-tooltip="i18n.ts._gp._paint.save" class="command _button"><i class="fas fa-save"></i></button>
			</div>
			<div class="commands right">
				<MkButton class="fullButton" primary @click.stop="share">
					<i class="fas fa-pen-to-square"/>
					{{ i18n.ts.share }}
				</MkButton>
				<button v-tooltip="i18n.ts.settings" class="command _button wideSize" @click="openSetting">
					<i class="fas fa-gear"></i>
				</button>
			</div>
		</header>
	</transition>
</div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import * as symbols from '@/symbols';
import { i18n } from '@/i18n';
import { ToolType } from '@/scripts/paint/types';
import MkButton from '@/components/ui/button.vue';
import { alert, form } from '@/os';
import { defaultStore } from '@/store';

const currentTool = ref<ToolType>("pen");
const el = ref<HTMLElement>(null);
const narrow = ref(false);

const openSetting = async () => {
	const {result} = await form(i18n.ts.settings, {
		usePressure: {
			type: "boolean",
			default: defaultStore.state.usePressure,
			label: i18n.ts._gp._paint.usePressure,
			description: i18n.ts._gp._paint.usePressureDescription,
		},
		penWidth: {
			type: "number",
			default: defaultStore.state.penWidth,
			label: i18n.ts._gp._paint.penWidth,
		},
		eraserWidth: {
			type: "number",
			default: defaultStore.state.eraserWidth,
			label: i18n.ts._gp._paint.eraserWidth,
		},
	});
	console.log(result);
	defaultStore.set("usePressure", result.usePressure);
	defaultStore.set("penWidth", result.penWidth);
	defaultStore.set("eraserWidth", result.eraserWidth);
};

const share = () => {
	alert({
		type: "error",
		text: "工事中"
	});
};

onMounted(() => {
	if (el.value.parentElement) {
		narrow.value = el.value.parentElement.offsetWidth < 500;
		const ro = new ResizeObserver((entries, observer) => {
			if (el.value) {
				narrow.value = Number(el.value.parentElement?.offsetWidth) < 500;
			}
		});
		ro.observe(el.value.parentElement);
		onUnmounted(() => {
			ro.disconnect();
		});
	}
});

defineExpose({
	[symbols.PAGE_INFO]: computed(() => ({
		title: i18n.ts.paint,
		icon: 'fas fa-paint-brush',
		bg: 'var(--bg)',
		hideHeader: true,
	})),
});
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.125s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.xmcpanca {
	.toolbar {
		background: var(--bg);
    display: flex;
    position: sticky;
    top: var(--stickyTop,0);
		border-bottom: 0.5px solid var(--divider);
    z-index: 1000;
		height: 60px;
		padding-left: 24px;
		padding-right: 8px;
		gap: 8px;
		> h1.title {
			display: flex;
			align-items: center;
			font-weight: 700;
			font-size: 1rem;
			white-space: nowrap;
			margin-right: 8px;
			opacity: .7;
			> .icon {
				margin-right: 8px;
			}
		}
		> .commands {
			display: flex;
			align-items: center;
			&.right {
				margin-left: auto;
			}
			button.command {
				width: 40px;
				height: 48px;
				border-radius: 5px;
				&.wideSize {
					width: 48px;
				}
				&:hover {
					background-color: rgba(0, 0, 0, 0.05);
				}
			}
		}
	}
}
</style>
