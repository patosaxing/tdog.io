import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import ProfileAvatar from '../img/ProfileAvatar.svg';
import  { useSelector } from "react-redux";

const ProfileCard = () => {
  const cardStyle = {
    width: "14rem",
    marginLeft: '20vw',
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
        <Card.Title>{userInfo ? userInfo.username : 'USERNAME'}</Card.Title>
        <Card.Text>
        {userInfo ? userInfo.primarySkill : 'PRIMARY SKILL'}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>{userInfo ? userInfo.location : '📍 LOCATION'}</ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Card.Link href="{userInfo.linkedIN}">{userInfo ? userInfo.linkedIN : 'LinkedIn profile'}</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;
