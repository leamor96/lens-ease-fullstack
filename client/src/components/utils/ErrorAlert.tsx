import Swal from "sweetalert2";

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  Swal.fire({
    title: "Error",
    text: message,
    customClass: {
      confirmButton: "btn btn-warning",
      cancelButton: "btn btn-dark",
    },
    buttonsStyling: false,
    confirmButtonText: "OK",
    cancelButtonText: "Close",
  });

  return null;
};

export default ErrorAlert;
