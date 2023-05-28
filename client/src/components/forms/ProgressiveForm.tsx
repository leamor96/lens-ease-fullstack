import React from 'react'

const ProgressiveForm = () => {
  return (
    <div className="p-5 bg-dark text-light">
      <form>
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

        <div className="row mb-3">
          <div className="col">
            <label htmlFor="add-right" className="form-label">
              Add
            </label>
            <input
              type="number"
              min="0.5"
              max="5"
              step="0.25"
              defaultValue="0"
              className="form-control"
              id="add-right"
            />
          </div>
        </div>

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

        <div className="row mb-3">
          <div className="col">
            <label htmlFor="add-left" className="form-label">
              Add
            </label>
            <input
              type="number"
              min="0.5"
              max="5"
              step="0.25"
              defaultValue="0"
              className="form-control"
              id="add-left"
            />
          </div>
        </div>

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
              defaultValue="60"
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
              defaultValue="30"
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
              defaultValue="30"
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

export default ProgressiveForm