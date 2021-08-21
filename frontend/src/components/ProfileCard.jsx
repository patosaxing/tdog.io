import { Dropdown, Card } from "react-bootstrap";
import ProfileAvatar from "../img/ProfileAvatar.svg";
import { useSelector } from "react-redux";

const ProfileCard = () => {
  const cardStyle = {
    marginRight: "2vw",
    display: "flex",
    flexDirection: "column",
    padding: "0.5rem",
    height: "fit-content",
    width: "18rem",
    borderRadius: "1rem",
    background: "#e8e8e8",
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // console.log("skills here", userInfo);

  return (
    <Card style={cardStyle}>
      <Card.Img
        variant="top"
        src={ProfileAvatar}
        style={{ maxHeight: "10rem" }}
      />

      <Dropdown className="d-inline ">
        <Dropdown.Toggle id="dropdown-autoclose-true">
          {userInfo ? userInfo.username : "USERNAME"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#">
            <i class="fas fa-drafting-compass"></i>{" "}
            {userInfo ? userInfo.primarySkills : "PRIMARY SKILL"}
          </Dropdown.Item>
          <Dropdown.Item href="#">
            {" "}
            📍 {userInfo ? userInfo.userLocation : " LOCATION"}
          </Dropdown.Item>
          <Dropdown.Item href="#">
            📧 {userInfo ? userInfo.email : "EMAIL"}
          </Dropdown.Item>
          <Dropdown.Item href="#">
            <i class="fab fa-linkedin"></i>{" "}
            {userInfo ? userInfo.linkedIN : "LinkedIn profile"}
          </Dropdown.Item>
          <Dropdown.Item href="#">
            {" "}
            <i class="far fa-file-video"></i> Total: 22 videos
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Card>
  );
};

export default ProfileCard;
