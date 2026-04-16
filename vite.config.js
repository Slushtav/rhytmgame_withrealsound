import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repoName = globalThis.process?.env.GITHUB_REPOSITORY?.split("/")[1];
const isGitHubActions = globalThis.process?.env.GITHUB_ACTIONS === "true";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: isGitHubActions && repoName ? `/${repoName}/` : "/",
});
