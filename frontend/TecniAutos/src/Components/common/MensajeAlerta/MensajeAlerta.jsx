import PropTypes from "prop-types";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const MensajeAlerta = ({ open, onClose, severity, mensaje }) => {
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    onClose();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={3000}
      onClose={handleCloseAlert}
    >
      <MuiAlert
        onClose={handleCloseAlert}
        severity={severity}
        elevation={6}
        variant="filled"
      >
        {mensaje}
      </MuiAlert>
    </Snackbar>
  );
};

MensajeAlerta.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  severity: PropTypes.oneOf(["error", "info", "success", "warning"]).isRequired,
  mensaje: PropTypes.string.isRequired,
};

export default MensajeAlerta;
