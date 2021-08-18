import React, { useEffect, useState } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import Loader from "./Loader";
import FileUploader from "./FileUpload/FileUploader";
// import Paginate from "../components/Paginate";
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

  // const videoDelete = useSelector((state) => state.videoDelete);
  // const {
  //   loading: loadingDelete,
  //   error: errorDelete,
  //   success: successDelete,
  // } = videoDelete;

  // const videoCreate = useSelector((state) => state.videoCreate);
  // const {
  //   loading: loadingCreate,
  //   error: errorCreate,
  //   success: successCreate,
  //   video: createdVideo,
  // } = videoCreate;
  const [showUploader, SetShowUploader] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const myVideosList = useSelector((state) => state.myVideosList);
  const { loading, error, videos } = myVideosList;

  console.log('::::videos from MyVideoList REDUCER:', videos);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listMyVideos());
    }
  }, [dispatch, history, userInfo]);

  const deleteHandler = (id) => {
    // if (window.confirm(" ⚠️   Confirm deleting this Video? ")) {
    if (
      window.confirm(" working on this function, not enough brainpower 😢 YET ")
    ) {
      dispatch(deleteVideo(id));
    }
  };

  const createVideoHandler = () => {
    dispatch(createVideo());
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
      {/* {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>} */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
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
                {/* <th>Edit / DEL</th> */}
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr key={video._id}>
                  {/* <td>{video._id}</td> */}
                  <td>
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
                  {/* <td>
                    <LinkContainer to={`/admin/video/${video._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        ⎾<i className="fas fa-edit"></i>⏌
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(video._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td> */}
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
