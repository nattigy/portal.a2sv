import React, { ReactNode } from 'react'
import Button from '@mui/material/Button'
import { useFormikContext } from 'formik'

const ButtonWrapper = ({ children, ...otherProps }: { children: ReactNode }) => {
  const { submitForm } = useFormikContext()

  const handleSubmit = () => {
    submitForm()
  }

  return (
    <Button variant="contained" fullWidth onClick={handleSubmit} {...otherProps}>
      {children}
    </Button>
  )
}

export default ButtonWrapper
