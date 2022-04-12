import { Audio } from "react-loader-spinner";

const Spinner = ({ size }) => {
  return (
    <div className="loader">
      <Audio height={size} width={size} color="grey" ariaLabel="loading" />
    </div>
  );
};

export default Spinner;
