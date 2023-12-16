import type { I18n } from "./types";

export type UiTitles = "index.title" | "index.description";

type _UI = {
	[Key in UiTitles]: string;
};

export const ui: I18n<_UI> = {
	en: {
		"index.title": "Daniel Armenta's blog",
		"index.description":
			"In my blog for developers and coders you can learn to use all the different technologies I use like react, svelte, Flutter and others."
	},
	es: {
		"index.title": "Blog de Daniel Armenta",
		"index.description":
			"En mi blog de programación podrás leer posts en los que aprenderás las distintas habilidades que tengo, como React, Svelte, Flutter y otras"
	}
};
