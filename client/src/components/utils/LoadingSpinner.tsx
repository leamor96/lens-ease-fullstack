import { ColorRing } from "react-loader-spinner";

const LoadingSpinner = () => {
      
  return (
    <div className="loader-container">
        <ColorRing
          visible={true}
          height={80}
          width={80}
          colors={["#ffc107", "#343a40", "#e15b64", "#f47e60", "#f8b26a"]}
        />
    </div>
  );
};

export default LoadingSpinner;
