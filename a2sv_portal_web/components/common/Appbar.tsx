import { AppBar, Toolbar, IconButton, Typography, Box, MenuItem, Tooltip, Avatar, Menu, Button, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIcon, List, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { grey } from '@mui/material/colors';

type Props = {
    handleDrawerToggle?: () => void
}
const pages = [
    {
        id: "1",
        title: "Home",
        link: "/"
    },
    {
        id: "2",
        title: "Problems",
        link: "/problems"

    },
    {
        id: "3",
        title: "Contests",
        link: "/contests"

    },
    {
        id: "4",
        title: "Events",
        link: "/events"
    }];

const CustomAppbar = (props: Props) => {
    const router = useRouter();
    const [hasUnread, setHasUnread] = useState(false)
    const [, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    useEffect(() => {
        setHasUnread(true)
    }, [])


    return (
        <Box sx={{
            height: "64px",
        }}>
            <AppBar
                position="fixed"
                color="transparent"
                elevation={0}

                sx={{
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center", padding: { xs: "15px 5px", sm: "10px 15px", lg: "15px 20px" }, height: { xs: "120px", md: "72px" },
                }}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {/* Mobile navbar */}
                    <Box sx={{
                        width: "100%",
                        display: { xs: "flex", flexDirection: "column", md: "none" },
                    }}>
                        <Box sx={{
                            padding: { xs: "0 15px", sm: "0 10px", lg: "0px" },
                            width: "100%",
                            display: { xs: "flex", justifyContent: "space-between" },
                        }}>
                            <Box sx={{
                                display: "flex", xs: {
                                    flexGrow: 1,
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                },
                                sm: { flexGrow: 0 }
                            }}>
                                {
                                    props.handleDrawerToggle && (
                                        <IconButton
                                            color="inherit"
                                            aria-label="open drawer"
                                            edge="start"
                                            onClick={props.handleDrawerToggle}
                                            sx={{ mr: 1, display: { md: 'none' } }}
                                        >
                                            <MenuIcon />
                                        </IconButton>
                                    )
                                }
                                <Box sx={{ height: { xs: "40px", md: "60px" } }}>
                                    <Link href="/" className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-button MuiTypography-colorPrimary">
                                        <img alt="Logo enterprise" width="100%" height="100%" src="/assets/imgs/logo.svg" className="" />
                                    </Link>
                                </Box>
                            </Box>

                            {/* <Box sx={{
                                border: "1px solid #e0e0e0",
                            }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuList
                                        sx={{
                                            padding: "10px 20px",

                                        }}
                                    >
                                        <MenuItem sx={{ padding: "0 10px" }} onClick={handleCloseUserMenu}>
                                            <ListItem disablePadding>
                                                <ListItemButton  >
                                                    <ListItemIcon>
                                                        <SvgIcon width="22" height="22" >
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M15 8C15 9.06087 14.5786 10.0783 13.8284 10.8284C13.0783 11.5786 12.0609 12 11 12C9.93913 12 8.92172 11.5786 8.17157 10.8284C7.42143 10.0783 7 9.06087 7 8C7 6.93913 7.42143 5.92172 8.17157 5.17157C8.92172 4.42143 9.93913 4 11 4C12.0609 4 13.0783 4.42143 13.8284 5.17157C14.5786 5.92172 15 6.93913 15 8ZM13 8C13 8.53043 12.7893 9.03914 12.4142 9.41421C12.0391 9.78929 11.5304 10 11 10C10.4696 10 9.96086 9.78929 9.58579 9.41421C9.21071 9.03914 9 8.53043 9 8C9 7.46957 9.21071 6.96086 9.58579 6.58579C9.96086 6.21071 10.4696 6 11 6C11.5304 6 12.0391 6.21071 12.4142 6.58579C12.7893 6.96086 13 7.46957 13 8Z" fill="black" />
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M11 0C4.925 0 0 4.925 0 11C0 17.075 4.925 22 11 22C17.075 22 22 17.075 22 11C22 4.925 17.075 0 11 0ZM2 11C2 13.09 2.713 15.014 3.908 16.542C4.74723 15.4399 5.8299 14.5467 7.07143 13.9323C8.31297 13.3179 9.67974 12.9988 11.065 13C12.4323 12.9987 13.7819 13.3095 15.0109 13.9088C16.2399 14.508 17.316 15.3799 18.157 16.458C19.0234 15.3216 19.6068 13.9952 19.8589 12.5886C20.111 11.182 20.0244 9.73553 19.6065 8.36898C19.1886 7.00243 18.4512 5.75505 17.4555 4.73004C16.4598 3.70503 15.2343 2.93186 13.8804 2.47451C12.5265 2.01716 11.0832 1.88877 9.66986 2.09997C8.25652 2.31117 6.91379 2.85589 5.75277 3.68905C4.59175 4.52222 3.64581 5.61987 2.99323 6.8912C2.34065 8.16252 2.00018 9.57097 2 11ZM11 20C8.93395 20.0031 6.93027 19.2923 5.328 17.988C5.97293 17.0647 6.83134 16.3109 7.83019 15.7907C8.82905 15.2705 9.93879 14.9992 11.065 15C12.1772 14.9991 13.2735 15.2636 14.2629 15.7714C15.2524 16.2793 16.1064 17.0159 16.754 17.92C15.1393 19.2667 13.1026 20.0029 11 20Z" fill="black" />
                                                        </SvgIcon>

                                                    </ListItemIcon>
                                                    <ListItemText primary={"Profile"} />
                                                </ListItemButton>
                                            </ListItem>

                                        </MenuItem>
                                        <MenuItem sx={{ padding: "0 10px" }} onClick={handleCloseUserMenu}>
                                            <ListItem disablePadding>
                                                <ListItemButton  >
                                                    <ListItemIcon>
                                                        <SvgIcon width="22" height="22" >
                                                            <path d="M14.3 16.5V13.2H6.6V8.8H14.3V5.5L19.8 11L14.3 16.5ZM12.1 0C12.6835 0 13.2431 0.231785 13.6556 0.644365C14.0682 1.05694 14.3 1.61652 14.3 2.2V4.4H12.1V2.2H2.2V19.8H12.1V17.6H14.3V19.8C14.3 20.3835 14.0682 20.9431 13.6556 21.3556C13.2431 21.7682 12.6835 22 12.1 22H2.2C1.61652 22 1.05694 21.7682 0.644365 21.3556C0.231785 20.9431 0 20.3835 0 19.8V2.2C0 1.61652 0.231785 1.05694 0.644365 0.644365C1.05694 0.231785 1.61652 0 2.2 0H12.1Z" fill="black" />
                                                        </SvgIcon>
                                                    </ListItemIcon>
                                                    <ListItemText primary={"Logout"} />
                                                </ListItemButton>
                                            </ListItem>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </Box>

                             */}
                            <Stack
                                direction='row'
                                alignItems="center"
                                spacing={{
                                    xs: 1,
                                    md: 2,
                                }}
                            >
                                <Box>
                                    <IconButton sx={{
                                        p: {
                                            xs: "5px",
                                            md: "10px",
                                        },
                                    }}>
                                        {
                                            hasUnread ? (
                                                <svg width="24" height="28" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16.057 33.9999C16.7756 33.9935 17.4651 33.8897 18.0037 33.7067C18.5423 33.5237 18.8952 33.2734 19 33H13C13.1078 33.2808 13.4772 33.537 14.0395 33.7209C14.6018 33.9049 15.3188 34.004 16.057 33.9999V33.9999Z" fill="#565656" />
                                                    <path d="M31.6349 26.9076C30.5994 26.0528 29.6928 25.0729 28.9396 23.9942C28.1173 22.5052 27.6244 20.8791 27.4899 19.2114V14.2993C27.4856 13.7027 27.4281 13.1074 27.3181 12.5195C26.4729 12.363 25.6606 12.081 24.9128 11.6842C25.1978 12.5342 25.3426 13.4192 25.3423 14.3093V19.2213C25.4739 21.2558 26.0783 23.2399 27.1141 25.0382C27.8555 26.126 28.7351 27.1275 29.7342 28.0213H2.23356C3.23265 27.1275 4.11232 26.126 4.85369 25.0382C5.88952 23.2399 6.49389 21.2558 6.6255 19.2213V14.2993C6.61985 13.1486 6.85939 12.0081 7.33041 10.9431C7.80142 9.87822 8.49466 8.90979 9.37043 8.0933C10.2462 7.27682 11.2873 6.62831 12.4341 6.18491C13.5809 5.74152 14.8109 5.51195 16.0537 5.50934C17.8725 5.51069 19.6505 6.00875 21.1651 6.9412C20.9981 6.37341 20.9044 5.78931 20.8859 5.2011V4.57466C19.7647 4.06393 18.5601 3.72797 17.3208 3.58032V2.32745C17.3208 1.97539 17.1698 1.63775 16.9009 1.3888C16.6321 1.13986 16.2674 1 15.8872 1C15.507 1 15.1424 1.13986 14.8736 1.3888C14.6047 1.63775 14.4537 1.97539 14.4537 2.32745V3.63004C11.6786 3.99253 9.13887 5.27243 7.30332 7.23347C5.46778 9.1945 4.46038 11.7042 4.46711 14.2993V19.2114C4.33262 20.8791 3.83976 22.5052 3.01745 23.9942C2.27746 25.0704 1.38544 26.0502 0.365101 26.9076C0.250557 27.0008 0.158756 27.1155 0.0958039 27.2441C0.0328521 27.3726 0.00019307 27.5122 0 27.6534V29.0057C0 29.2694 0.113135 29.5223 0.314516 29.7088C0.515897 29.8952 0.78903 30 1.07383 30H30.9262C31.211 30 31.4841 29.8952 31.6855 29.7088C31.8869 29.5223 32 29.2694 32 29.0057V27.6534C31.9998 27.5122 31.9671 27.3726 31.9042 27.2441C31.8412 27.1155 31.7494 27.0008 31.6349 26.9076V26.9076Z" fill="#565656" />
                                                    <path d="M29 10C31.7614 10 34 7.76142 34 5C34 2.23858 31.7614 0 29 0C26.2386 0 24 2.23858 24 5C24 7.76142 26.2386 10 29 10Z" fill="#F04949" />
                                                </svg>

                                            ) : (
                                                <svg width="22" height="23" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16.057 32.9999C16.7756 32.9935 17.4651 32.8897 18.0037 32.7067C18.5423 32.5237 18.8952 32.2734 19 32H13C13.1078 32.2808 13.4772 32.537 14.0395 32.7209C14.6018 32.9049 15.3188 33.004 16.057 32.9999V32.9999Z" fill="#565656" />
                                                    <path d="M31.6349 25.9076C30.5994 25.0528 29.6928 24.0729 28.9396 22.9942C28.1173 21.5052 27.6244 19.8791 27.4899 18.2114V13.2993C27.4856 12.7027 27.4281 12.1074 27.3181 11.5195C26.4729 11.363 25.6606 11.081 24.9128 10.6842C25.1978 11.5342 25.3426 12.4192 25.3423 13.3093V18.2213C25.4739 20.2558 26.0783 22.2399 27.1141 24.0382C27.8555 25.126 28.7351 26.1275 29.7342 27.0213H2.23356C3.23265 26.1275 4.11232 25.126 4.85369 24.0382C5.88952 22.2399 6.49389 20.2558 6.6255 18.2213V13.2993C6.61985 12.1486 6.85939 11.0081 7.33041 9.94315C7.80142 8.87822 8.49466 7.90979 9.37043 7.0933C10.2462 6.27682 11.2873 5.62831 12.4341 5.18491C13.5809 4.74152 14.8109 4.51195 16.0537 4.50934C17.8725 4.51069 19.6505 5.00875 21.1651 5.9412C20.9981 5.37341 20.9044 4.78931 20.8859 4.2011V3.57466C19.7647 3.06393 18.5601 2.72797 17.3208 2.58032V1.32745C17.3208 0.975386 17.1698 0.637745 16.9009 0.3888C16.6321 0.139856 16.2674 0 15.8872 0C15.507 0 15.1424 0.139856 14.8736 0.3888C14.6047 0.637745 14.4537 0.975386 14.4537 1.32745V2.63004C11.6786 2.99253 9.13887 4.27243 7.30332 6.23347C5.46778 8.1945 4.46038 10.7042 4.46711 13.2993V18.2114C4.33262 19.8791 3.83976 21.5052 3.01745 22.9942C2.27746 24.0704 1.38544 25.0502 0.365101 25.9076C0.250557 26.0008 0.158756 26.1155 0.0958039 26.2441C0.0328521 26.3726 0.00019307 26.5122 0 26.6534V28.0057C0 28.2694 0.113135 28.5223 0.314516 28.7088C0.515897 28.8952 0.78903 29 1.07383 29H30.9262C31.211 29 31.4841 28.8952 31.6855 28.7088C31.8869 28.5223 32 28.2694 32 28.0057V26.6534C31.9998 26.5122 31.9671 26.3726 31.9042 26.2441C31.8412 26.1155 31.7494 26.0008 31.6349 25.9076V25.9076Z" fill="#565656" />
                                                </svg>
                                            )
                                        }

                                    </IconButton>
                                </Box>

                                <Box

                                >
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/2.jpg" />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{
                                            mt: '45px',
                                            "& .MuiPaper-root": {
                                                borderRadius: "0 0 20px 20px",
                                                width: {
                                                    xs: "250px"
                                                },
                                            }
                                        }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <Box sx={{
                                            display: "flex",
                                            padding: "10px",
                                            rowGap: "1px",
                                            flexDirection: "column",
                                            alignItems: "center"
                                        }}>
                                            <Tooltip title="Profile">
                                                <>
                                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: "5px 0" }}>
                                                        <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/2.jpg" />
                                                    </IconButton>
                                                    <Typography variant="h5">John Doe</Typography>
                                                    <Typography variant="subtitle1">@johndoe</Typography>
                                                    <Typography variant="subtitle2">Student G-31</Typography>
                                                </>
                                            </Tooltip>
                                        </Box>
                                        <Divider />
                                        <List
                                            sx={{
                                                padding: "10px 20px",
                                            }}
                                        >
                                            <MenuItem sx={{ padding: "0 10px" }} onClick={handleCloseUserMenu}>
                                                <ListItem disablePadding>
                                                    <Link href="/profile">
                                                        <ListItemButton  >
                                                            <ListItemIcon>
                                                                <SvgIcon width="22" height="22" >
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M15 8C15 9.06087 14.5786 10.0783 13.8284 10.8284C13.0783 11.5786 12.0609 12 11 12C9.93913 12 8.92172 11.5786 8.17157 10.8284C7.42143 10.0783 7 9.06087 7 8C7 6.93913 7.42143 5.92172 8.17157 5.17157C8.92172 4.42143 9.93913 4 11 4C12.0609 4 13.0783 4.42143 13.8284 5.17157C14.5786 5.92172 15 6.93913 15 8ZM13 8C13 8.53043 12.7893 9.03914 12.4142 9.41421C12.0391 9.78929 11.5304 10 11 10C10.4696 10 9.96086 9.78929 9.58579 9.41421C9.21071 9.03914 9 8.53043 9 8C9 7.46957 9.21071 6.96086 9.58579 6.58579C9.96086 6.21071 10.4696 6 11 6C11.5304 6 12.0391 6.21071 12.4142 6.58579C12.7893 6.96086 13 7.46957 13 8Z" fill="black" />
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M11 0C4.925 0 0 4.925 0 11C0 17.075 4.925 22 11 22C17.075 22 22 17.075 22 11C22 4.925 17.075 0 11 0ZM2 11C2 13.09 2.713 15.014 3.908 16.542C4.74723 15.4399 5.8299 14.5467 7.07143 13.9323C8.31297 13.3179 9.67974 12.9988 11.065 13C12.4323 12.9987 13.7819 13.3095 15.0109 13.9088C16.2399 14.508 17.316 15.3799 18.157 16.458C19.0234 15.3216 19.6068 13.9952 19.8589 12.5886C20.111 11.182 20.0244 9.73553 19.6065 8.36898C19.1886 7.00243 18.4512 5.75505 17.4555 4.73004C16.4598 3.70503 15.2343 2.93186 13.8804 2.47451C12.5265 2.01716 11.0832 1.88877 9.66986 2.09997C8.25652 2.31117 6.91379 2.85589 5.75277 3.68905C4.59175 4.52222 3.64581 5.61987 2.99323 6.8912C2.34065 8.16252 2.00018 9.57097 2 11ZM11 20C8.93395 20.0031 6.93027 19.2923 5.328 17.988C5.97293 17.0647 6.83134 16.3109 7.83019 15.7907C8.82905 15.2705 9.93879 14.9992 11.065 15C12.1772 14.9991 13.2735 15.2636 14.2629 15.7714C15.2524 16.2793 16.1064 17.0159 16.754 17.92C15.1393 19.2667 13.1026 20.0029 11 20Z" fill="black" />
                                                                </SvgIcon>

                                                            </ListItemIcon>
                                                            <ListItemText primary="Profile" />
                                                        </ListItemButton>
                                                    </Link>
                                                </ListItem>

                                            </MenuItem>
                                            <MenuItem sx={{ padding: "0 10px" }} onClick={handleCloseUserMenu}>
                                                <ListItem disablePadding>
                                                    <ListItemButton  >
                                                        <ListItemIcon>
                                                            <SvgIcon width="22" height="22" >
                                                                <path d="M14.3 16.5V13.2H6.6V8.8H14.3V5.5L19.8 11L14.3 16.5ZM12.1 0C12.6835 0 13.2431 0.231785 13.6556 0.644365C14.0682 1.05694 14.3 1.61652 14.3 2.2V4.4H12.1V2.2H2.2V19.8H12.1V17.6H14.3V19.8C14.3 20.3835 14.0682 20.9431 13.6556 21.3556C13.2431 21.7682 12.6835 22 12.1 22H2.2C1.61652 22 1.05694 21.7682 0.644365 21.3556C0.231785 20.9431 0 20.3835 0 19.8V2.2C0 1.61652 0.231785 1.05694 0.644365 0.644365C1.05694 0.231785 1.61652 0 2.2 0H12.1Z" fill="black" />
                                                            </SvgIcon>
                                                        </ListItemIcon>
                                                        <ListItemText primary={"Logout"} />
                                                    </ListItemButton>
                                                </ListItem>

                                            </MenuItem>
                                        </List>
                                    </Menu>

                                </Box>
                            </Stack>
                        </Box>
                        <Box sx={{
                            flexGrow: 1, display: {
                                xs: 'flex', justifyContent: "center",
                            },
                            columnGap: { xs: "10px", sm: "15px", lg: "20px", },
                        }}>
                            {pages.map((page) => {
                                const isActive = router.pathname === page.link
                                return (
                                    <Link
                                        href={page.link}
                                        key={page.id}
                                    >
                                        <Button
                                            variant="text"
                                            onClick={handleCloseNavMenu}
                                            sx={{
                                                textTransform: "none",
                                                my: 2,
                                                display: 'block',
                                                fontStyle: "normal",
                                                fontWeight: 400,
                                                fontSize: { xs: "16px", lg: "18px" },
                                                lineHeight: "18px",
                                                letterSpacing: { xs: "0.01em", sm: "0.02em" },
                                                color: isActive ? "primary" : grey[600],
                                            }}
                                        >
                                            {page.title}
                                        </Button>
                                    </Link>
                                )
                            })}

                        </Box>
                    </Box>

                    {/* Desktop navbar */}
                    <Box sx={{
                        width: "90%",
                        display: { xs: "none", md: "flex" }, flexDirection: {
                            md: "row"
                        }, justifyContent: "space-between", alignItems: "center"
                    }}>
                        <Box sx={{ display: "flex", xs: { flexGrow: 1, justifyContent: "space-between" }, md: { flexGrow: 0 } }}>
                            {
                                props.handleDrawerToggle && (
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        edge="start"
                                        onClick={props.handleDrawerToggle}
                                        sx={{ mr: 2, display: { md: 'none' } }}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                )
                            }
                            <Box sx={{ height: { xs: "40px", md: "40px", } }}>
                                <Link className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-button MuiTypography-colorPrimary" href="/">
                                    <img alt="Logo enterprise" width="100%" height="100%" src="/assets/imgs/logo.svg" className="" />
                                </Link>
                            </Box>
                        </Box>
                        <Box sx={{
                            flexGrow: 1, display: {
                                xs: 'flex'
                            },
                            columnGap: {
                                sm: "0px",
                                md: "10px",
                                lg: "20px",
                            },
                            justifyContent: "center",
                        }}>
                            {pages.map((page) => {
                                const isActive = router.pathname === page.link

                                return (
                                    <Link
                                        href={page.link}
                                        key={page.id}
                                    >
                                        <Button
                                            variant="text"
                                            onClick={handleCloseNavMenu}
                                            sx={{
                                                textTransform: "none",
                                                my: 2,
                                                display: 'block',
                                                fontStyle: "normal",
                                                fontWeight: 400,
                                                fontSize: {
                                                    sm: "16px",
                                                    lg: "18px"

                                                },
                                                lineHeight: {
                                                    sm: "16px",
                                                    lg: "20px"
                                                },
                                                letterSpacing: {
                                                    sm: "0.02em",
                                                    lg: "0.03em"
                                                },
                                                color: isActive ? "primary" : grey[600],
                                            }}
                                        >
                                            {page.title}
                                        </Button>
                                    </Link>
                                )
                            })}
                        </Box>
                        <Stack
                            direction='row'
                            alignItems="center"
                            spacing={2}
                        >
                            <Box>
                                <IconButton sx={{ p: "10px", }}>
                                    {
                                        hasUnread ? (
                                            <svg width="24" height="28" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.057 33.9999C16.7756 33.9935 17.4651 33.8897 18.0037 33.7067C18.5423 33.5237 18.8952 33.2734 19 33H13C13.1078 33.2808 13.4772 33.537 14.0395 33.7209C14.6018 33.9049 15.3188 34.004 16.057 33.9999V33.9999Z" fill="#565656" />
                                                <path d="M31.6349 26.9076C30.5994 26.0528 29.6928 25.0729 28.9396 23.9942C28.1173 22.5052 27.6244 20.8791 27.4899 19.2114V14.2993C27.4856 13.7027 27.4281 13.1074 27.3181 12.5195C26.4729 12.363 25.6606 12.081 24.9128 11.6842C25.1978 12.5342 25.3426 13.4192 25.3423 14.3093V19.2213C25.4739 21.2558 26.0783 23.2399 27.1141 25.0382C27.8555 26.126 28.7351 27.1275 29.7342 28.0213H2.23356C3.23265 27.1275 4.11232 26.126 4.85369 25.0382C5.88952 23.2399 6.49389 21.2558 6.6255 19.2213V14.2993C6.61985 13.1486 6.85939 12.0081 7.33041 10.9431C7.80142 9.87822 8.49466 8.90979 9.37043 8.0933C10.2462 7.27682 11.2873 6.62831 12.4341 6.18491C13.5809 5.74152 14.8109 5.51195 16.0537 5.50934C17.8725 5.51069 19.6505 6.00875 21.1651 6.9412C20.9981 6.37341 20.9044 5.78931 20.8859 5.2011V4.57466C19.7647 4.06393 18.5601 3.72797 17.3208 3.58032V2.32745C17.3208 1.97539 17.1698 1.63775 16.9009 1.3888C16.6321 1.13986 16.2674 1 15.8872 1C15.507 1 15.1424 1.13986 14.8736 1.3888C14.6047 1.63775 14.4537 1.97539 14.4537 2.32745V3.63004C11.6786 3.99253 9.13887 5.27243 7.30332 7.23347C5.46778 9.1945 4.46038 11.7042 4.46711 14.2993V19.2114C4.33262 20.8791 3.83976 22.5052 3.01745 23.9942C2.27746 25.0704 1.38544 26.0502 0.365101 26.9076C0.250557 27.0008 0.158756 27.1155 0.0958039 27.2441C0.0328521 27.3726 0.00019307 27.5122 0 27.6534V29.0057C0 29.2694 0.113135 29.5223 0.314516 29.7088C0.515897 29.8952 0.78903 30 1.07383 30H30.9262C31.211 30 31.4841 29.8952 31.6855 29.7088C31.8869 29.5223 32 29.2694 32 29.0057V27.6534C31.9998 27.5122 31.9671 27.3726 31.9042 27.2441C31.8412 27.1155 31.7494 27.0008 31.6349 26.9076V26.9076Z" fill="#565656" />
                                                <path d="M29 10C31.7614 10 34 7.76142 34 5C34 2.23858 31.7614 0 29 0C26.2386 0 24 2.23858 24 5C24 7.76142 26.2386 10 29 10Z" fill="#F04949" />
                                            </svg>

                                        ) : (
                                            <svg width="22" height="23" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.057 32.9999C16.7756 32.9935 17.4651 32.8897 18.0037 32.7067C18.5423 32.5237 18.8952 32.2734 19 32H13C13.1078 32.2808 13.4772 32.537 14.0395 32.7209C14.6018 32.9049 15.3188 33.004 16.057 32.9999V32.9999Z" fill="#565656" />
                                                <path d="M31.6349 25.9076C30.5994 25.0528 29.6928 24.0729 28.9396 22.9942C28.1173 21.5052 27.6244 19.8791 27.4899 18.2114V13.2993C27.4856 12.7027 27.4281 12.1074 27.3181 11.5195C26.4729 11.363 25.6606 11.081 24.9128 10.6842C25.1978 11.5342 25.3426 12.4192 25.3423 13.3093V18.2213C25.4739 20.2558 26.0783 22.2399 27.1141 24.0382C27.8555 25.126 28.7351 26.1275 29.7342 27.0213H2.23356C3.23265 26.1275 4.11232 25.126 4.85369 24.0382C5.88952 22.2399 6.49389 20.2558 6.6255 18.2213V13.2993C6.61985 12.1486 6.85939 11.0081 7.33041 9.94315C7.80142 8.87822 8.49466 7.90979 9.37043 7.0933C10.2462 6.27682 11.2873 5.62831 12.4341 5.18491C13.5809 4.74152 14.8109 4.51195 16.0537 4.50934C17.8725 4.51069 19.6505 5.00875 21.1651 5.9412C20.9981 5.37341 20.9044 4.78931 20.8859 4.2011V3.57466C19.7647 3.06393 18.5601 2.72797 17.3208 2.58032V1.32745C17.3208 0.975386 17.1698 0.637745 16.9009 0.3888C16.6321 0.139856 16.2674 0 15.8872 0C15.507 0 15.1424 0.139856 14.8736 0.3888C14.6047 0.637745 14.4537 0.975386 14.4537 1.32745V2.63004C11.6786 2.99253 9.13887 4.27243 7.30332 6.23347C5.46778 8.1945 4.46038 10.7042 4.46711 13.2993V18.2114C4.33262 19.8791 3.83976 21.5052 3.01745 22.9942C2.27746 24.0704 1.38544 25.0502 0.365101 25.9076C0.250557 26.0008 0.158756 26.1155 0.0958039 26.2441C0.0328521 26.3726 0.00019307 26.5122 0 26.6534V28.0057C0 28.2694 0.113135 28.5223 0.314516 28.7088C0.515897 28.8952 0.78903 29 1.07383 29H30.9262C31.211 29 31.4841 28.8952 31.6855 28.7088C31.8869 28.5223 32 28.2694 32 28.0057V26.6534C31.9998 26.5122 31.9671 26.3726 31.9042 26.2441C31.8412 26.1155 31.7494 26.0008 31.6349 25.9076V25.9076Z" fill="#565656" />
                                            </svg>
                                        )
                                    }

                                </IconButton>
                            </Box>

                            <Box

                            >
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{
                                        mt: '45px',
                                        "& .MuiPaper-root": {
                                            borderRadius: "0 0 20px 20px",
                                            width: {
                                                xs: "250px"
                                            },
                                        }
                                    }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <Box sx={{
                                        display: "flex",
                                        padding: "10px",
                                        rowGap: "1px",
                                        flexDirection: "column",
                                        alignItems: "center"
                                    }}>
                                        <Tooltip title="Profile">
                                            <>
                                                <IconButton onClick={handleOpenUserMenu} sx={{ p: "5px 0" }}>
                                                    <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/2.jpg" />
                                                </IconButton>
                                                <Typography variant="h5">John Doe</Typography>
                                                <Typography variant="subtitle1">@johndoe</Typography>
                                                <Typography variant="subtitle2">Student G-31</Typography>
                                            </>
                                        </Tooltip>
                                    </Box>
                                    <Divider />
                                    <List
                                        sx={{
                                            padding: "10px 20px",
                                        }}
                                    >
                                        <MenuItem sx={{ padding: "0 10px" }} onClick={handleCloseUserMenu}>
                                            <ListItem disablePadding>
                                                <Link href="/profile">
                                                    <ListItemButton  >
                                                        <ListItemIcon>
                                                            <SvgIcon width="22" height="22" >
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M15 8C15 9.06087 14.5786 10.0783 13.8284 10.8284C13.0783 11.5786 12.0609 12 11 12C9.93913 12 8.92172 11.5786 8.17157 10.8284C7.42143 10.0783 7 9.06087 7 8C7 6.93913 7.42143 5.92172 8.17157 5.17157C8.92172 4.42143 9.93913 4 11 4C12.0609 4 13.0783 4.42143 13.8284 5.17157C14.5786 5.92172 15 6.93913 15 8ZM13 8C13 8.53043 12.7893 9.03914 12.4142 9.41421C12.0391 9.78929 11.5304 10 11 10C10.4696 10 9.96086 9.78929 9.58579 9.41421C9.21071 9.03914 9 8.53043 9 8C9 7.46957 9.21071 6.96086 9.58579 6.58579C9.96086 6.21071 10.4696 6 11 6C11.5304 6 12.0391 6.21071 12.4142 6.58579C12.7893 6.96086 13 7.46957 13 8Z" fill="black" />
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M11 0C4.925 0 0 4.925 0 11C0 17.075 4.925 22 11 22C17.075 22 22 17.075 22 11C22 4.925 17.075 0 11 0ZM2 11C2 13.09 2.713 15.014 3.908 16.542C4.74723 15.4399 5.8299 14.5467 7.07143 13.9323C8.31297 13.3179 9.67974 12.9988 11.065 13C12.4323 12.9987 13.7819 13.3095 15.0109 13.9088C16.2399 14.508 17.316 15.3799 18.157 16.458C19.0234 15.3216 19.6068 13.9952 19.8589 12.5886C20.111 11.182 20.0244 9.73553 19.6065 8.36898C19.1886 7.00243 18.4512 5.75505 17.4555 4.73004C16.4598 3.70503 15.2343 2.93186 13.8804 2.47451C12.5265 2.01716 11.0832 1.88877 9.66986 2.09997C8.25652 2.31117 6.91379 2.85589 5.75277 3.68905C4.59175 4.52222 3.64581 5.61987 2.99323 6.8912C2.34065 8.16252 2.00018 9.57097 2 11ZM11 20C8.93395 20.0031 6.93027 19.2923 5.328 17.988C5.97293 17.0647 6.83134 16.3109 7.83019 15.7907C8.82905 15.2705 9.93879 14.9992 11.065 15C12.1772 14.9991 13.2735 15.2636 14.2629 15.7714C15.2524 16.2793 16.1064 17.0159 16.754 17.92C15.1393 19.2667 13.1026 20.0029 11 20Z" fill="black" />
                                                            </SvgIcon>

                                                        </ListItemIcon>
                                                        <ListItemText primary="Profile" />
                                                    </ListItemButton>
                                                </Link>
                                            </ListItem>

                                        </MenuItem>
                                        <MenuItem sx={{ padding: "0 10px" }} onClick={handleCloseUserMenu}>
                                            <ListItem disablePadding>
                                                <ListItemButton  >
                                                    <ListItemIcon>
                                                        <SvgIcon width="22" height="22" >
                                                            <path d="M14.3 16.5V13.2H6.6V8.8H14.3V5.5L19.8 11L14.3 16.5ZM12.1 0C12.6835 0 13.2431 0.231785 13.6556 0.644365C14.0682 1.05694 14.3 1.61652 14.3 2.2V4.4H12.1V2.2H2.2V19.8H12.1V17.6H14.3V19.8C14.3 20.3835 14.0682 20.9431 13.6556 21.3556C13.2431 21.7682 12.6835 22 12.1 22H2.2C1.61652 22 1.05694 21.7682 0.644365 21.3556C0.231785 20.9431 0 20.3835 0 19.8V2.2C0 1.61652 0.231785 1.05694 0.644365 0.644365C1.05694 0.231785 1.61652 0 2.2 0H12.1Z" fill="black" />
                                                        </SvgIcon>
                                                    </ListItemIcon>
                                                    <ListItemText primary={"Logout"} />
                                                </ListItemButton>
                                            </ListItem>

                                        </MenuItem>
                                    </List>
                                </Menu>

                            </Box>
                        </Stack>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box >
    )
}

export default CustomAppbar