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
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    width: "1000px",
    height: "800px",
    boxShadow: theme.shadows[6],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default useStyles;
