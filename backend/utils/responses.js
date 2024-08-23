// responseUtils.js

export const sendSuccessResponse = (res, message, data = {}, statusCode = 200) => {
    return res.status(statusCode).json({
      status: "success",
      message,
      data,
    });
  };
  
  export const sendErrorResponse = (res, errorMessage, statusCode = 400) => {
    return res.status(statusCode).json({
      status: "error",
      message: errorMessage,
    });
  };
  
  export const sendValidationErrorResponse = (res, errorMessage) => {
    return sendErrorResponse(res, errorMessage, 400);
  };
  
  export const sendServerErrorResponse = (res, error) => {
    console.error("Server Error:", error);
    return sendErrorResponse(res, "Internal server error", 500);
  };
  