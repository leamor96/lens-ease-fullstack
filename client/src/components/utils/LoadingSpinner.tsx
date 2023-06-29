import { ColorRing } from "react-loader-spinner";

const LoadingSpinner = () => {
      
  return (
    <div className="loader-container">
      <ColorRing
        visible={true}
        height={80}
        width={80}
        colors={["#ffc107", "#fff", "#343a40", "#ffc107", "#ffc107"]}
      />
    </div>
  );
};

export default LoadingSpinner;
