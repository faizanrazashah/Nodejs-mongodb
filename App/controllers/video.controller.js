const db = require("../models");
const Video = db.video;

// Create and Save a new Video
exports.create = (req, res) => {
  //Validate request
  if (!req.body.video_title) {
      res.status(400).send({message: "Content cannot be empty!"});
      return;
  }
  // Create Video
  const video = new Video({
      video_title: req.body.video_title,
      video_native_name: req.body.video_native_name,
      category_id: req.body.category_id,
      video_sales_strategy: req.body.video_sales_strategy,
      series_id: req.body.series_id,
      video_description: req.body.video_description,
      video_type: req.body.video_type,
      video_browser_address: req.body.video_browser_address,
      video_enable_comment: req.body.video_enable_comment,
      video_meta_key: req.body.video_meta_key,
      video_meta_value: req.body.video_meta_value,
      main_picture: req.body.main_picture,
      pictures: req.body.pictures,
      mobile_banner: req.body.mobile_banner,
      web_banner: req.body.web_banner,
      main_video: req.body.main_video,
      trailer_video: req.body.trailer_video,



      
  });
  // save Video in the database
  video
  .save(video)
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occured while creating the Video."
      });
  });
};

// Retrieve all Videos from the database.
exports.findAll = (req, res) => {

    Video.find()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error while retrieving Videos."
        });
    });
  
};

// Find a single Video with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Video.findById(id)
    .then(data => {
        if(!data)
        res.status(404).send({message: "Not found Video with id" + id});
        else res.send(data);
    })
    .catch(err => {
        res
        .status(500)
        .send({message: "Error retrieving Videos with id=" + id});
    });
  
};

// Update a Video by the id in the request
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    Video.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        if (!data) {
            res.status(404).send({
                message:`Cannot update Video with id=${id}. May be Video was not found`
            });
        } else res.send({message:"Video was updated sucessfully!"});
    })
    .catch(err => {
        res.status(500).send({
            message:"Error updating Video with id=" + id
        });
    });
  
};

// Delete a Video with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Video.findByIdAndRemove(id)
    .then(data => {
        if(!data){
            res.status(404).send({
                message:`Cannot delete Video with id=${id}. Maybe Video was not found!`
            });
        } else {
            res.send({
                message:"Video was deleted sucessfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:"Could not delete Video with id=" + id
        });
    });
  
};

// Delete all Videos from the database.
exports.deleteAll = (req, res) => {
    Video.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} Videos were deleted sucessfully!`
        });
    })
    .catch(err => {
        res.ststus(500).send({
            message:
            err.message || "Some error occured while removing Videos."
        });
    });
  
};
