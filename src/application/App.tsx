import { Route, Routes } from 'react-router-dom'

import './App.css'
import RegisterPage from 'presentation/pages/auth/register'
import LoginPage from 'presentation/pages/auth/login'
import { Toaster } from 'react-hot-toast'
import PrivateRoute from './routes/privateRoutes'
import HomePage from 'presentation/pages/home'
import MainLayout from 'presentation/components/layout/mainLayout'
import PublicRoute from './routes/publicRoutes'

function App() {

  return (
    <>
    <Routes>
      <Route path="/auth" element={<PublicRoute/>}>
          <Route path='sign-up' element={<RegisterPage/>}/>
          <Route path='login' element={<LoginPage/>}/>
      </Route>

      <Route path="/" element={<PrivateRoute/>}>
        <Route path='/' element={<MainLayout/>}>
          <Route path='' element={<HomePage/>}/>
        </Route>
        
        </Route>
    </Routes>

    <Toaster
      toastOptions={{
        style: {
          background: 'white',
          color: '#7b0e7f',
          padding: '10px',
          border: '2px solid #7b0e7f',
          boxShadow: '0px 0px 2px 0px #7b0e7f'

        },
        iconTheme: {
          primary: '#7b0e7f',
          secondary: '#FFFAEE',
        },
      }}
     />
    </>

  )
}

export default App
