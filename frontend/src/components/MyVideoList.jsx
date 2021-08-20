import React, { useEffect, useState } from "react";
import { Table, Button, Row, Col, Offcanvas, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import Loader from "./Loader";
import FileUploader from "./FileUpload/FileUploader";
// import Paginate from "../components/Paginate";
import questions from "./Interview_questions.json";
import {
  listMyVideos,
  deleteVideo,
  createVideo,
} from "../actions/videoActions";
// import { VIDEO_CREATE_RESET } from "../constants/videoConstants";

const MyVideoList = ({ history }) => {
  const dispatch = useDispatch();

  // const videoList = useSelector((state) => state.videoList);
  // const { loading, error, videos, page, pages } = videoList;

  const videoDelete = useSelector((state) => state.videoDelete);
  const {
    loadingDEL: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = videoDelete;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (ID) => {
    console.log("clicked this ID", ID);
    setShow(true);
  };

  const [showUploader, SetShowUploader] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const myVideosList = useSelector((state) => state.myVideosList);
  const { loadingMYVID, errorMYVID, videos } = myVideosList;

  const [category, setCategory] = useState("Basic interview questions");
  const [Skill, setSkill] = useState("");
  const [userNote, setUserNote] = useState("");
  const [sharePublic, setSharePublic] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listMyVideos());
    }
  }, [dispatch, userInfo, successDelete, showUploader]);

  const deleteHandler = (id) => {
    if (window.confirm(" ⚠️   Confirm deleting this Video? ")) {
      dispatch(deleteVideo(id));
    }
  };

  const createVideoHandler = () => {
    dispatch(createVideo());
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // dispatch editVideoRequest
    console.log("edit Video submitted", videos);
  };

  return (
    <div>
      {showUploader && <FileUploader />}
      <Row className="align-items-center">
        <Col>
          <h5>Your uploaded Videos</h5>
        </Col>
        {/* <Col className='text-right'>
          <Button className='my-3' onClick={createVideoHandler}>
            ➕ Upload a new Video
          </Button>
        </Col> */}
        <Col className="text-right">
          {!showUploader && (
            <Button
              className="my-3"
              variant="outline-dark"
              onClick={() => SetShowUploader(true)}
            >
              ⮉ Upload a new Video
            </Button>
          )}
          {showUploader && (
            <Button
              variant="outline-danger"
              onClick={() => SetShowUploader(false)}
            >
              ❌ Close uploader
            </Button>
          )}
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingMYVID ? (
        <Loader />
      ) : errorMYVID ? (
        <Message variant="danger">{errorMYVID}</Message>
      ) : videos ? (
        <div>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Preview Link</th>
                <th>Rating</th>
                <th>CATEGORY</th>
                <th>UserNote</th>
                <th>Public</th>
                <th>Description</th>
                <th>Edit / DEL</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr key={video._id}>
                  <td>
                    {/******************* Offcanvas Start */}
                    <Offcanvas
                      show={show}
                      onHide={handleClose}
                      placement="start"
                    >
                      <Offcanvas.Header closeButton>
                        <Offcanvas.Title>
                          Enter new Video detail for {video._id}
                        </Offcanvas.Title>
                      </Offcanvas.Header>
                      <Offcanvas.Body>
                        <form onSubmit={onSubmit}>
                          <div>
                            <h6>Change catergory of this recording</h6>
                            <Form.Control
                              as="select"
                              value={category}
                              onChange={(e) => {
                                setCategory(e.target.value);
                              }}
                            >
                              {Object.keys(questions).map((category) => (
                                <option value={category} key={category} active>
                                  {category}
                                </option>
                              ))}
                            </Form.Control>
                          </div>
                          <h6 style={{ color: "transparent" }}>spacer</h6>
                          <Form.Label>Skill related to this Video</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="e.g. Marketing, Project Tracking, Medical Research..."
                            value={Skill}
                            onChange={(e) => setSkill(e.target.value)}
                          ></Form.Control>
                          <h6 style={{ color: "transparent" }}>spacer</h6>
                          <Form.Label>Additional notes</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="e.g. ABC company uses this question..."
                            value={userNote}
                            onChange={(e) => setUserNote(e.target.value)}
                          ></Form.Control>
                          <h6 style={{ color: "transparent" }}>spacer</h6>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicCheckbox"
                          >
                            <Form.Check
                              type="checkbox"
                              label="⮪ Select to share with public for feedback"
                              onClick={() => setSharePublic(true)}
                            />
                          </Form.Group>
                          <input
                            type="submit"
                            value="Update 🔄"
                            className="btn btn-outline-primary btn-block mt-4"
                          />
                        </form>
                      </Offcanvas.Body>
                    </Offcanvas>
                    {/******************* Offcanvas End */}
                    <a
                      href={`${video.videoLink}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {" "}
                      play video{" "}
                    </a>{" "}
                  </td>
                  <td>{video.rating}</td>
                  <td>{video.category}</td>
                  <td>{video.userNote}</td>
                  <td>{video.sharePublic ? " ☑️" : "❌"}</td>
                  <td>{video.description}</td>
                  <td>
                    <Button
                      variant="light"
                      className="btn-sm"
                      onClick={()=>handleShow(video._id)}
                    >
                      <i className="fas fa-edit"></i>
                    </Button>
                    |
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(video._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
        </div>
      ) : (
        <h1> You have not shared any videos yet.</h1>
      )}
    </div>
  );
};

export default MyVideoList;
