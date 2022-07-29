import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { Avatar, Stack } from '@mui/material';

type SuccessModalProps = {
    open: boolean;
    handleClose: () => void;
}


export default function SuccessModal({ open, handleClose }: SuccessModalProps) {

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                sx={{
                    "& .MuiPaper-root": {
                        borderRadius: "15px",
                    }
                }}
            >
                <DialogContent dividers sx={
                    {
                        width: {
                            xs: "250px",
                            md: "300px",
                            xl: "400px"
                        },
                        padding: "50px 20px",
                    }
                }  >
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={{
                        xs: 1,
                        md: 2,
                        lg: 3
                    }}>
                        <Avatar
                            sx={{
                                width: {
                                    xs: "100px",
                                    md: "150px",
                                },
                                height: {
                                    xs: "100px",
                                    md: "150px",
                                }
                            }}
                            src="/assets/imgs/success_confirmation_icon.svg" />
                        <Typography variant="h2" sx={{
                            fontSize: {
                                xs: "20px",
                                lg: "30px"
                            }, fontWeight: "bold"
                        }} textAlign="center">
                            Profile updated <br /> successfully
                        </Typography>
                        <Button
                            sx={{
                                minWidth: "80px",
                            }}
                            color="primary"
                            variant='contained'
                            onClick={handleClose}>
                            OK
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    );
}
