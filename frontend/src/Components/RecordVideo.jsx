import React from 'react'
import VideoRecorder from 'react-video-recorder'

export default function RecordVideo() {

    <VideoRecorder
    onRecordingComplete={videoBlob => {
      // Do something with the video...
      console.log('videoBlob', videoBlob)
    }}
  />

    // const openMediaDevices = async (constraints) => {
    // return await navigator.mediaDevices.getUserMedia(constraints);
    // }

    // try {
    //     const stream = openMediaDevices({ 'video': true, 'audio': true });
    //     console.log('Got MediaStream:', stream);
    // }catch (error) {
    // console.error('Error accessing media devices.', error);
    // }
    return (
        <div>
            <h1>hello world</h1>
            <iframe title = "Video Player">stream()</iframe>
        </div>
    )
}
