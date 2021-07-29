import { Card } from "react-bootstrap";
import ProfileAvatar from "../img/ProfileAvatar.svg";
import { useSelector } from "react-redux";

const ProfileCard = () => {
  const cardStyle = {
    width: "20rem",
    // marginLeft: "1vw",
    // float: "right",
    display: "flex",
    flexDirection: "column",
    zoom: '75%',
    padding: "0.5rem",
    height:'27rem',
    // width: 'auto',
    borderRadius: "1rem",
    background: "#e8e8e8",
    boxShadow: "-20px 20px 60px #d7d2d2 20px -20px 60px #ffffff",
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Card style={cardStyle}>
       <Card.Title>
          {userInfo ? userInfo.username : "USERNAME"}
        </Card.Title>
      <Card.Img variant="top" src={ProfileAvatar} style={{maxHeight:'10rem'}} />
      <Card.Body> 
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
          <i class="far fa-file-video"></i> Total: 22 videos
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;
