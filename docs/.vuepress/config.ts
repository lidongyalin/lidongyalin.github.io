import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import theme from "./theme.js";

export default defineUserConfig({
  lang: "zh-CN",
  title: "白梦泽",
  description: "与其感慨路难行 不如马上出发",
  base: "/",
  dest: "docs/.vuepress/dist",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { name: "viewport", content: "width=device-width,initial-scale=1,user-scalable=no" }],
  ],
  bundler: viteBundler(),
  theme,
});
