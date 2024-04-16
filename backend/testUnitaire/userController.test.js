import { updateUser, deleteUser } from "../Controllers/userController.js";
import User from "../models/UserSchema.js";

jest.mock("../models/UserSchema.js", () => ({
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

describe("updateUser", () => {
  it("should update a user successfully", async () => {
    const mockUpdatedUser = { _id: "mockUserId", username: "user_mock" };
    User.findByIdAndUpdate.mockResolvedValue(mockUpdatedUser);

    const req = {
      params: { id: "mockUserId" },
      body: { username: "updated_user" },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await updateUser(req, res);

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      "mockUserId",
      { $set: { username: "updated_user" } },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "successfully updated",
      data: mockUpdatedUser,
    });
  });

  it("should handle errors when updating user", async () => {
    User.findByIdAndUpdate.mockRejectedValue(new Error("Update failed"));

    const req = {
      params: { id: "mockUserId" },
      body: { username: "updated_user" },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Failed to update",
      data: undefined,
    });
  });
});

describe("deleteUser", () => {
  it("should delete a user successfully", async () => {
    User.findByIdAndDelete.mockResolvedValue();

    const req = {
      params: { id: "mockUserId" },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await deleteUser(req, res);

    expect(User.findByIdAndDelete).toHaveBeenCalledWith("mockUserId");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "successfully deleted",
    });
  });

  it("should handle errors when deleting user", async () => {
    const errorMessage = "Delete failed";
    User.findByIdAndDelete.mockRejectedValue(new Error(errorMessage));

    const req = {
      params: { id: "mockUserId" },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await deleteUser(req, res);

    expect(User.findByIdAndDelete).toHaveBeenCalledWith("mockUserId");
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Failed to delete",
    });
  });
});
