import Vue from "vue"
import { RemixIcon } from "@/layouts/components"
Vue.component("vab-remix-icon", RemixIcon)
const req = require.context("./svg", false, /\.svg$/),
  requireAll = (requireContext) => {
    return requireContext.keys().map(requireContext)
  }
requireAll(req)
