<script lang="ts">
	// Admin layout
</script>

<div class="admin-layout">
	<aside class="admin-sidebar">
		<!-- Admin navigation -->
	</aside>
	<main>
		<slot />
	</main>
</div>

<style>
	.admin-layout {
		display: flex;
	}
	
	.admin-sidebar {
		/* Sidebar styles */
	}
</style>
