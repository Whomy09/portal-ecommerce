<script>
	import '../app.css';
</script>

<div class="max-w-7xl mx-auto">
	<nav class="flex items-center justify-between border-b h-[60px] mb-4 px-4">
			<div class="text-lg font-bold">
					<a href="/">Logo</a>
			</div>
			<ul class="flex space-x-4">
					<li>
							<a href="/home" class="hover:text-blue-500 transition-colors">Home</a>
					</li>
					<li>
							<a href="/orders" class="hover:text-blue-500 transition-colors">Orders</a>
					</li>
			</ul>
	</nav>

	<div>
			<slot />
	</div>
</div>
