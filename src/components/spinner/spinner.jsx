import { Spinner as BsSpinner } from "react-bootstrap";
import "./spinner.css";

const Spinner = ({ global, animation="border", variant="primary" }) => {
    return (
        global ? <div className="spinner-global-wrapper">
            <BsSpinner animation={animation} role="status" variant={variant}>
          <span className="visually-hidden">Loading...</span>
        </BsSpinner>
        </div> :
        <BsSpinner animation={animation} role="status" variant={variant}>
        <span className="visually-hidden">Loading...</span>
      </BsSpinner>
      );
}

export default Spinner;