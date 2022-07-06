<template>
<div class="_formRoot">
	<FormSelect v-model="lang" class="_formBlock">
		<template #label>{{ i18n.ts.uiLanguage }}</template>
		<option v-for="x in langs" :key="x[0]" :value="x[0]">{{ x[1] }}</option>
	</FormSelect>

	<FormButton primary inline @click="reloadLang">Reload Language</FormButton>

	<FormRadios v-model="overridedDeviceKind" class="_formBlock">
		<template #label>{{ i18n.ts.overridedDeviceKind }}</template>
		<option :value="null">{{ i18n.ts.auto }}</option>
		<option value="smartphone"><i class="fas fa-mobile-alt"/> {{ i18n.ts.smartphone }}</option>
		<option value="tablet"><i class="fas fa-tablet-alt"/> {{ i18n.ts.tablet }}</option>
		<option value="desktop"><i class="fas fa-desktop"/> {{ i18n.ts.desktop }}</option>
	</FormRadios>

	<FormSwitch v-model="showFixedPostForm" class="_formBlock">{{ i18n.ts.showFixedPostForm }}</FormSwitch>

	<FormSection>
		<template #label>{{ i18n.ts.behavior }}</template>
		<FormSwitch v-model="imageNewTab" class="_formBlock">{{ i18n.ts.openImageInNewTab }}</FormSwitch>
		<FormSwitch v-model="enableInfiniteScroll" class="_formBlock">{{ i18n.ts.enableInfiniteScroll }}</FormSwitch>
		<FormSwitch v-model="useReactionPickerForContextMenu" class="_formBlock">{{ i18n.ts.useReactionPickerForContextMenu }}</FormSwitch>
		<FormSwitch v-model="disablePagesScript" class="_formBlock">{{ i18n.ts.disablePagesScript }}</FormSwitch>

		<FormSelect v-model="serverDisconnectedBehavior" class="_formBlock">
			<template #label>{{ i18n.ts.whenServerDisconnected }}</template>
			<option value="reload">{{ i18n.ts._serverDisconnectedBehavior.reload }}</option>
			<option value="dialog">{{ i18n.ts._serverDisconnectedBehavior.dialog }}</option>
			<option value="quiet">{{ i18n.ts._serverDisconnectedBehavior.quiet }}</option>
		</FormSelect>
	</FormSection>

	<FormSection>
		<template #label>{{ i18n.ts.appearance }}</template>
		<FormSwitch v-model="disableAnimatedMfm" class="_formBlock">{{ i18n.ts.disableAnimatedMfm }}</FormSwitch>
		<FormSwitch v-model="reduceAnimation" class="_formBlock">{{ i18n.ts.reduceUiAnimation }}</FormSwitch>
		<FormSwitch v-model="useBlurEffect" class="_formBlock">{{ i18n.ts.useBlurEffect }}</FormSwitch>
		<FormSwitch v-model="useBlurEffectForModal" class="_formBlock">{{ i18n.ts.useBlurEffectForModal }}</FormSwitch>
		<FormSwitch v-model="showGapBetweenNotesInTimeline" class="_formBlock">{{ i18n.ts.showGapBetweenNotesInTimeline }}</FormSwitch>
		<FormSwitch v-model="loadRawImages" class="_formBlock">{{ i18n.ts.loadRawImages }}</FormSwitch>
		<FormSwitch v-model="disableShowingAnimatedImages" class="_formBlock">{{ i18n.ts.disableShowingAnimatedImages }}</FormSwitch>
		<FormSwitch v-model="useSystemFont" class="_formBlock">{{ i18n.ts.useSystemFont }}</FormSwitch>
		<FormSwitch v-model="useOsNativeEmojis" class="_formBlock">
			{{ i18n.ts.useOsNativeEmojis }}
			<div><Mfm :key="useOsNativeEmojis" text="🍮🍦🍭🍩🍰🍫🍬🥞🍪"/></div>
		</FormSwitch>
		<FormSwitch v-model="disableDrawer" class="_formBlock">{{ i18n.ts.disableDrawer }}</FormSwitch>

		<FormRadios v-model="fontSize" class="_formBlock">
			<template #label>{{ i18n.ts.fontSize }}</template>
			<option value="small"><span style="font-size: 14px;">Aa</span></option>
			<option :value="null"><span style="font-size: 16px;">Aa</span></option>
			<option value="large"><span style="font-size: 18px;">Aa</span></option>
			<option value="veryLarge"><span style="font-size: 20px;">Aa</span></option>
		</FormRadios>
	</FormSection>

	<FormSection>
		<FormSwitch v-model="aiChanMode">{{ i18n.ts.aiChanMode }}</FormSwitch>
	</FormSection>

	<FormSelect v-model="instanceTicker" class="_formBlock">
		<template #label>{{ i18n.ts.instanceTicker }}</template>
		<option value="none">{{ i18n.ts._instanceTicker.none }}</option>
		<option value="remote">{{ i18n.ts._instanceTicker.remote }}</option>
		<option value="always">{{ i18n.ts._instanceTicker.always }}</option>
	</FormSelect>

	<FormSelect v-model="nsfw" class="_formBlock">
		<template #label>{{ i18n.ts.nsfw }}</template>
		<option value="respect">{{ i18n.ts._nsfw.respect }}</option>
		<option value="ignore">{{ i18n.ts._nsfw.ignore }}</option>
		<option value="force">{{ i18n.ts._nsfw.force }}</option>
	</FormSelect>

	<FormSelect v-model="renoteButtonMode" class="_formBlock">
		<template #label>
			<I18n :src="i18n.ts._gp.renoteButtonMode" tag="span">
				<template #renote>
					<i class="fas fa-retweet"/>
				</template>
			</I18n>
			<GpBadge/>
		</template>
		<option value="choose">{{ i18n.ts._gp._renoteButtonMode.choose }}</option>
		<option value="renote">{{ i18n.ts._gp._renoteButtonMode.renote }}</option>
		<option value="quote">{{ i18n.ts._gp._renoteButtonMode.quote }}</option>
		<option value="renoteQuote">{{ i18n.ts._gp._renoteButtonMode.renoteQuote }}</option>
	</FormSelect>

	<FormFolder class="_formBlock">
		<template #label>{{ i18n.ts._gp.iconShape }} <GpBadge/></template>
		<MkAvatar class="avatar" :user="$i" :show-indicator="true"/>
		<FormRadios v-model="iconShape" class="_formBlock">			
			<option v-for="shape in ['circle', 'square', 'rounded', 'droplet']" :key="shape" :value="shape">
				<div :class="['icon-shape-preview', shape]"/>
				{{ i18n.ts._gp._iconShape[shape] }}
			</option>
		</FormRadios>
	</FormFolder>

	<FormRange v-model="numberOfPageCache" :min="1" :max="10" :step="1" class="_formBlock">
		<template #label>{{ i18n.ts.numberOfPageCache }}</template>
		<template #caption>{{ i18n.ts.numberOfPageCacheDescription }}</template>
	</FormRange>

	<FormLink to="/settings/deck" class="_formBlock">{{ i18n.ts.deck }}</FormLink>

	<FormLink to="/settings/custom-css" class="_formBlock"><template #icon><i class="fas fa-code"></i></template>{{ i18n.ts.customCss }}</FormLink>
