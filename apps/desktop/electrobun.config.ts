import type { ElectrobunConfig } from "electrobun";

export default {
	app: {
		name: "bible-pedia",
		identifier: "biblepedia.philagora.io",
		version: "0.0.1",
		urlSchemes: ["biblepedia"],
	},

	build: {
		watch: ["../web/app/**"],
		bun: {
			entrypoint: "src/bun/index.ts",
			reactFastRefresh: true,
		},
		mac: {
			bundleCEF: false,
		},
		linux: {
			bundleCEF: false,
		},
		win: {
			bundleCEF: false,
		},
	},
} satisfies ElectrobunConfig;
