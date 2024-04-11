// import { getAllDoctor } from "./Controllers/doctorController.js";

// const req = {
//   query: {},
// };

// const res = {
//   status: jest.fn().mockReturnThis(), // Correction ici
//   json: jest.fn(), // Correction ici
// };

// describe("getAllDoctor function", () => {
//   it("should return success true and doctor data", async () => {
//     // Appel de la fonction à tester
//     await getAllDoctor(req, res);

//     // Vérification si la fonction a été appelée avec le bon statut
//     expect(res.status).toHaveBeenCalledWith(200);

//     // Vérification si la fonction a été appelée avec les bonnes données
//     expect(res.json).toHaveBeenCalledWith({
//       success: true,
//       message: "Users Found",
//       data: expect.any(Array), // Vérifie si data est un tableau
//     });
//   });
// });
// doctorController.test.js

import { updateDoctor } from "./Controllers/doctorController.js";
import Doctor from "./models/DoctorSchema.js";

jest.mock("./models/DoctorSchema.js", () => ({
  findByIdAndUpdate: jest.fn(),
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
