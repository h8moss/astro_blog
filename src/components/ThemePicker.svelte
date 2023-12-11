<script lang="ts">
	import { onMount } from "svelte";
	import { backInOut } from "svelte/easing";
	import { tweened } from "svelte/motion";

	let toggled = true;

	const position = tweened(0, {
		duration: 200,
		easing: backInOut
	});

	$: $position = toggled ? 1 : 0;

	const runToggle = () => {
		toggled = !toggled;

		const theme = toggled ? "light" : "dark";
		localStorage.setItem("theme", theme);

		document.documentElement.setAttribute("data-theme", theme);
	};

	const setSwitch = () => {
		const theme = localStorage.getItem("theme");
		toggled = theme === "light";
	};

	onMount(() => {
		setSwitch();
		document.addEventListener("astro:after-swap", setSwitch);
	});
</script>

<button class="parent" on:click={runToggle}>
	<div class="ball" style:transform="translateX({100 * $position}%)" />
</button>

<style lang="scss">
	button.parent {
		border: 0px;
		padding: 0.5rem;

		height: 3rem;
		width: 5rem;

		display: flex;

		border-radius: 2rem;

		box-shadow:
			rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
			rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;

		background-color: var(--primary);

		div.ball {
			height: 2rem;
			width: 2rem;
			border-radius: 2rem;
			background-color: var(--accent);

			box-shadow:
				rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
				rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
		}
	}

	@media screen and (max-width: 500px) {
		button.parent {
			height: 1.5rem;
			width: 2.5rem;
			padding: 0.25rem;

			div.ball {
				height: 1rem;
				width: 1rem;
			}
		}
	}
</style>
