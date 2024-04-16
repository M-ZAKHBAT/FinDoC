// doctorController.test.js

import { updateDoctor, deleteDoctor } from "../Controllers/doctorController.js";
import Doctor from "../models/DoctorSchema.js";

jest.mock("../models/DoctorSchema.js", () => ({
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

describe("updateDoctor", () => {
  it("should update a doctor successfully", async () => {
    const mockUpdatedDoctor = { _id: "mockDoctorId", name: "Dr. Mock" };
    Doctor.findByIdAndUpdate.mockResolvedValue(mockUpdatedDoctor);

    const req = {
      params: { id: "mockDoctorId" },
      body: { name: "Dr. Updated" },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await updateDoctor(req, res);

    expect(Doctor.findByIdAndUpdate).toHaveBeenCalledWith(
      "mockDoctorId",
      { $set: { name: "Dr. Updated" } },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "successfully updated",
      data: mockUpdatedDoctor,
    });
  });

  it("should handle errors when updating doctor", async () => {
    Doctor.findByIdAndUpdate.mockRejectedValue(new Error("Update failed"));

    const req = {
      params: { id: "mockDoctorId" },
      body: { name: "Dr. Updated" },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await updateDoctor(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Failed to update",
      data: undefined,
    });
  });
});

describe("deleteDoctor", () => {
  it("should delete a doctor successfully", async () => {
    Doctor.findByIdAndDelete.mockResolvedValue();

    const req = {
      params: { id: "mockDoctorId" },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await deleteDoctor(req, res);

    expect(Doctor.findByIdAndDelete).toHaveBeenCalledWith("mockDoctorId");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "successfully deleted",
    });
  });

  it("should handle errors when deleting doctor", async () => {
    const errorMessage = "Delete failed";
    Doctor.findByIdAndDelete.mockRejectedValue(new Error(errorMessage));

    const req = {
      params: { id: "mockDoctorId" },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await deleteDoctor(req, res);

    expect(Doctor.findByIdAndDelete).toHaveBeenCalledWith("mockDoctorId");
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Failed to delete",
    });
  });
});
