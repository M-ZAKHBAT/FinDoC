import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const authenticate = async (req, res, next) => {
  // get token from headers
  const authToken = req.headers.authorization;

  //check token is exist or not
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "no autorization" });
  }
  try {
    const token = authToken.split(" ")[1];
    // console.log("Decoded token:", jwt.decode(token));
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.id;
    // console.log("req.userId:", req.userId);
    req.role = decoded.role;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token is expired" });
    }
    return res.status(401).json({ success: false, message: "Invalide Token" });
  }
};

// export const restrict = (roles) => async (req, res, next) => {
//   const userId = req.userId;

//   let user;
//   const patient = await User.findById(userId);
//   const doctor = await Doctor.findById(userId);

//   if (patient) {
//     user = patient;
//   }
//   if (doctor) {
//     user = doctor;
//   }

//   if (!roles.includes(user.role)) {
//     return res.status(401).json({ success: false, message: "not authorized" });
//   }
//   next();
// };

export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;

  try {
    let user;
    const patient = await User.findById(userId);
    const doctor = await Doctor.findById(userId);

    if (patient) {
      user = patient;
    } else if (doctor) {
      user = doctor;
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur introuvable" });
    }

    if (!roles.includes(user.role)) {
      return res
        .status(401)
        .json({ success: false, message: "Accès non autorisé" });
    }

    next();
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
    return res
      .status(500)
      .json({ success: false, message: "Erreur interne du serveur" });
  }
};
