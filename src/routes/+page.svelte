<script lang="ts">
	import { authClient } from '$lib/auth-client';

	const session = authClient.useSession();
</script>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-3xl mx-auto">
		{#if $session.data?.user}
			<div class="bg-white shadow rounded-lg p-6">
				<h1 class="text-3xl font-bold text-gray-900 mb-4">
					Welcome back, {$session.data.user.name}!
				</h1>
				<p class="text-gray-600 mb-6">
					You are successfully signed in to your account.
				</p>
				<div class="bg-green-50 border border-green-200 rounded-md p-4">
					<h3 class="text-sm font-medium text-green-800 mb-2">Authentication Status</h3>
					<dl class="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
						<div>
							<dt class="text-sm font-medium text-green-700">Email:</dt>
							<dd class="text-sm text-green-900">{$session.data.user.email}</dd>
						</div>
						<div>
							<dt class="text-sm font-medium text-green-700">User ID:</dt>
							<dd class="text-sm text-green-900 font-mono">{$session.data.user.id}</dd>
						</div>
						<div>
							<dt class="text-sm font-medium text-green-700">Session ID:</dt>
							<dd class="text-sm text-green-900 font-mono">{$session.data?.session?.id}</dd>
						</div>
						<div>
							<dt class="text-sm font-medium text-green-700">Created At:</dt>
							<dd class="text-sm text-green-900">
								{new Date($session.data.user.createdAt).toLocaleDateString()}
							</dd>
						</div>
					</dl>
				</div>
			</div>
		{:else}
			<div class="flex justify-center items-center h-full">
				<div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500">
					<span class="sr-only">Loading...</span>
				</div>
			</div>
		{/if}
	</div>
</div>