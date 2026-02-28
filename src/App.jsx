// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import { AuthProvider } from './context/AuthContext'
// import ProtectedRoute from './components/ProtectedRoute'
// import Home from './pages/Home'
// import Login from './pages/Login'
// import Signup from './pages/Signup'
// import './App.css'

// export default function App() {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/" element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           } />
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </AuthProvider>
//     </BrowserRouter>
//   )
// }

// import './App.css'

// export default function App() {
//   return <div style={{color: 'white'}}>TEST</div>
// }

// import './App.css'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<div style={{color: 'white'}}>ROUTER WORKS</div>} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

// import './App.css'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { AuthProvider } from './context/AuthContext'

// export default function App() {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <Routes>
//           <Route path="/" element={<div style={{color: 'white'}}>AUTH WORKS</div>} />
//         </Routes>
//       </AuthProvider>
//     </BrowserRouter>
//   )
// }

// import './App.css'
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import { AuthProvider } from './context/AuthContext'
// import ProtectedRoute from './components/ProtectedRoute'

// export default function App() {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <Routes>
//           <Route path="/" element={
//             <ProtectedRoute>
//               <div style={{color: 'white'}}>PROTECTED WORKS</div>
//             </ProtectedRoute>
//           } />
//           <Route path="/login" element={<div style={{color: 'white'}}>LOGIN PAGE</div>} />
//         </Routes>
//       </AuthProvider>
//     </BrowserRouter>
//   )
// }

// import './App.css'
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import { AuthProvider } from './context/AuthContext'
// import ProtectedRoute from './components/ProtectedRoute'
// import Login from './pages/Login'

// export default function App() {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/" element={
//             <ProtectedRoute>
//               <div style={{color: 'white'}}>PROTECTED</div>
//             </ProtectedRoute>
//           } />
//         </Routes>
//       </AuthProvider>
//     </BrowserRouter>
//   )
// }

// import './App.css'
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import { AuthProvider } from './context/AuthContext'
// import ProtectedRoute from './components/ProtectedRoute'
// import Login from './pages/Login'
// import Home from './pages/Home'

// export default function App() {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/" element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           } />
//         </Routes>
//       </AuthProvider>
//     </BrowserRouter>
//   )
// }

import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}