import React, { ReactNode, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
	Box,
	FormControl,
	MenuItem,
	Grid,
	Typography,
	Select,
} from "@mui/material";
import Image from "next/image";
import Rectangle from "./Rectangle";

const theme = createTheme({
	palette: {
		primary: {
			main: "#2766B5",
		},
		secondary: {
			main: "#fff",
		},
		text: {
			primary: "#000",
			secondary: "#fff",
		},
	},
	typography: {
		fontFamily: "Poppins",
		body1: {
			fontSize: 14,
		},
	},
});

type LayoutProps = {
	children: ReactNode;
};
const Layout = (props: LayoutProps) => {
	const [language, setLanguage] = useState("Amh");
	return (
		<ThemeProvider theme={theme}>
			<Grid
				container
				sx={{
					height: "100vh",
					minHeight: "40vh",
				}}
			>
				<Grid
					item
					xs={12}
					lg={6}
					sx={{
						bgcolor: "primary.main",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						p: 2,
					}}
				>
					<Box>
						<Image
							src={"/assets/imgs/asset1.svg"}
							height={200}
							width={500}
							alt='asset1'
						/>
						<Box
							sx={{
								mt: 5,
								width: 250,
								textAlign: "center",
								mx: "auto",
							}}
						>
							<Typography variant='h4' sx={{ color: "text.secondary" }}>
								Quick Access
							</Typography>
							<Typography sx={{ color: "text.secondary" }}>
								Get the most of your work by using simple search
							</Typography>
						</Box>
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								mt: 3,
							}}
						>
							<Rectangle
								color='#fff'
								padx={2}
								pady={1}
								margin={1}
								borderRadius={2}
							/>
							<Rectangle
								color='#fff'
								padx={1}
								pady={1}
								margin={1}
								borderRadius={2}
							/>
							<Rectangle
								color='#fff'
								padx={1}
								pady={1}
								margin={1}
								borderRadius={2}
							/>
						</Box>
					</Box>
				</Grid>
				<Grid item xs={12} lg={6} sx={{ p: 1 }}>
					<Box
						sx={{
							display: "flex",
							justifyContent: "end",
							alignItems: "center",
						}}
					>
						<FormControl sx={{ mx: 1 }} size='small'>
							<Select
								variant='standard'
								disableUnderline
								labelId='locale-select-label'
								id='locale'
								value={language}
								onChange={(event) => {
									setLanguage(event.target.value);
								}}
							>
								<MenuItem value={"Amh"}>am</MenuItem>
								<MenuItem value={"Eng"}>en</MenuItem>
								<MenuItem value={"Arb"}>ar</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
							alignItems: "center",
							maxHeight: "80vh",
							minHeight: "45vh",
							my: 3,
						}}
					>
						<Box sx={{ display: "flex", justifyContent: "center" }}>
							<Image
								src={"/assets/imgs/logo.svg"}
								height={60}
								width={150}
								alt='asset1'
							/>
						</Box>
						{props.children}
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
};
export default Layout;
