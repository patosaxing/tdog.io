import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate'
import { listVideos, deleteVideo, createVideo } from '../actions/videoActions';
import { VIDEO_CREATE_RESET } from '../constants/videoConstants';

const VideoListScreen = ({ history, match }) => {
  // const pageNumber = match.params.pageNumber || 1;  //need to access this params🟩

  const dispatch = useDispatch();

  const videoList = useSelector((state) => state.videoList);
  const { loading, error, videos, page, pages } = videoList;

  const videoDelete = useSelector((state) => state.videoDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete, } = videoDelete;

  const videoCreate = useSelector((state) => state.videoCreate)
  const { loading: loadingCreate, error: errorCreate, success: successCreate, video: createdVideo, } = videoCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: VIDEO_CREATE_RESET })

    // ** Re-direct user to login
    // if (!userInfo || !userInfo.isAdmin) {
    //   history.push('/login');
    // }
    if (successCreate) {
      history.push(`/admin/video/${createdVideo._id}/edit`)
    } else {
      // dispatch(listVideos('', pageNumber)); //need to access this params🟩
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdVideo,
    // pageNumber,//need to access this params🟩
  ])

  const deleteHandler = (id) => {
    if (window.confirm(' ⚠️ Confirm deleting this Video? ')) {
      dispatch(deleteVideo(id));
    }
  }

  const createVideoHandler = () => {
    dispatch(createVideo());
  }

  return (
    <div>
      <h1 style={{ color: 'transparent' }}> VideoList screen </h1>
      <Row className='align-items-center'>
        <Col>
          <h1>Videos</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createVideoHandler}>
            ➕ Upload a new Video
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Preview Link</th>
                <th>Rating</th>
                <th>CATEGORY</th>
                <th>UserNote</th>
                <th>Edit / DEL</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr key={video._id}>
                  <td>{video._id}</td>
                  <td>{video.videoLink}</td>
                  <td>${video.rating}</td>
                  <td>{video.category}</td>
                  <td>{video.userNote}</td>
                  <td>
                    <LinkContainer to={`/admin/video/${video._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        ⎾<i className='fas fa-edit'></i>⏌
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(video._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </div>
  );
}

export default VideoListScreen;