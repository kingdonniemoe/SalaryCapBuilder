import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { api } from "../utilities";

const UserDashboard = () => {
  let navigate = useNavigate();
  const [rosters, setRosters] = useState([]);

  const goCreate = () => {
    navigate("create/");
  };

  const formatCurrency = (str) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(str);
  };

  const deleteRoster = async (rosterId) => {
    const token = localStorage.getItem("token");
    await api.delete(`players/user-rosters/${rosterId}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const updatedRoster = rosters.filter((roster) => roster.id !== rosterId);
    setRosters(updatedRoster);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login/");
        return;
      }

      const { data } = await api.get("players/user-rosters/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setRosters(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <h1>Your Rosters</h1>
      <div
        className="Roster-Cards"
        style={{
          overflow: "auto",
          display: "flex",
          maxWidth: "90%",
          textAlign: "center",
        }}
      >
        {rosters.map((roster,idx) => (
          <Card key={roster.id} style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>#{idx+1}</Card.Title>
              <Card.Text>Roster Size: {roster.player_count}</Card.Text>
              <Card.Text style={{ fontWeight: "bold" }}>
                Salary Cap Remaining: {formatCurrency(roster.cap_remaining)}
              </Card.Text>
              <Button variant="danger" onClick={() => deleteRoster(roster.id)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      <div className="dashboard-buttons">
        <Button size="lg" onClick={goCreate}>
          Create
        </Button>
      </div>
    </>
  );
};

export default UserDashboard;
