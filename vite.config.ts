import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Image-Ocr-Scanner/', 
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
  ],
})

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   base: '/Image-Ocr-Scanner/',   // <<< REQUIRED FOR GITHUB PAGES
//   plugins: [
//     react({
//       babel: {
//         plugins: [['babel-plugin-react-compiler']],
//       },
//     }),
//     tailwindcss(),
//   ],
// })
