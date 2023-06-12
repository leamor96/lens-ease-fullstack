import { useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom';
import CardList from '../components/cards/CardList';
import ProCardList from '../components/cards/pro-cards/ProCardList';

const Lenses = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="algorithm-page">
      <div className="select-options bg-dark d-flex justify-content-center align-items-center vh-100">
        <NavLink
          to="/lenses/card-list"
          className="btn btn-warning btn-select p-3 m-3"
          onClick={() => handleOptionSelect("single")}
        >
          <h2> Single Vision</h2>
        </NavLink>
        <NavLink
          to="/lenses/pro-card-list"
          className="btn btn-warning p-3 m-3 btn-select"
          onClick={() => handleOptionSelect("progressive")}
        >
          <h2> Progressive</h2>
        </NavLink>
      </div>

      {/* Render the form component based on the selected option */}
      <div className="form-container">
        <Routes>
          <Route path="/lenses/card-list" element={<CardList />} />
          <Route path="/lenses/pro-card-list" element={<ProCardList />} />
        </Routes>
      </div>
    </div>
  );
}

export default Lenses