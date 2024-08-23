import { sendSuccessResponse, sendErrorResponse, sendValidationErrorResponse, sendServerErrorResponse } from './responseUtils.json';

export const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validate required fields
    if (!name) {
      return sendValidationErrorResponse(res, "Name is required");
    }
    if (!email) {
      return sendValidationErrorResponse(res, "Email is required");
    }
    if (!password) {
      return sendValidationErrorResponse(res, "Password is required");
    }

    // Check if the user already exists
    const userExists = await Users.findOne({ email });
    if (userExists) {
      return sendValidationErrorResponse(res, "User already exists");
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);
  // Create and save the new user using create method
  const newUser = await Users.create({
    name,
    email,
    password: hashedPassword,
  });

    // Respond with success message
    return sendSuccessResponse(res, "User registered successfully", { userId: newUser._id }, 201);

  } catch (error) {
    return sendServerErrorResponse(res, error);
  }
};


export const logInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate required fields
    if (!email) {
      return sendValidationErrorResponse(res, "Email is required");
    }
    if (!password) {
      return sendValidationErrorResponse(res, "Password is required");
    }

    // Find the user by email
    const user = await Users.findOne({ email });
    if (!user) {
      return sendValidationErrorResponse(res, "User does not exist");
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return sendValidationErrorResponse(res, "Incorrect password");
    }

    // Create JWT payload and token
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });

    // Respond with success message and token
    return sendSuccessResponse(res, "Login successful", { token });

  } catch (error) {
    return sendServerErrorResponse(res, error);
  }
};




export const logOutUser = (req, res) => {
  console.log("logOutUser")
}
