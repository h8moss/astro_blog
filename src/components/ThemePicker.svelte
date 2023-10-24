<script lang="typescript">
	import { backInOut } from "svelte/easing";
	import { tweened } from "svelte/motion";

	let toggled = false;

	const position = tweened(0, {
		duration: 200,
		easing: backInOut
	});

	const toggleAnim = () => {
		$position = toggled ? 1 : 0;
	};

	$: (toggled || true) && toggleAnim();
</script>

<button class="parent" on:click={() => (toggled = !toggled)}>
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

		box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
			rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;

		div.ball {
			height: 2rem;
			width: 2rem;
			border-radius: 2rem;
			background-color: #707070;

			box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
				rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
		}
	}
</style>
