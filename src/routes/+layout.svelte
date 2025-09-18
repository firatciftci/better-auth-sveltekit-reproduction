<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let { children } = $props();

	const session = authClient.useSession();

	async function handleSignOut() {
		await authClient.signOut();
		goto('/signin');
	}

	const isAuthPage = $derived(page.route.id?.includes('signin') || page.route.id?.includes('signup'));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if !isAuthPage}
	<nav class="bg-white shadow">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between h-16">
				<div class="flex items-center">
					<h1 class="text-xl font-semibold text-gray-900">Your App</h1>
				</div>
				<div class="flex items-center space-x-4">
					{#if $session.data?.user}
						<span class="text-gray-700">Welcome, {$session.data.user.name}!</span>
						<button
							onclick={handleSignOut}
							class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
						>
							Sign Out
						</button>
					{:else}
						<a
							href="/signin"
							class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
						>
							Sign In
						</a>
						<a
							href="/signup"
							class="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium"
						>
							Sign Up
						</a>
					{/if}
				</div>
			</div>
		</div>
	</nav>
{/if}

{@render children?.()}
