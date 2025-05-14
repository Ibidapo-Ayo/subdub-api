import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUsers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, password, name, role } = req.body;

    // check if the user exists
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        error: true,
        message: "User is not found",
      });
    }

    const newUpdate = {
      email,
      password,
      name,
      role,
    };

    const updatedUser = await User.updateOne({ _id: id }, newUpdate);

    if (updatedUser) {
      res.status(201).json({
        message: "User is updated successfully",
        data: updatedUser,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userExists = await User.findById({ _id: id });

    if (!userExists) {
      res.status(404).json({
        error: true,
        message: "User not found",
      });
    }
    const deleteResult = await User.deleteOne({ _id: id });

    if (deleteResult.acknowledged) {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } else {
      res.status(404).json({
        error: true,
        message: "User not found",
      });
    }
  } catch (error) {
    next(error);
  }
};
