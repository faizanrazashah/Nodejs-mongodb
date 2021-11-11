const db = require("../models");
const News = db.news;

// Create and Save a new News
exports.create = (req, res) => {
  //Validate request
  if (!req.body.news_title) {
      res.status(400).send({message: "Content cannot be empty!"});
      return;
  }
  // Create News
  const news = new News({
      news_title: req.body.news_title,
      news_description: req.body.news_description  });
  // save News in the database
  news
  .save(news)
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occured while creating the News."
      });
  });
};

// Retrieve all Newss from the database.
exports.findAll = (req, res) => {

    News.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error while retrieving news."
        });
    });
  
};

// Find a single News with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    News.findById(id)
    .then(data => {
        if(!data)
        res.status(404).send({message: "Not found News with id" + id});
        else res.send(data);
    })
    .catch(err => {
        res
        .status(500)
        .send({message: "Error retrieving news with id=" + id});
    });
  
};

// Update a News by the id in the request
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    News.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        console.log(data)
        if (!data) {
            res.status(404).send({
                message:`Cannot update News with id=${id}. May be News was not found`
            });
        } else res.send({message:"News was updated sucessfully!"});
    })
    .catch(err => {
        res.status(500).send({
            message:"Error updating News with id=" + id
        });
    });
  
};

// Delete a News with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    News.findByIdAndRemove(id)
    .then(data => {
        if(!data){
            res.status(404).send({
                message:`Cannot delete News with id=${id}. Maybe News was not found!`
            });
        } else {
            res.send({
                message:"News was deleted sucessfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:"Could not delete News with id=" + id
        });
    });
  
};

// Delete all news from the database.
exports.deleteAll = (req, res) => {
    News.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} news were deleted sucessfully!`
        });
    })
    .catch(err => {
        res.ststus(500).send({
            message:
            err.message || "Some error occured while removing news."
        });
    });
  
};

// Find all published news
exports.findAllPublished = (req, res) => {
    News.find({published: true})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occured while retrieving news."
        });
    });
  
};