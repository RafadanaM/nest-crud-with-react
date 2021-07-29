import { Snackbar } from "@material-ui/core";

import React, { createContext, ReactNode, useState } from "react";

// const useStyles = makeStyles((theme) => ({
//   baseContainer: {
//     display: "flex",
//     flexDirection: "column",
//     flex: "1",
//     marginLeft: "7rem",
//     marginRight: "7rem",
//     padding: "1rem",
//     marginTop: "0",
//   },
//   notificationContainer: {
//     fontSize: "14px",
//     boxSizing: "border-box",
//     position: "fixed",
//     zIndex: 999999,
//   },
//   position: {
//     top: "12px",
//     right: "12px",
//     transition: "transform .6s ease-in-out",
//   },
//   notification: {
//     background: "#fff",
//     transition: ".3s ease",
//     position: "relative",
//     pointerEvents: "auto",
//     overflow: "hidden",
//     margin: "0 0 6px",
//     padding: "30px",
//     marginBottom: "15px",
//     width: "300px",
//     maxHeight: "100px",
//     borderRadius: "3px 3px 3px 3px",
//     boxShadow: "0 0 10px #999",
//     color: "#000",
//     opacity: 0.9,
//     backgroundPosition: "15px",
//     backgroundRepeat: "no-repeat",
//   },

//   toast: {
//     height: "50px",
//     width: "365px",
//     color: "#fff",
//     padding: "20px 15px 10px 10px",
//   },
//   //  notificationContainer: {
//   // fontSize: "14px",
//   // boxSizing: "border-box",
//   // position: "fixed",
//   // zIndex: "999999"
//   // }
// }));

interface IProps {
  children: ReactNode;
}

interface ToastContextProps {
  openToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextProps>({
  openToast: () => {},
});
const ToastProvider = ({ children }: IProps) => {
  // const css = useStyles();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const openToast = (message: string) => {
    setMessage(message);
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const ToastContextValue: ToastContextProps = {
    openToast: openToast,
  };
  return (
    <ToastContext.Provider value={ToastContextValue}>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={3000}
        message={message}
        onClose={handleClose}
      />
      {children}
    </ToastContext.Provider>
  );
};

const useToastS = () => React.useContext(ToastContext);

export { ToastProvider, useToastS };
