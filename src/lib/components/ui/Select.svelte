<script lang="ts">
	// Select component
	export let options: Array<{ value: string; label: string }> = [];
	export let value = '';
</script>

<select bind:value>
	{#each options as option}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>

<style>
	select {
		/* Select styles */
	}
</style>
