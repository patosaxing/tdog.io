import React from 'react'

export default function RecordVideo() {
    return (
        <div>
            <h1>hello world</h1>
           const openMediaDevices = async function(constraints){
    return await navigator.mediaDevices.getUserMedia(constraints);
}

            try {
    const stream = openMediaDevices({'video':true,'audio':true});
            console.log('Got MediaStream:', stream);
} catch(error) {
                console.error('Error accessing media devices.', error);
}
        </div>
    )
}
