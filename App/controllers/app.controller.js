const db = require("../models");
const App = db.app;

// Create and Save a new App
exports.create = (req, res) => {
  //Validate request
  if (!req.body.app_title) {
      res.status(400).send({message: "Content cannot be empty!"});
      return;
  }
  // Create App
  const app = new App({
      app_title: req.body.app_title,
      app_native_name: req.body.app_native_name,
      app_package_name: req.body.app_package_name,
      category_id: req.body.category_id,
      app_description: req.body.app_description,
      app_sales_strategy: req.body.app_sales_strategy,
      app_type: req.body.app_type,
      app_browser_address: req.body.app_browser_address,
      app_enable_comment: req.body.app_enable_comment,
      app_meta_key: req.body.app_meta_key,
      app_meta_value: req.body.app_meta_value,
      app_main_picture: req.body.app_main_picture,
      app_pictures: req.body.app_pictures,
      app_mobile_banner: req.body.app_mobile_banner,
      app_web_banner: req.body.app_web_banner,
      app_main_file: req.body.app_main_file


      
  });
  // save App in the database
  app
  .save(app)
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occured while creating the App."
      });
  });
};

// Retrieve all Apps from the database.
exports.findAll = (req, res) => {

    App.find()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error while retrieving Apps."
        });
    });
  
};

// Find a single App with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    App.findById(id)
    .then(data => {
        if(!data)
        res.status(404).send({message: "Not found App with id" + id});
        else res.send(data);
    })
    .catch(err => {
        res
        .status(500)
        .send({message: "Error retrieving Apps with id=" + id});
    });
  
};

// Update a App by the id in the request
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    App.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        if (!data) {
            res.status(404).send({
                message:`Cannot update App with id=${id}. May be App was not found`
            });
        } else res.send({message:"App was updated sucessfully!"});
    })
    .catch(err => {
        res.status(500).send({
            message:"Error updating App with id=" + id
        });
    });
  
};

// Delete a App with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    App.findByIdAndRemove(id)
    .then(data => {
        if(!data){
            res.status(404).send({
                message:`Cannot delete App with id=${id}. Maybe App was not found!`
            });
        } else {
            res.send({
                message:"App was deleted sucessfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:"Could not delete App with id=" + id
        });
    });
  
};

// Delete all Apps from the database.
exports.deleteAll = (req, res) => {
    App.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} Apps were deleted sucessfully!`
        });
    })
    .catch(err => {
        res.ststus(500).send({
            message:
            err.message || "Some error occured while removing Apps."
        });
    });
  
};
