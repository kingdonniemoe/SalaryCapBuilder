import Table from "react-bootstrap/Table";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import NavBar from "react-bootstrap/Navbar";
import { api } from "../utilities";
import NavbarText from "react-bootstrap/esm/NavbarText";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

function PlayerTable() {
  let navigate = useNavigate();
  const buttons = [
    "QB",
    "RB",
    "FB",
    "WR",
    "TE",
    "LT",
    "LG",
    "C",
    "RG",
    "RT",
    "EDGE",
    "IDL",
    "LB",
    "CB",
    "S",
    "LS",
    "K",
    "P",
  ];
  const [players, setPlayers] = useState([]);
  const [userRoster, setUserRoster] = useState([]);
  const [salaryCap, setSalaryCap] = useState(255400000);
  const [activePlayer, setActivePlayer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchPlayers("QB");
  }, []);

  const handlePlayerClick = async (player) => {
    setActivePlayer(null);
    let response = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(
        player.player
      )}`
    );
    let playerData =
      response.data.player && response.data.player[0]
        ? response.data.player[0]
        : null;
    setActivePlayer({
      ...player,
      description: playerData ? playerData.strDescriptionEN : undefined,
    });
  };

  const sortData = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    const sortedPlayers = [...players].sort((a, b) => {
      let first = a[field];
      let second = b[field];

      if (field === "apy" || field === "total_value") {
        first = parseCurrency(first);
        second = parseCurrency(second);
      }

      if (first === null) return 1;
      if (second === null) return -1;

      if (field === "apy" || field === "total_value") {
        return order === "asc" ? first - second : second - first;
      } else {
        return order === "asc"
          ? first.localeCompare(second)
          : second.localeCompare(first);
      }
    });
    setPlayers(sortedPlayers);
  };

  const handleCloseModal = () => {
    setActivePlayer(null);
  };
  const fetchPlayers = async (position) => {
    let token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      let response = await api.get(`players/${position}`);
      setPlayers(response.data);
    }
  };

  const parseCurrency = (str) => {
    const numericStr = str.replace(/[^0-9.-]+/g, "");
    return parseInt(numericStr, 10);
  };

  const formatCurrency = (str) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(str);
  };

  const addToRoster = (player) => {
    const isAlreadyAdded = userRoster.some(
      (p) => p.player_id === player.player_id
    );

    if (isAlreadyAdded) {
      alert("Player already added!");
    } else {
      setUserRoster([...userRoster, player]);
      setSalaryCap((prevCap) => {
        const playerApy = parseCurrency(player.apy);
        return prevCap - playerApy;
      });
    }
  };

  const removeFromRoster = (playerToRemove) => {
    setUserRoster(
      userRoster.filter(
        (player) => player.player_id !== playerToRemove.player_id
      )
    );
    setSalaryCap((prevCap) => {
      const playerApy = parseCurrency(playerToRemove.apy);
      return prevCap + playerApy;
    });
  };

  const submitRoster = async () => {
    const token = localStorage.getItem("token");
    let payload = {
      player_ids: userRoster.map((player) => player.player_id),
      player_count: userRoster.length,
      cap_remaining: salaryCap,
    };
    let response = await api.post("players/roster/", payload, token);
    navigate("/dashboard");
  };

  const PlayerDetailsModal = () => {
    return (
      <Modal show={activePlayer !== null} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{activePlayer?.player}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Position: {activePlayer?.position}</p>
          <p>Team: {activePlayer?.team}</p>
          <p>Total Contract Value: {activePlayer?.total_value}</p>
          <p>Annual Pay (APY): {activePlayer?.apy}</p>
          {activePlayer?.description && (
            <p style={{ textAlign: "center" }}>{activePlayer?.description}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  return (
    <>
      <PlayerDetailsModal />
      <div
        style={{
          minHeight: "100vh",
          marginTop: "50px",
          width: "100%",
          overflowY: "auto",
        }}
      >
        <NavBar className="button-navbar">
          <input
            type="text"
            placeholder="Search by player name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ margin: "10px 20px", padding: "5px 10px", width: "300px" }}
          />
          {buttons.map((button, idx) => (
            <Button
              key={idx}
              variant="danger"
              onClick={() => fetchPlayers(button)}
            >
              {button}
            </Button>
          ))}
          <NavbarText style={{ fontSize: "20px", fontWeight: "bold" }}>
            Salary Cap Remaining
          </NavbarText>
          <NavbarText
            style={{
              padding: "2px",
              borderRadius: "5px",
              backgroundColor: "aliceblue",
              color: "red",
              fontWeight: "bold",
              fontSize: "30px",
            }}
          >
            {formatCurrency(salaryCap)}
          </NavbarText>
        </NavBar>
        <div className="table-container">
          <Table
            striped
            bordered
            hover
            className="player-table"
            style={{ borderRadius: "8px", overflow: "hidden" }}
          >
            <thead>
              <tr>
                <th
                  style={{ textAlign: "center", cursor: "pointer" }}
                  onClick={() => sortData("player")}
                >
                  Player Name{" "}
                  {sortField === "player"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th style={{ textAlign: "center" }}>Position</th>
                <th
                  style={{ textAlign: "center", cursor: "pointer" }}
                  onClick={() => sortData("team")}
                >
                  Current Team{" "}
                  {sortField === "team"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th
                  style={{ textAlign: "center", cursor: "pointer" }}
                  onClick={() => sortData("total_value")}
                >
                  Total Contract{" "}
                  {sortField === "total_value"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th
                  style={{ textAlign: "center", cursor: "pointer" }}
                  onClick={() => sortData("apy")}
                >
                  Cap Hit{" "}
                  {sortField === "apy" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
                <th style={{ textAlign: "center" }}>Add</th>
              </tr>
            </thead>
            <tbody>
              {players
                .filter((player) =>
                  player.player.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((player, idx) => (
                  <tr key={idx}>
                    <td
                      style={{ textAlign: "center", cursor: "pointer" }}
                      onClick={() => handlePlayerClick(player)}
                    >
                      {player.player}
                    </td>
                    <td style={{ textAlign: "center" }}>{player.position}</td>
                    <td style={{ textAlign: "center" }}>{player.team}</td>
                    <td style={{ textAlign: "center" }}>
                      {player.total_value}
                    </td>
                    <td style={{ textAlign: "center" }}>{player.apy}</td>
                    <td style={{ textAlign: "center" }}>
                      <Button
                        variant="success"
                        onClick={() => addToRoster(player)}
                      >
                        Add
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        <div className="table-container">
          <Table
            striped
            bordered
            hover
            className="player-table"
            style={{ borderRadius: "8px", overflow: "hidden" }}
          >
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Player Name</th>
                <th style={{ textAlign: "center" }}>Position</th>
                <th style={{ textAlign: "center" }}>Current Team</th>
                <th style={{ textAlign: "center" }}>Total Contract</th>
                <th style={{ textAlign: "center" }}>Cap Hit</th>
                <th style={{ textAlign: "center" }}>Remove</th>
              </tr>
            </thead>
            <tbody>
              {userRoster.map((player, idx) => (
                <tr key={idx}>
                  <td style={{ textAlign: "center" }}>{player.player}</td>
                  <td style={{ textAlign: "center" }}>{player.position}</td>
                  <td style={{ textAlign: "center" }}>{player.team}</td>
                  <td style={{ textAlign: "center" }}>{player.total_value}</td>
                  <td style={{ textAlign: "center" }}>{player.apy}</td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      variant="danger"
                      onClick={() => removeFromRoster(player)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="primary" onClick={submitRoster}>
              Submit Roster
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayerTable;
