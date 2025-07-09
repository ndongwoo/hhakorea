// tailwind.config.ts

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 여기에 커스텀 테마를 추가할 수 있습니다.
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // 이 부분이 가장 중요합니다.
  ],
}
export default config