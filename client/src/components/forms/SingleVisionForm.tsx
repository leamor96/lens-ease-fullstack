import { useState } from "react";
import { useDispatch } from "react-redux";
import { submitFormData } from "../../features/lenses/lensSlice";
import { AppDispatch } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { LensFormData } from "../../@types";
import { useMediaQuery } from "react-responsive";

const SingleVisionForm = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [pdBothEyes, setPdBothEyes] = useState("60");
  const [pdLeftEye, setPdLeftEye] = useState("30");
  const [pdRightEye, setPdRightEye] = useState("30");

  // Validation function to check if a value is a valid number
  const isValidNumber = (value: any) => {
    return !Number.isNaN(parseFloat(value));
  };

  const handlePdBothEyesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pdValue = e.target.value;
    if (isValidNumber(pdValue)) {
      setPdBothEyes(pdValue);
      setPdLeftEye((parseInt(pdValue, 10) / 2).toString());
      setPdRightEye((parseInt(pdValue, 10) / 2).toString());
    }
  };

  const handlePdRightEyeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pdValue = e.target.value;
    if (isValidNumber(pdValue)) {
      setPdRightEye(pdValue);
      setPdBothEyes(
        (parseInt(pdValue, 10) + parseInt(pdLeftEye, 10)).toString()
      );
    }
  };

  const handlePdLeftEyeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pdValue = e.target.value;
    if (isValidNumber(pdValue)) {
      setPdLeftEye(pdValue);
      setPdBothEyes(
        (parseInt(pdValue, 10) + parseInt(pdRightEye, 10)).toString()
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      "sph-right": { value: string };
      "cyl-right": { value: string };
      "sph-left": { value: string };
      "cyl-left": { value: string };
    };

    const cylRightValue = target["cyl-right"].value;
    const cylLeftValue = target["cyl-left"].value;
    const sphRightValue = target["sph-right"].value;
    const sphLeftValue = target["sph-left"].value;

    if (
      isValidNumber(cylRightValue) &&
      isValidNumber(cylLeftValue) &&
      isValidNumber(sphRightValue) &&
      isValidNumber(sphLeftValue)
    ) {
      const formData: LensFormData = {
        sphRight: parseFloat(sphRightValue),
        cylRight: parseFloat(cylRightValue),
        sphLeft: parseFloat(sphLeftValue),
        cylLeft: parseFloat(cylLeftValue),
      };

      try {
        const data = await dispatch(submitFormData(formData));
        console.log(data);

        navigate("/lens-options", { state: { data } });
      } catch (error: any) {
        console.log("Error submitting form data:", error.message);
      }
    } else {
      console.log("Invalid input for cylMax");
    }
  };

  return (
    <div className="p-5 bg-dark text-light">
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <h4>Right Eye (OD)</h4>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="sph-right" className="form-label">
              Sph
            </label>
            <input
              type="number"
              min="-30"
              max="30"
              step="0.25"
              defaultValue="0"
              className="form-control"
              id="sph-right"
              name="sph-right"
            />
          </div>
          <div className="col">
            <label htmlFor="cyl-right" className="form-label">
              Cyl
            </label>
            <input
              type="number"
              min="-20"
              max="0"
              step="0.25"
              defaultValue="0"
              className="form-control"
              id="cyl-right"
              name="cyl-right"
            />
          </div>
          <div className="col">
            <label htmlFor="axis-right" className="form-label">
              Axis
            </label>
            <input
              type="number"
              min="0"
              max="180"
              step="1"
              defaultValue="0"
              className="form-control"
              id="axis-right"
            />
          </div>
          {isMobile && (
            <div>
              <br />
            </div>
          )}
          <div className="col">
            <label htmlFor="prism-right" className="form-label">
              Prism
            </label>
            <input
              type="number"
              min="0"
              max="30"
              step="0.50"
              defaultValue="0"
              className="form-control"
              id="prism-right"
            />
          </div>
          <div className="col">
            <label htmlFor="prism-direction-right" className="form-label">
              Prism Direction
            </label>
            <select className="form-select" id="prism-direction-right">
              <option value="in">IN</option>
              <option value="out">OUT</option>
              <option value="up">UP</option>
              <option value="down">DOWN</option>
            </select>
          </div>
        </div>
        {isMobile && (
          <div>
            <br />
          </div>
        )}
        <div className="row mb-3">
          <div className="col">
            <h4>Left Eye (OS)</h4>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="sph-left" className="form-label">
              Sph
            </label>
            <input
              type="number"
              min="-30"
              max="30"
              step="0.25"
              defaultValue="0"
              className="form-control"
              id="sph-left"
              name="sph-left"
            />
          </div>
          <div className="col">
            <label htmlFor="cyl-left" className="form-label">
              Cyl
            </label>
            <input
              type="number"
              min="-20"
              max="0"
              step="0.25"
              defaultValue="0"
              className="form-control"
              id="cyl-left"
              name="cyl-left"
            />
          </div>
          <div className="col">
            <label htmlFor="axis-left" className="form-label">
              Axis
            </label>
            <input
              type="number"
              min="0"
              max="180"
              step="1"
              defaultValue="0"
              className="form-control"
              id="axis-left"
            />
          </div>
          {isMobile && (
            <div>
              <br />
            </div>
          )}
          <div className="col">
            <label htmlFor="prism-left" className="form-label">
              Prism
            </label>
            <input
              type="number"
              min="0"
              max="30"
              step="0.50"
              defaultValue="0"
              className="form-control"
              id="prism-left"
            />
          </div>
          <div className="col">
            <label htmlFor="prism-direction-left" className="form-label">
              Prism Direction
            </label>
            <select className="form-select" id="prism-direction-left">
              <option value="in">IN</option>
              <option value="out">OUT</option>
              <option value="up">UP</option>
              <option value="down">DOWN</option>
            </select>
          </div>
        </div>
        {isMobile && (
          <div>
            <br />
          </div>
        )}
        <div className="row mb-3">
          <div className="col">
            <h4>Pupil Distance (PD)</h4>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="pd-both-eyes" className="form-label">
              Both Eyes
            </label>
            <input
              type="number"
              min="40"
              max="100"
              step="0.5"
              value={pdBothEyes}
              onChange={handlePdBothEyesChange}
              className="form-control"
              id="pd-both-eyes"
            />
          </div>
          <div className="col">
            <label htmlFor="pd-left-eye" className="form-label">
              Left Eye
            </label>
            <input
              type="number"
              min="20"
              max="50"
              step="0.5"
              value={pdLeftEye}
              onChange={handlePdLeftEyeChange}
              className="form-control"
              id="pd-left-eye"
            />
          </div>
          <div className="col">
            <label htmlFor="pd-right-eye" className="form-label">
              Right Eye
            </label>
            <input
              type="number"
              min="20"
              max="50"
              step="0.5"
              value={pdRightEye}
              onChange={handlePdRightEyeChange}
              className="form-control"
              id="pd-right-eye"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-warning">
          Finish
        </button>
      </form>
    </div>
  );
};
export default SingleVisionForm;
