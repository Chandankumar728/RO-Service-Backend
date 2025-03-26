import User from "../models/user.model.js";

export async function getAllTechnicians(req, res) {
  try {
    const technicians = await User.find({ roleId: "67e3b2abba0bb0016ae6ab2e" });
    if (!technicians) {
      return res
        .status(200)
        .json({ success: false, message: "Technicians not found", data: [] });
    }
    return res.status(200).json({
      success: true,
      message: "All technicians fetched successfully",
      data: technicians,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
}


