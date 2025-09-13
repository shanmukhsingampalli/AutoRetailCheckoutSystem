import { Admin } from "../models/admin.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "username and password required"));
  }

  const admin = await Admin.findOne({ username: username });

  if (!admin) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "No such admin found"));
  }

  const valid = await Admin.isPasswordCorrect(password);

  if (valid) {
    const token = await admin.generateAuthToken();
    return res
      .status(200)
      .json(
        new ApiResponse(200, { user: user._id, token }, "Successful login")
      );
  } else {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { msg: "Incorrect Password" },
          "Incorrect Password"
        )
      );
  }
});

export {
    loginUser
}