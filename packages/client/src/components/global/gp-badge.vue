<template>
<span v-tooltip="i18n.ts._gp.original" class="gp-badge">Groundpolis</span>
</template>

<script lang="ts" setup>
import { i18n } from '@/i18n';
</script>

<style lang="scss" scoped>
.gp-badge {
	font-size: 14px;
	padding: 0 6px;
	border-radius: 4px;
	background: #5B4841;
	color: #60B241;
	font-weight: bold;
	border: 1px solid #ffffff10;
	margin-left: 4px;
}
</style>
