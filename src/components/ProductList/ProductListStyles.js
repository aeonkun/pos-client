import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  list: {
    listStyleType: "none",
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

export default useStyles;
