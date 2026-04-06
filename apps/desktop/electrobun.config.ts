import type { ElectrobunConfig } from "electrobun";

export default {
	app: {
		name: "bible-pedia",
		identifier: "biblepedia.philagora.io",
    version: "0.0.1"
  },
  build: {

		bun: {
      entrypoint: "src/bun/index.ts",
      reactFastRefresh: true,
      packages:"external"
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
