import React from "react";
import PlayerTable from "../components/PlayerTable.jsx";
import Header from "../components/Header.jsx";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const CreateRoster = () => {
  let navigate = useNavigate();

  return (
    <div>
      <Header />
      <PlayerTable />
      <div className="navigate-buttons">
        <Button onClick={() => navigate(-1)}>Back</Button>
        <Button variant="success">Submit</Button>
      </div>
    </div>
  );
};

export default CreateRoster;
