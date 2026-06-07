<script lang="ts">
	// Toast component
	export let message = '';
	export let type: 'success' | 'error' | 'info' | 'warning' = 'info';
</script>

<div class="toast toast-{type}">
	{message}
</div>

<style>
	.toast {
		/* Toast base styles */
	}
	
	.toast-success {
		/* Success toast styles */
	}
	
	.toast-error {
		/* Error toast styles */
	}
	
	.toast-info {
		/* Info toast styles */
	}
	
	.toast-warning {
		/* Warning toast styles */
	}
</style>
