## Getting Started with React project
Run this command to create a React app with vite
```
npm create vite@latest my-app -- --frontend react-ts
```

## Setting up TailwindCSS
1. Install the packages
```
npm install tailwindcss @tailwindcss/vite
```

2. Update your vite.config.ts
```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),   // ← Add this
  ],
})
```

3. Import tailwind into your main css file
```
@import "tailwindcss";
```

4. Restart your server
```
npm run dev
```

## Setting up React Router
1. Install react router package
```
npm install react-router-dom
```

2. Update your main.tsx
```
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
```

3. Update your App.tsx
```
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1 className="text-4xl font-bold p-8">✅ React Router is Working!</h1>} />
    </Routes>
  )
}

export default App
```