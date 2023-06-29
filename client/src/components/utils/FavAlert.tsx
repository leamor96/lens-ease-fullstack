import Swal from "sweetalert2";

interface FavAlertProps {
  title: string;
}

const FavAlert: React.FC<FavAlertProps> = ({ title }) => {
  const successAlert = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-warning",
    },
    buttonsStyling: false,
  });

  successAlert.fire({
    title,
    showCancelButton: false,
    confirmButtonText: "OK",
  });

  return null;
};

export default FavAlert;
