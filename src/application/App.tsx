import { Route, Routes } from 'react-router-dom'

import './App.css'
import RegisterPage from 'presentation/pages/auth/register'
import LoginPage from 'presentation/pages/auth/login'
import { Toaster } from 'react-hot-toast'
import PrivateRoute from './routes/privateRoutes'
import HomePage from 'presentation/pages/home'

function App() {

  return (
    <>
    <Routes>
      <Route path="/auth">
          <Route path='sign-up' element={<RegisterPage/>}/>
          <Route path='login' element={<LoginPage/>}/>
      </Route>

      <Route path="/" element={<PrivateRoute/>}>
      <Route path='' element={<HomePage/>}/>
      </Route>
    </Routes>

    <Toaster
      toastOptions={{
        style: {
          background: '#363636',
          color: '#fff',
        }
      }}
     />
    </>

  )
}

export default App
