import { createSSRApp } from "vue";
import App from "./App.vue";
import "@/static/scss/tachyons.scss";
import '@/static/scss/generate/padding.scss'
import '@/static/scss/generate/background-color.scss'
import '@/static/scss/generate/color.scss'
import '@/static/scss/generate/line-height.scss'
import '@/static/scss/generate/margin.scss'
import '@/static/scss/generate/font.scss'
import '@/static/scss/common.scss'
export function createApp() {
	const app = createSSRApp(App);
	return {
		app,
	};
}
