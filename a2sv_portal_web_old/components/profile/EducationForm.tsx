import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Autocomplete, Button, Checkbox, FormControlLabel, FormLabel, MenuItem, Stack, TextField, Typography } from '@mui/material'
import * as yup from 'yup'
import { Box } from '@mui/system'
import { styled } from '@mui/material/styles'
import SuccessModal from './SuccessModal'

interface FormValues {

}

const validationSchema = yup.object({
    education: yup.object().shape({
        institution: yup.string()
            .required('Required!'),
        degree: yup.string(),
        start_date: yup.string(),
        end_date: yup.string(),
    }),
    programming_language: yup.array().of(yup.string()),
    resume: yup.mixed()
        .required('Required!')
        .test('fileSize', 'File too large', (value: any) => value && value.size <= 1000000)
        .test('fileType', 'Unsupported file type', (value: any) => value && value.type === 'application/pdf'),

})

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

const EducationForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isStillLearning, setIsStillLearning] = useState(false)
    const formik = useFormik({
        initialValues: {
            education: {
                institution: "",
                degree: "",
                start_date: "",
                end_date: ""
            },
            programming_language: [],
            resume: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values: FormValues) => {
            console.log(values)
            setTimeout(() => {
                setIsModalOpen(true)
            }, 1000)
        },
    })

    type ProgramingLanguageOptionsType = {
        label: string,
        value: string,
    }
    const programingLanguageOptions: Array<ProgramingLanguageOptionsType> = [
        { value: 'Java', label: 'Java' },
        { value: 'Python', label: 'Python' },
        { value: 'C#', label: 'C#' },
        { value: 'C++', label: 'C++' },
        { value: 'JavaScript', label: 'JavaScript' },
        { value: 'TypeScript', label: 'TypeScript' },
        { value: 'C', label: 'C' },
        { value: 'Go', label: 'Go' },
        { value: 'Rust', label: 'Rust' },
        { value: 'Scala', label: 'Scala' },
        { value: 'Kotlin', label: 'Kotlin' },
        { value: 'Swift', label: 'Swift' },
        { value: 'PHP', label: 'PHP' },
        { value: 'Ruby', label: 'Ruby' },
        { value: 'R', label: 'R' },
        { value: 'Perl', label: 'Perl' },
        { value: 'Haskell', label: 'Haskell' },
        { value: 'Clojure', label: 'Clojure' },
        { value: 'Erlang', label: 'Erlang' },
        { value: 'F#', label: 'F#' },
        { value: 'Elixir', label: 'Elixir' },
        { value: 'Scala', label: 'Scala' },
        { value: 'Clojure', label: 'Clojure' },
        { value: 'Elixir', label: 'Elixir' },



    ]

    const CustomAutocomplete = styled(Autocomplete)({
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

    const getYearSelectOption = () => {
        const currDate = new Date().getFullYear()
        const start_date = currDate - 50
        const years = []

        for (let year = start_date; year < currDate; year++) {
            years.push({
                label: year,
                value: year
            })
        }
        return years
    }

    return (
        <>
            <SuccessModal open={isModalOpen} handleClose={() => setIsModalOpen(false)} />
            <Box
                sx={{
                    width: {
                        xs: '100%',
                        md: '60%',
                    },
                    marginBottom: '100px',
                    padding: {
                        xs: '0 20px',
                        md: '0 10px',
                    },
                }}
            >
                <form onSubmit={formik.handleSubmit}>
                    <Stack
                        direction="column"
                        spacing={4}
                        sx={{
                            width: '100%',
                            pl: {
                                xs: '10px',
                                md: '10%',
                            },
                        }}
                    >
                        <Stack direction="row" alignItems="flex-start" spacing={2}>
                            <Box width="30%">
                                <FormLabel
                                    sx={{
                                        fontWeight: 'bold',
                                    }}
                                    htmlFor="education_institution"
                                >
                                    <Typography color="CaptionText" variant="subtitle1">
                                        Education
                                    </Typography>
                                </FormLabel>
                            </Box>
                            <Stack direction="column" width="70%" spacing={2}>
                                <CustomTextField
                                    fullWidth
                                    id="education_institution"
                                    name="education.institution"
                                    placeholder="Institution Password"
                                    size="small"
                                    value={formik.values.education.institution}
                                    onChange={formik.handleChange}
                                    error={formik.touched.education?.institution && Boolean(formik.errors.education?.institution)}
                                    helperText={formik.touched.education?.institution && formik.errors.education?.institution}
                                    select
                                >
                                    {[
                                        {
                                            value: 'AddisAbaba',
                                            label: 'Addis Ababa University',
                                        },
                                        {
                                            value: 'AddisAbaba',
                                            label: 'Addis Ababa Science and Technology (AASTU)',
                                        },
                                        {
                                            value: 'employed',
                                            label: 'Employed',
                                        },

                                    ].map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </CustomTextField>

                                <Box display="flex" flexDirection="column">
                                    <Stack spacing={2} direction="row" justifyContent="space-between">
                                        <Stack spacing={1} width="100%" alignItems="center" direction="row" justifyContent="space-between">
                                            <Typography variant="subtitle1">From</Typography>
                                            <CustomTextField
                                                fullWidth
                                                id="education_start_date"
                                                name="education.start_date"
                                                placeholder="Start Date"
                                                size="small"
                                                value={formik.values.education.start_date}
                                                onChange={formik.handleChange}
                                                error={formik.touched.education?.start_date && Boolean(formik.errors.education?.start_date)}
                                                helperText={formik.touched.education?.start_date && formik.errors.education?.start_date}
                                                select
                                            >
                                                {
                                                    getYearSelectOption().map(year => {
                                                        return (
                                                            <MenuItem key={year.value} value={year.value}>
                                                                {year.label}
                                                            </MenuItem>
                                                        )
                                                    })

                                                }
                                            </CustomTextField>

                                        </Stack>

                                        <Stack spacing={1} width="100%" alignItems="center" direction="row" justifyContent="space-between">
                                            <Typography variant="subtitle1">To</Typography>

                                            <CustomTextField
                                                fullWidth
                                                id="education_end_date"
                                                name="education.end_date"
                                                placeholder="End Date"
                                                size="small"
                                                value={formik.values.education.end_date}
                                                onChange={formik.handleChange}
                                                error={formik.touched.education?.institution && Boolean(formik.errors.education?.institution)}
                                                helperText={formik.touched.education?.institution && formik.errors.education?.institution}
                                                select
                                                disabled={isStillLearning}
                                            >
                                                {
                                                    getYearSelectOption().map(year => {
                                                        return (
                                                            <MenuItem key={year.value} value={year.value}>
                                                                {year.label}
                                                            </MenuItem>
                                                        )
                                                    })
                                                }
                                            </CustomTextField>

                                        </Stack>
                                    </Stack>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={isStillLearning} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setIsStillLearning(event.target.checked) }} name="still_learning" />
                                        }
                                        label="I still learn here"
                                    />
                                </Box>
                            </Stack>

                        </Stack>
                        <Stack direction="row" alignItems="flex-start" spacing={2}>
                            <Box width="30%">
                                <FormLabel
                                    sx={{
                                        fontWeight: 'bold',
                                    }}
                                    htmlFor="programming_language"
                                >
                                    <Typography color="CaptionText" variant="subtitle1">
                                        Programming Languages
                                    </Typography>
                                </FormLabel>
                            </Box>
                            <Stack direction="column" width="70%" spacing={2}>
                                <CustomAutocomplete
                                    fullWidth
                                    multiple
                                    limitTags={2}
                                    size="small"
                                    id="programming_languages"
                                    options={programingLanguageOptions}
                                    getOptionLabel={(option: any) => option.label}
                                    defaultValue={[]}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Programming Languages" placeholder="Languages" />
                                    )}
                                />
                            </Stack>

                        </Stack>
                        <Stack direction="row" alignItems="flex-start" spacing={2}>
                            <Box width="30%">
                                <FormLabel
                                    sx={{
                                        fontWeight: 'bold',
                                    }}
                                    htmlFor="resume"
                                >
                                    <Typography color="CaptionText" variant="subtitle1">
                                        Resume
                                    </Typography>
                                </FormLabel>
                            </Box>
                            <Stack direction="column" width="70%" spacing={2}>
                                <CustomTextField
                                    fullWidth
                                    id="resume"
                                    name="resume"
                                    placeholder="Resume"
                                    size="small"
                                    type="file"
                                    value={formik.values.resume}
                                    onChange={formik.handleChange}
                                    error={formik.touched.resume && Boolean(formik.errors.resume)}
                                    helperText={formik.touched.resume && formik.errors.resume}
                                />
                            </Stack>

                        </Stack>



                        <Stack direction="row" justifyContent="flex-end" spacing={2}>
                            <Button
                                sx={{
                                    minWidth: '130px',
                                    borderRadius: '8px',
                                }}
                                color="secondary"
                                variant="contained"
                                onClick={() => formik.resetForm()}
                            >
                                Cancel
                            </Button>
                            <Button
                                sx={{
                                    minWidth: '130px',
                                    borderRadius: '8px',
                                }}
                                color="primary"
                                variant="contained"
                                type="submit"
                            >
                                Save
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Box>
        </>
    )
}

export default EducationForm
