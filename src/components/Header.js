import * as React from "react";
import { useState } from "react";
import LoginServices from "../services/LoginServices";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleProfile = () => {
    setAnchorElUser(null);
    navigate("../profile");
  };
  const handleHome = () => {
    navigate("../chats");
  };
  const handleLogin = () => {
    navigate("../login");
  };
  const handleSignup = () => {
    navigate("../signup");
  };
  const handleLogout = () => {
    setAnchorElUser(null);
    LoginServices.Logout();
    navigate("../login");
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const HomeButton = styled(Button)({
    color: "white",
  });

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          {/* <Typography textAlign="center">
            <HomeButton onClick={handleHome} color="secondary">
              Home
            </HomeButton>
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}></Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://www.w3schools.com/howto/img_avatar.png"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {auth.currentUser ? (
                <div>
                  {/* <MenuItem key="profile" onClick={handleProfile}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem> */}
                  <MenuItem key="Logout" onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </div>
              ) : (
                <div>
                  <MenuItem key="login" onClick={handleLogin}>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                  <MenuItem key="signup" onClick={handleSignup}>
                    <Typography textAlign="center">Sign up</Typography>
                  </MenuItem>
                </div>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
