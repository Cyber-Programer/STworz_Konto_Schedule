import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import Employee from './pages/Employee/Employee'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    
    {/* <SignIn></SignIn> */}
    {/* <SignUp></SignUp> */}
    <Employee></Employee>
  </StrictMode>,
)
