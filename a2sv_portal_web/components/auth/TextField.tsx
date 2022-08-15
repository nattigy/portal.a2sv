import { styled, TextField } from '@mui/material'

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    backgroundColor: '#EFF3F9',
    '& fieldset': {},
    '&:hover fieldset': {},
    '&.Mui-focused fieldset': {
      borderColor: 'none',
    },
  },
  input: {
    py: '10px',
    color: 'black',
    borderRadius: '20px',
  },
})

export default CustomTextField
