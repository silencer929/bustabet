<script lang="ts">
	// Input component
	export let type = 'text';
	export let placeholder = '';
	export let value = '';
</script>

<input {type} {placeholder} bind:value />

<style>
	input {
		/* Input styles */
	}
</style>
