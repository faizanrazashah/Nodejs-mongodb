const db = require("../models");
const Game = db.game;

// Create and Save a new Game
exports.create = (req, res) => {
  //Validate request
  if (!req.body.game_title) {
      res.status(400).send({message: "Content cannot be empty!"});
      return;
  }
  // Create Game
  const game = new Game({
      game_title: req.body.game_title,
      game_native_name: req.body.game_native_name,
      category_id: req.body.category_id,
      game_sales_strategy: req.body.game_sales_strategy,
      game_description: req.body.game_description,
      game_type: req.body.game_type,
      game_browser_address: req.body.game_browser_address,
      game_enable_comment: req.body.game_enable_comment,
      game_meta_key: req.body.game_meta_key,
      game_meta_value: req.body.game_meta_value,
      game_main_picture: req.body.game_main_picture,
      game_pictures: req.body.game_pictures,
      game_mobile_banner: req.body.game_mobile_banner,
      game_web_banner: req.body.game_web_banner,
      game_link: req.body.game_link,
      game_preview_html_link: req.body.game_preview_html_link,



      
  });
  // save Game in the database
  game
  .save(game)
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occured while creating the Game."
      });
  });
};

// Retrieve all Games from the database.
exports.findAll = (req, res) => {

    Game.find()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error while retrieving Games."
        });
    });
  
};

// Find a single Game with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Game.findById(id)
    .then(data => {
        if(!data)
        res.status(404).send({message: "Not found Game with id" + id});
        else res.send(data);
    })
    .catch(err => {
        res
        .status(500)
        .send({message: "Error retrieving Games with id=" + id});
    });
  
};

// Update a Game by the id in the request
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    Game.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        if (!data) {
            res.status(404).send({
                message:`Cannot update Game with id=${id}. May be Game was not found`
            });
        } else res.send({message:"Game was updated sucessfully!"});
    })
    .catch(err => {
        res.status(500).send({
            message:"Error updating Game with id=" + id
        });
    });
  
};

// Delete a Game with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Game.findByIdAndRemove(id)
    .then(data => {
        if(!data){
            res.status(404).send({
                message:`Cannot delete Game with id=${id}. Maybe Game was not found!`
            });
        } else {
            res.send({
                message:"Game was deleted sucessfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:"Could not delete Game with id=" + id
        });
    });
  
};

// Delete all Games from the database.
exports.deleteAll = (req, res) => {
    Game.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} Games were deleted sucessfully!`
        });
    })
    .catch(err => {
        res.ststus(500).send({
            message:
            err.message || "Some error occured while removing Games."
        });
    });
  
};
