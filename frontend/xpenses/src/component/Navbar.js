import {
  AppBar,
  Button,
  Link,
  React,
  ToolBar,
  useDispatch,
  useHistory,
  useSelector,
} from "./index";
import AssessmentIcon from "@material-ui/icons/Assessment";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import { doLogOut } from "../auth/authDispatcher";
import { Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: "#e6e6e6",
    },
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `3px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  activeLink: {
    margin: theme.spacing(1, 1.5),
    backgroundColor: "#3f51b5",
    color: "#ffffff",
    "&:hover": {
      color: "#3f51b5",
      backgroundColor: "#ffffff",
      border: "1px solid #3f51b5",
    },
  },
}));

function Navbar(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  function logout() {
    doLogOut(dispatch, history);
  }

  const classes = useStyles();
  const { isLoggedIn, token, user } = useSelector((state) => state.auth);

  const isNotLoggedIn = !isLoggedIn;

  const allMenus = [
    { url: "/dashboard", label: "Dashboard", rule: isLoggedIn },
    { url: "/records", label: "Records", rule: isLoggedIn },
    { url: "/personal", label: "Personal", rule: isLoggedIn },
    { url: "/stock", label: "Stock", rule: isLoggedIn },
  ];

  const currentPath = location.pathname;

  const menusToBeDisplayed = allMenus
    .filter((value) => value.rule)
    .map((item) => {
      const menuClassName =
        item.url == currentPath ? classes.activeLink : classes.link;
      return { ...item, menuClassName };
    });

  return (
    <React.Fragment>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            &nbsp;
            <Button
              component={Link}
              variant="text"
              to="/"
              className={classes.link}
            >
              <AssessmentIcon />
              Xpenses
            </Button>
          </Typography>

          <nav>
            {menusToBeDisplayed.map((item, index) => {
              return (
                <Button
                  key={index}
                  component={Link}
                  variant="text"
                  color="primary"
                  to={item.url}
                  className={item.menuClassName}
                >
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {isLoggedIn ? (
            <Button
              id="btnlogout"
              onClick={logout}
              color="secondary"
              variant="outlined"
              className={classes.link}
            >
              Logout
            </Button>
          ) : (
            <div>
              <Button
                component={Link}
                to="/login"
                color="secondary"
                variant="outlined"
                className={classes.link}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                color="primary"
                variant="outlined"
                className={classes.link}
              >
                Register
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Navbar;
