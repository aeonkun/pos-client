import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  header: {
    fontWeight: "bold",
  },
  warning: {
    color: "red",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    width: "800px",
    height: "500px",
    boxShadow: theme.shadows[6],
    padding: theme.spacing(2, 4, 3),
  },
  statusHistory: {
    width: "100%",
    height: "100%",
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
  },
  divider: {
    marginTop: "10px",
    marginBottom: "10px",
  },
}));

export default useStyles;
