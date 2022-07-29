import React from 'react'
import { CameraAlt, Edit } from '@mui/icons-material'
import { Avatar, Badge, Box, IconButton, Typography } from '@mui/material'

function ProfileCard() {
    return (
        <Box
            sx={{
                position: "relative",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    minHeight: {
                        xs: "180px",
                        sm: "200px",
                        md: "220px",
                    },
                    backgroundColor: "primary.main",
                    borderRadius: "40px 0px 0px 0px",
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "flex-end"

                }}
            >
                <IconButton>
                    <CameraAlt sx={{
                        color: "whitesmoke",
                        fontSize: {
                            xs: "25px",
                            lg: "30px"
                        },
                    }} />
                </IconButton>
            </Box>
            <Box px={5} sx={{
                position: "relative",
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: {
                    xs: "column",
                    md: "row"
                },
                alignItems: "center",
                columnGap: "20px",
                padding: {
                    xs: "0px 10px",
                    md: "0px 50px"
                }
            }}>
                <Box sx={{
                    position: "relative",
                    width: {
                        xs: "120px",
                        md: "150px"
                    },
                    height: {
                        xs: "90px",
                        md: "150px"
                    },

                }}>

                    <Box
                        sx={{
                            width: {
                                xs: "100px",
                                md: "120px"
                            },
                            height: {
                                xs: "100px",
                                md: "120px"
                            },
                            position: "absolute",
                            top: "-50%",
                        }}
                    >
                        <Badge
                            sx={{
                                height: "100%",
                                width: "100%",
                            }}
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                                <IconButton
                                    sx={{
                                        width: 28,
                                        height: 28,
                                        padding: "5px",
                                        backgroundColor: "primary.main",
                                        color: "white",
                                        border: `2px solid primary.main`,
                                        "&:hover": {
                                            backgroundColor: "primary.main",
                                            color: "white",
                                            border: `2px solid primary.main`,
                                        }
                                    }}
                                >
                                    <Edit fontSize='small' />
                                </IconButton>
                            }
                        >
                            <Avatar sx={{
                                height: "100%",
                                width: "100%",
                            }} src='https://mui.com/static/images/avatar/2.jpg' />
                        </Badge>

                    </Box>
                </Box>
                <Box sx={{
                    xs: {
                        position: "absolute",
                        top: "-100px",
                    },
                    md: {
                        position: "relative",
                    }

                }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="h4" sx={{
                            fontWeight: "500",
                        }}>
                            John Doe
                        </Typography>
                        <span>
                            <IconButton>
                                <Edit />
                            </IconButton>
                        </span>
                    </Box>
                    <Box>
                        <Typography color="GrayText" variant="subtitle1">
                            @johndoe
                        </Typography>
                        <Typography color="GrayText" variant="subtitle1">
                            Group <strong >31</strong>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box >

    )
}

export default ProfileCard