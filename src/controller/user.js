import userService from "../service/user";

const userController = {
  async getUsers(req, res) {
    try {
      const data = await userService.getAll();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Internal Server Error"
      });
    }
  },

  async addUser(req, res) {
    try {
      if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: "Invalid input" });
      }

      const data = await userService.add(req.body);

      return res.status(201).json({
        message: "Created successfully",
        data
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Internal Server Error"
      });
    }
  },

  async getUserById(req, res) {
    try {
      const data = await userService.get(req.params.id);
      if (!data) {
        return res.status(404).json({
          message: "User not found"
        });
      }
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Internal Server Error"
      });
    }
  },

  async updateUserById(req, res) {
    try {
      const data = await userService.update(req.params.id, req.body);
      if (!data) {
        return res.status(404).json({
          message: "User not found"
        });
      }
      return res.status(200).json({
        message: "Updated successfully",
        data
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Internal Server Error"
      });
    }
  },

  async deleteUserById(req, res) {
    try {
      console.log(req.params.id);
      const data = await userService.delete(req.params.id);
      console.log(data);
      if (!data) {
        return res.status(404).json({
          message: "User not found"
        });
      }
      return res.status(200).json({
        message: "Deleted successfully"
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Internal Server Error"
      });
    }
  }
};

export default userController;
