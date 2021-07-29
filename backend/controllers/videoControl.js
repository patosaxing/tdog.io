
const fs = require('fs/promises'); // use NodeJS to delete server file
const { unlink } = require('fs/promises');
const { uploadToG, deleteFileOnG, generatePublicUrl } = require('./googleDriveApi');


const videoControl = {
    delServerFile : async (fPath) => {
      try {
        await unlink(fPath);
        console.log(`successfully deleted ${fPath}`.bgBlue);
      } catch (error) {
        console.error('there was an error:', error.message);
      }
    }
  }
    
module.exports = videoControl;