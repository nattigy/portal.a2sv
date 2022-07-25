import { AppBar, Toolbar, IconButton, Typography, Box, MenuItem, Tooltip, Avatar, Menu, Button, Divider, MenuList, ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIcon, List } from '@mui/material'
import React, { useState } from 'react'
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

    return (
        <Box>
            <AppBar
                position="sticky"
                color="transparent"
                elevation={0}
                sx={{ padding: { xs: "15px 5px", sm: "10px 15px", lg: "15px 20px" }, height: { xs: "150px", sm: "90px" }, }}
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
                        display: { xs: "flex", flexDirection: "column", sm: "none" },
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
                                            sx={{ mr: 1, display: { sm: 'none' } }}
                                        >
                                            <MenuIcon />
                                        </IconButton>
                                    )
                                }
                                <Box sx={{ height: { xs: "40px", sm: "60px" } }}>
                                    <Link href="/" className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-button MuiTypography-colorPrimary">
                                        <img alt="Logo enterprise" width="100%" height="100%" src="/assets/imgs/logo.svg" className="" />
                                    </Link>
                                </Box>
                            </Box>

                            <Box sx={{

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
                                                fontSize: { xs: "16px", sm: "18px", lg: "20px" },
                                                lineHeight: "20px",
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
                        display: { xs: "none", sm: "flex" }, flexDirection: {
                            sm: "row"
                        }, justifyContent: "space-between", alignItems: "center"
                    }}>
                        <Box sx={{ display: "flex", xs: { flexGrow: 1, justifyContent: "space-between" }, sm: { flexGrow: 0 } }}>
                            {
                                props.handleDrawerToggle && (
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        edge="start"
                                        onClick={props.handleDrawerToggle}
                                        sx={{ mr: 2, display: { sm: 'none' } }}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                )
                            }
                            <Box sx={{ height: { xs: "40px", sm: "60px" } }}>
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
                                                    lg: "20px"

                                                },
                                                lineHeight: {
                                                    sm: "18px",
                                                    lg: "24px"
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
                        <Box >
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
                    </Box>



                </Toolbar>
            </AppBar>
        </Box >
    )
}

export default CustomAppbar