</div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import FormSwitch from '@/components/form/switch.vue';
import FormSelect from '@/components/form/select.vue';
import FormRadios from '@/components/form/radios.vue';
import FormRange from '@/components/form/range.vue';
import FormButton from '@/components/ui/button.vue';
import FormSection from '@/components/form/section.vue';
import FormFolder from '@/components/form/folder.vue';
import FormLink from '@/components/form/link.vue';
import MkLink from '@/components/link.vue';
import { langs } from '@/config';
import { defaultStore } from '@/store';
import * as os from '@/os';
import { unisonReload } from '@/scripts/unison-reload';
import { i18n } from '@/i18n';
import { definePageMetadata } from '@/scripts/page-metadata';
import GpBadge from '@/components/global/gp-badge.vue';

const lang = ref(localStorage.getItem('lang'));
const fontSize = ref(localStorage.getItem('fontSize'));
const useSystemFont = ref(localStorage.getItem('useSystemFont') != null);

async function reloadAsk() {
	const { canceled } = await os.confirm({
		type: 'info',
		text: i18n.ts.reloadToApplySetting,
	});
	if (canceled) return;

	unisonReload();
}

const overridedDeviceKind = computed(defaultStore.makeGetterSetter('overridedDeviceKind'));
const serverDisconnectedBehavior = computed(defaultStore.makeGetterSetter('serverDisconnectedBehavior'));
const reduceAnimation = computed(defaultStore.makeGetterSetter('animation', v => !v, v => !v));
const useBlurEffectForModal = computed(defaultStore.makeGetterSetter('useBlurEffectForModal'));
const useBlurEffect = computed(defaultStore.makeGetterSetter('useBlurEffect'));
const showGapBetweenNotesInTimeline = computed(defaultStore.makeGetterSetter('showGapBetweenNotesInTimeline'));
const disableAnimatedMfm = computed(defaultStore.makeGetterSetter('animatedMfm', v => !v, v => !v));
const useOsNativeEmojis = computed(defaultStore.makeGetterSetter('useOsNativeEmojis'));
const disableDrawer = computed(defaultStore.makeGetterSetter('disableDrawer'));
const disableShowingAnimatedImages = computed(defaultStore.makeGetterSetter('disableShowingAnimatedImages'));
const loadRawImages = computed(defaultStore.makeGetterSetter('loadRawImages'));
const imageNewTab = computed(defaultStore.makeGetterSetter('imageNewTab'));
const nsfw = computed(defaultStore.makeGetterSetter('nsfw'));
const disablePagesScript = computed(defaultStore.makeGetterSetter('disablePagesScript'));
const showFixedPostForm = computed(defaultStore.makeGetterSetter('showFixedPostForm'));
const numberOfPageCache = computed(defaultStore.makeGetterSetter('numberOfPageCache'));
const instanceTicker = computed(defaultStore.makeGetterSetter('instanceTicker'));
const enableInfiniteScroll = computed(defaultStore.makeGetterSetter('enableInfiniteScroll'));
const useReactionPickerForContextMenu = computed(defaultStore.makeGetterSetter('useReactionPickerForContextMenu'));
const squareAvatars = computed(defaultStore.makeGetterSetter('squareAvatars'));
const aiChanMode = computed(defaultStore.makeGetterSetter('aiChanMode'));
// Groundpolis
const renoteButtonMode = computed(defaultStore.makeGetterSetter('renoteButtonMode'));
const iconShape = computed(defaultStore.makeGetterSetter('iconShape'));

