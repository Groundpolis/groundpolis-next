<template>
<MkStickyContainer>
	<template #header><MkPageHeader :actions="headerActions" :tabs="headerTabs"/></template>
	<div style="overflow: hidden; overflow: clip;">
		<MkSpacer :content-max="600" :margin-min="20">
			<div class="_formRoot znqjceqz">
				<div id="debug"></div>
				<div ref="containerEl" v-panel class="_formBlock about" :class="{ playing: easterEggEngine != null }">
					<img src="/client-assets/about-icon.png" alt="" class="icon" draggable="false" @load="iconLoaded" @click="gravity"/>
					<div class="misskey">Groundpolis</div>
					<div class="version">v{{ version }}</div>
					<span v-for="emoji in easterEggEmojis" :key="emoji.id" class="emoji" :data-physics-x="emoji.left" :data-physics-y="emoji.top" :class="{ _physics_circle_: !emoji.emoji.startsWith(':') }"><MkEmoji class="emoji" :emoji="emoji.emoji" :custom-emojis="$instance.emojis" :is-reaction="false" :normal="true" :no-style="true"/></span>
				</div>
				<div class="_formBlock" style="text-align: center;">
					{{ i18n.ts._aboutMisskey.about }}<br><a href="https://misskey-hub.net/docs/misskey.html" target="_blank" class="_link">{{ i18n.ts.learnMore }}</a>
				</div>
				<div class="_formBlock" style="text-align: center;">
					by
					<div class="xeltica-logo">
						<svg class="phage" viewBox="0 0 208 208">
							<path d="M208 208h-16v-27.719l-.563-.375-10.875-7.25-33-22-33-22-2.562-1.709V208H96v-81.052l-35.562 23.708-33 22-10.875 7.25-.563.375V208H0v-36.282l3.563-2.375 4.124-2.75 10.875-7.25 33-22 33-22 10.875-7.25 4.125-2.75 4.438-2.959 4.438 2.959 4.125 2.75 10.875 7.25 33 22 33 22 10.875 7.25 4.125 2.75 3.562 2.375V208z"/>
							<path d="M84.562 75.605l-33-22-33-22L16 29.897v17.052H0V0l12.438 8.292 4.125 2.75 10.875 7.25 33 22 30.355 20.237L104 69.334l10.562-7.042 33-22 33-22 10.875-7.25 4.125-2.75L208 0v46.949h-16V29.897l-2.562 1.708-33 22-33 22-5.016 3.344 5.016 3.343 33 22 33 22 2.562 1.709v-17.052h16v46.948l-12.438-8.292-4.125-2.749-10.875-7.25-33-22.001-33-22c-3.52-2.347-7.041-4.695-10.562-7.041l-5.281 3.52c-12.761 8.507-25.52 17.015-38.281 25.521l-33 22.001-10.875 7.25-4.125 2.75L0 157.897v-46.948h16v17.052l2.562-1.709 33-22 33-22 5.016-3.343-5.016-3.344z"/>
						</svg>
						Xeltica Studio
					</div>
				</div>
				<FormSection>
					<div class="_formLinks">
						<FormLink to="https://github.com/Groundpolis/groundpolis-next" external>
							<template #icon><i class="fas fa-code"></i></template>
							{{ i18n.ts._aboutMisskey.source }}
							<template #suffix>GitHub</template>
						</FormLink>
						<FormLink to="https://github.com/misskey-dev/misskey" external>
							<template #icon><i class="fas fa-code"></i></template>
							{{ i18n.ts._aboutMisskey.sourceMisskey }}
							<template #suffix>GitHub</template>
						</FormLink>
						<FormLink to="https://www.patreon.com/syuilo" external>
							<template #icon><i class="fas fa-hand-holding-medical"></i></template>
							{{ i18n.ts._aboutMisskey.donate }}
							<template #suffix>Patreon</template>
						</FormLink>
					</div>
				</FormSection>
				<FormSection>
					<template #label>{{ i18n.ts._aboutMisskey.contributors }}</template>
					<div class="_formLinks">
						<FormLink v-for="contributor in contributors" :key="contributor" :to="`https://github.com/${contributor}`" external>@{{ contributor }}</FormLink>
					</div>
					<MkLink url="https://github.com/misskey-dev/misskey/graphs/contributors">{{ i18n.ts._aboutMisskey.allContributors }}</MkLink>
				</FormSection>
			</div>
		</MkSpacer>
	</div>
</MkStickyContainer>
</template>

<script lang="ts" setup>
import { nextTick, onBeforeUnmount } from 'vue';
import { version } from '@/config';
import FormLink from '@/components/form/link.vue';
import FormSection from '@/components/form/section.vue';
import MkLink from '@/components/link.vue';
import { physics } from '@/scripts/physics';
import { i18n } from '@/i18n';
import { defaultStore } from '@/store';
import * as os from '@/os';
import { definePageMetadata } from '@/scripts/page-metadata';

let easterEggReady = false;
let easterEggEmojis = $ref([]);
let easterEggEngine = $ref(null);
const containerEl = $ref<HTMLElement>();

const contributors = [
	'Xeltica',
	'm-hayabusa',
	'remitocat',
];

function iconLoaded() {
	const emojis = defaultStore.state.reactions;
	const containerWidth = containerEl.offsetWidth;
	for (let i = 0; i < 32; i++) {
		easterEggEmojis.push({
			id: i.toString(),
			top: -(128 + (Math.random() * 256)),
			left: (Math.random() * containerWidth),
			emoji: emojis[Math.floor(Math.random() * emojis.length)],
		});
	}

	nextTick(() => {
		easterEggReady = true;
	});
}

function gravity() {
	if (!easterEggReady) return;
	easterEggReady = false;
	easterEggEngine = physics(containerEl);
}

onBeforeUnmount(() => {
	if (easterEggEngine) {
		easterEggEngine.stop();
	}
});

const headerActions = $computed(() => []);

const headerTabs = $computed(() => []);

definePageMetadata({
	title: i18n.ts.aboutMisskey,
	icon: null,
});
</script>

<style lang="scss" scoped>
.znqjceqz {
	> .about {
		position: relative;
		text-align: center;
		padding: 16px;
		border-radius: var(--radius);

		&.playing {
			&, * {
				user-select: none;
			}

			* {
				will-change: transform;
			}

			> .emoji {
				visibility: visible;
			}
		}

		> .icon {
			display: block;
			width: 100px;
			margin: 0 auto;
			border-radius: 16px;
		}

		> .misskey {
			margin: 0.75em auto 0 auto;
			width: max-content;
		}

		> .version {
			margin: 0 auto;
			width: max-content;
			opacity: 0.5;
		}

		> .emoji {
			position: absolute;
			top: 0;
			left: 0;
			visibility: hidden;

			> .emoji {
				pointer-events: none;
				font-size: 24px;
				width: 24px;
			}
		}
	}
	.xeltica-logo {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		margin-top: 16px;
		> .phage {
			width: 32px;
			height: 32px;
			fill: var(--fg);
		}
	}
}
</style>
