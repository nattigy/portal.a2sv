import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'

type Props = {}

const Notfound = (props: Props) => {
    return (
        <div>
            <Box sx={{
                display: "grid",
                placeItems: "center",
                height: "100vh"
            }}  >
                <Box rowGap={10} display="flex" flexDirection="column" alignItems="center">
                    <Box display="flex" justifyItems="center" alignItems="center">
                        <Image objectFit="cover" height={300} width={800} src="/assets/imgs/404.svg" alt="not-found" />
                    </Box>
                    <Box display="flex" rowGap={2} flexDirection="column" justifyItems="center" alignItems="center">
                        <Typography fontWeight="bold" variant="h3">Whoops!!</Typography>
                        <Typography variant="h6" width={200} align="center">Looks like you are not connected to internet</Typography>
                        <Button color="primary" variant="contained">Reload</Button>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default Notfound