watch(lang, () => {
	localStorage.setItem('lang', lang.value as string);
	localStorage.removeItem('locale');
});

watch(fontSize, () => {
	if (fontSize.value == null) {
		localStorage.removeItem('fontSize');
	} else {
		localStorage.setItem('fontSize', fontSize.value);
	}
});

watch(useSystemFont, () => {
	if (useSystemFont.value) {
		localStorage.setItem('useSystemFont', 't');
	} else {
		localStorage.removeItem('useSystemFont');
	}
});

watch([
	lang,
	fontSize,
	useSystemFont,
	enableInfiniteScroll,
	squareAvatars,
	aiChanMode,
	showGapBetweenNotesInTimeline,
	instanceTicker,
	overridedDeviceKind,
], async () => {
	await reloadAsk();
});

const headerActions = $computed(() => []);

const headerTabs = $computed(() => []);

const reloadLang = async () => {
	localStorage.removeItem('locale');
	await reloadAsk();
};

definePageMetadata({
	title: i18n.ts.general,
	icon: 'fas fa-cogs',
});
</script>

<style lang="scss" scoped>
.avatar {
	width: 48px;
	height: 48px;
}

.icon-shape-preview {
	display: inline-block;
	width: 1em;
	height: 1em;
	margin-right: 0.5em;
	background: currentColor;
	vertical-align: -0.14em;
	&.circle {
		border-radius: 50%;
	}

	&.square {
		border-radius: 0;
	}

	&.rounded {
		border-radius: 20%;
	}

	&.droplet {
		border-radius: 50% 50% 0 50%;
	}
}
</style>
