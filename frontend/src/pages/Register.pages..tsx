import React from 'react'
import AuthLayout from '../features/auth/components/AuthLayout'
import RegistranFormComponent from '../features/auth/components/RergistranForm.component'

const  RegisterPages = () => {
  return (
    <AuthLayout>
      <RegistranFormComponent/>
    </AuthLayout>
  )
}

export default RegisterPages
