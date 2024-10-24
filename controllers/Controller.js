export class Controller {
  constructor(route, model) {
    this.route = route;
    this.model = model;
  }

  GET(req, res) {
    const id = req.params.id;

    this.model.findById(id, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else if (!data) {
        res.status(404).send("Not Found");
      } else {
        res.status(200).json(data);
      }
    });
  }

  POST(req, res) {
    const newData = new this.model(req.body);

    newData.save((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).json(this.model);
      }
    });
  }

  PUT(req, res) {
    const id = req.params.id;
    const updatedData = req.body;

    this.model.findByIdAndUpdate(
      id,
      updatedData,
      { new: true },
      (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else if (!data) {
          res.status(404).send("Not Found");
        } else {
          res.status(200).json(data);
        }
      }
    );
  }

  DELETE(req, res) {
    const id = req.params.id;

    this.model.findByIdAndDelete(id, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else if (!data) {
        res.status(404).send("Not Found");
      } else {
        res.status(200).send("Deleted Successfully");
      }
    });
  }
}
