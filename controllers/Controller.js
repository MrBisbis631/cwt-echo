// CRUD interface for `models`
export class Controller {
  /**
   * @param {object} model `sequelize` model
   */
  constructor(model) {
    this.model = model;
  }
  /**
   * handle
   * @param {Function} renderer render function - gets the model payload and returns its view
   * @param {object} loadOption loading instance configuration
   * @param {object} renderOption rendering configuration, eg. instance name
   * @returns callback for a route
   */
  get(renderer, loadOption, renderOption) {
    return async (_, res) => {
      const instances = await this.model.findAll({
        order: [["createdAt", "DESC"]],
        ...loadOption,
      });

      if (renderer) {
        res.header("Content-Type", "text/html");

        return res.send(
          renderer({
            [renderOption.modelPayloadName ?? Controller.modelName]: instances,
          })
        );
      }

      res.header("Content-Type", "application/json");

      return res.json(instances);
    };
  }

  /**
   * handle one instance of `model`
   * @param {Function} renderer render function - gets the model payload and returns its view
   * @param {object} loadOption loading instance configuration
   * @param {object} renderOption rendering configuration, eg. instance name
   * @returns callback for a route
   */
  getOne(renderer, loadOption, renderOption) {
    return async (req, res) => {
      const id = req.params[loadOption.paramIdName ?? "id"];

      const instance = await this.model.findByPk(id, loadOption);

      if (!instance) {
        return res.status(404).send("Not found");
      }

      if (renderer) {
        res.header("Content-Type", "text/html");

        return renderer({
          [renderOption.modelPayloadName ?? this.model.modelName]: instance,
        });
      }

      res.header("Content-Type", "application/json");

      return res.json(instance);
    };
  }

  /**
   *
   * @param {Function|string|number} redirectTo redirect callback evaluation or route
   * @returns callback for a route
   */
  post(redirectTo) {
    return async (req, res) => {
      const data = req.data;

      await this.model.create(data);

      if (typeof redirectTo === "function") {
        return res.redirect(redirectTo(req, res));
      }

      return res.redirect(redirectTo);
    };
  }

  /**
   *
   * @param {string|number|Function} redirectTo redirect uri or function evaluation for redirect uri
   * @param {object} loadOption loading option in `sequelize`
   * @returns router callback
   */
  put(redirectTo, loadOption) {
    return async (req, res) => {
      const id = req.params[loadOption.paramIdName ?? "id"];

      await this.model.update(req.body, {
        where: {
          id,
        },
      });

      if (typeof redirectTo === "function") {
        return res.redirect(redirectTo(req, res));
      }

      return res.redirect(redirectTo);
    };
  }

  /**
   *
   * @param {string|number|Function} redirectTo redirect uri or function evaluation for redirect uri
   * @param {object} loadOption loading option in `sequelize`
   * @returns router callback
   */
  delete(redirectTo, loadOption) {
    return async (req, res) => {
      const id = req.params[loadOption.paramIdName ?? "id"];

      await this.model.destroy({
        where: {
          id,
        },
      });

      if (typeof redirectTo === "function") {
        return res.redirect(redirectTo(req, res));
      }

      return res.redirect(redirectTo);
    };
  }
}
