import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "space-around",
    padding: "20px",
  },
  divider: {
    marginBottom: "10px",
    marginTop: "10px",
  },
}));

export default useStyles;
