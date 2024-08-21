import React, { useState } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { postApiCall } from 'src/services/AppSetting'
import { base } from 'src/constants/Data.constant'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const submitLogin = async () => {
    if (userName.target.value == '') {
      toast.error('username is mandatory')
    } else if (password.target.value == '') {
      toast.error('password is mandatory')
      // console.log("second")
    } else {
      // console.log("object");
      let req = {
        username: userName.target.value,
        password: password.target.value,
      }
      // console.log("first", req)
      let result = await postApiCall(base.adminLogin, req)
      // console.log("logoflogin", result);
      if (result.status == true) {
        toast.error('Login successfully')
        let test = await localStorage.setItem('adminLoginId', result.data[0].admin_id)
        // let test = await localStorage.setItem("loginId", "1");
        // console.log("testeee", test);
        navigate('/dashboard')
      } else {
        toast.error('Login failed')
      }
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <ToastContainer />
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Admin Login</h1>
                    <p className="text-medium-emphasis">Login to access your Dashboard</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="userName"
                        id="userName"
                        onChange={(e) => {
                          setUserName(e)
                        }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => {
                          setPassword(e)
                        }}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={() => submitLogin()}>
                          Login
                        </CButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-right"> */}
                      {/* <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton> */}
                      {/* <CButton color="link" className="px-0" to="/register">
                          Register Now!
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
