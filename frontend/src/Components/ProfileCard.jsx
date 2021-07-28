import { Card } from "react-bootstrap";
import ProfileAvatar from "../img/ProfileAvatar.svg";
import { useSelector } from "react-redux";

const ProfileCard = () => {
  const cardStyle = {
    width: "20rem",
    marginLeft: "20vw",
    // float: "right",
    borderRadius: "1rem",
    background: "#e8e8e8",
    boxShadow: "-20px 20px 60px #d7d2d2 20px -20px 60px #ffffff",
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Card style={cardStyle}>
      <Card.Img variant="top" src={ProfileAvatar} />
      <Card.Body>
        <Card.Title style={{ float: "right" }}>
          {userInfo ? userInfo.username : "USERNAME"}
        </Card.Title>
        <Card.Text>
          <i class="fas fa-drafting-compass"></i>{" "}
          {userInfo ? userInfo.primarySkill : "PRIMARY SKILL"}
        </Card.Text>
        <Card.Text>
          📍 {userInfo ? userInfo.userLocation : " LOCATION"}
        </Card.Text>
        <Card.Text>📧 {userInfo ? userInfo.email : "EMAIL"}</Card.Text>
        <Card.Text>
          <i class="fab fa-linkedin"></i>{" "}
          {userInfo ? userInfo.linkedIN : "LinkedIn profile"}
        </Card.Text>
        <Card.Text>
          <i class="far fa-file-video"></i> Total: "List.Length+1" videos
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;
