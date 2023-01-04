const cloudinary = require('cloudinary').v2


// cloudinary configuration
cloudinary.config({
    cloud_name: "oelmounkad",
    api_key: "154112183673125",
    api_secret: "jEpvAIqVXaUl70_S6jYbeYA2uCc"
  });

module.exports = cloudinary