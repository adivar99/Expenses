import { Container, makeStyles, React, useSelector } from "../component";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(3, 0, 2),
  },
}));

function Records() {
  const classes = useStyles();

  const { user } = useSelector((state) => state.auth);

  return (
    <React.Fragment>
      <Container></Container>
    </React.Fragment>
  );
}

export default Records;
