<script lang="ts">
	// Modal component
	export let isOpen = false;
</script>

{#if isOpen}
	<div class="modal-overlay">
		<div class="modal">
			<slot />
		</div>
	</div>
{/if}

<style>
	.modal-overlay {
		/* Modal overlay styles */
	}
	
	.modal {
		/* Modal styles */
	}
</style>
