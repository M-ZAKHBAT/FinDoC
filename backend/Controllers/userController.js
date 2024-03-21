import User from "../models/UserSchema.js";

export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "successfully updated",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update",
      data: updateUser,
    });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "User Found",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "No User found",
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    // console.log(users);
    res.status(200).json({
      success: true,
      message: "Users Found",
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Not found",
    });
  }
};
