import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Home, Piano } from "@mui/icons-material";
//import GitHubIcon from '@mui/icons-material/GitHub';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Box>
                <AppBar position="fixed" >
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 0.02 }}>
                            Museek
                        </Typography>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Button startIcon={<Home />} sx={{ color: '#fff' }} onClick={() => navigate("/")}>
                                Home
                            </Button>
                            <Button startIcon={<Piano />} sx={{ color: '#fff' }} onClick={() => navigate("/genre")}>
                                Genre
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </div >
    )
}

export default Header;