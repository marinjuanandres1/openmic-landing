import { fileURLToPath } from 'node:url'

export default {
  plugins: {
    // Explicit path so the build works from any working directory
    tailwindcss: { config: fileURLToPath(new URL('./tailwind.config.js', import.meta.url)) },
    autoprefixer: {},
  },
}
