import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
// Mui Components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
// Icons
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import PageviewIcon from "@mui/icons-material/Pageview";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ForumIcon from "@mui/icons-material/Forum";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CoPresentIcon from "@mui/icons-material/CoPresent";
// Redux
import { selectAuthState } from "~/slices/authSlice";
import { useSelector } from "react-redux";
import useSetAuthState from "~/hooks/useSetAuthState";

const LinkStyle = {
  my: 2,
  display: "block",
  color: "#059669",
  fontSize: 14,
  fontWeight: 600,
  margin: "0px 16px",
};

function InsideHeader() {
  const router = useRouter();
  const curUser: any = useSelector(selectAuthState);
  const setAuthState = useSetAuthState();
  const isTeacher = curUser?.is_teacher;

  React.useEffect(() => {
    console.log("Current User: ", curUser);
  }, []);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function logOut() {
    localStorage.clear();
    router.push("/");
  }

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            color="primary"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Mentorey
          </Typography>
          {/* Mobile Link Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <CastForEducationIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <Link href="/general/learn">Learn</Link>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <PageviewIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <Link href="/general/find_coach">Find a Coach</Link>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Diversity1Icon fontSize="small" color="primary" />
                </ListItemIcon>
                <Link href="/general/seminar">Seminar</Link>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ForumIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <Link href="/message">Message</Link>
              </MenuItem>
            </Menu>
          </Box>
          {/* Mobile Logo */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            color="primary"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Mentorey
          </Typography>
          {/* Desktop Link Box */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Button sx={LinkStyle} href="/general/learn">
              <CastForEducationIcon className="mx-auto block" />
              <Link href="/general/learn">Learn</Link>
            </Button>
            <Button sx={LinkStyle} href="/general/find_coach">
              <PageviewIcon className="mx-auto block" />
              <Link href="/general/find_coach">Find a Coach</Link>
            </Button>
            <Button sx={LinkStyle} href="/general/seminar">
              <Diversity1Icon className="mx-auto block" />
              <Link href="/general/seminar">Seminar</Link>
            </Button>
            <Button sx={LinkStyle} href="/message">
              <ForumIcon className="mx-auto block" />
              <Link href="/message">Message</Link>
            </Button>
          </Box>
          {/* Avatar Button */}
          <Box sx={{ marginLeft: "auto" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={curUser?.avatar != "null" ? curUser.avatar : undefined}
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
              <MenuItem onClick={() => router.push(`/uprof/${curUser["sub"]}`)}>
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                My User Profile
              </MenuItem>
              {curUser && isTeacher ? (
                <MenuItem>
                  <ListItemIcon>
                    <CoPresentIcon fontSize="small" />
                  </ListItemIcon>
                  <Link href={`/profile/coach/${curUser.id}`}>
                    My Coach Profile
                  </Link>
                </MenuItem>
              ) : null}
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <BorderColorIcon fontSize="small" />
                </ListItemIcon>
                <Link href="/profile/edit">Edit my profile</Link>
              </MenuItem>
              {curUser
                ? !isTeacher && (
                    <MenuItem>
                      <ListItemIcon>
                        <AssignmentIndIcon fontSize="small" />
                      </ListItemIcon>
                      <Link href="/pupil/be_coach">Become a Coach</Link>
                    </MenuItem>
                  )
                : null}
              {curUser && isTeacher ? (
                <MenuItem>
                  <ListItemIcon>
                    <AddToPhotosIcon fontSize="small" />
                  </ListItemIcon>
                  <Link href="/coach/new_lesson">Create a new Lesson</Link>
                </MenuItem>
              ) : null}
              {curUser && isTeacher ? (
                <MenuItem>
                  <ListItemIcon>
                    <DashboardIcon fontSize="small" />
                  </ListItemIcon>
                  <Link href="/coach/dashboard">My Coach Dashboard</Link>
                </MenuItem>
              ) : null}
              <MenuItem onClick={handleCloseUserMenu}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={logOut}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Log out
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default InsideHeader;
