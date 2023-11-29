const errorNames = {
    USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
    SERVER_ERROR: 'SERVER_ERROR',
    INNCORRECT_ACCOUNT: 'INNCORRECT_ACCOUNT',
    INNCORRECT_PASSWORD: 'INNCORRECT_PASSWORD',
    UNAUTHORIZED_CLIENT: 'UNAUTHORIZED_CLIENT',
    UNAUTHORIZED_DEAN: 'UNAUTHORIZED_DEAN',
    INVALID_COMPLAINT: 'INVALID_COMPLAINT',
    INVALID_USER: 'INVALID_USER',
    UNRESOLVED_COMPLAINT: 'UNRESOLVED_COMPLAINT',
    ALREADY_UPVOTED: 'ALREADY_UPVOTED',
    UPVOTE_NOT_ALLOWED: 'UPVOTE_NOT_ALLOWED'
  }
  
const errorTypes = {
    USER_ALREADY_EXISTS: {
      message: 'EmailId or Identification number is already exists.',
      statusCode: 400
    },
    SERVER_ERROR: {
      message: 'Server error.',
      statusCode: 500
    },
    INNCORRECT_ACCOUNT: {
      message: "Account couldn't be found.",
      statusCode: 404
    },
    INNCORRECT_PASSWORD: {
      message: "Wrong Password",
      statusCode: 400
    },
    UNAUTHORIZED_CLIENT: {
      message: "Unauthorized client in the scope",
      statusCode: 401
    },
    UNAUTHORIZED_DEAN: {
      message: "Unauthorized dean to perform this operation. Please log in as Dean.",
      statusCode: 403
    },
    INVALID_COMPLAINT: {
      message: "Complaint doesn't exist or may be a resolved complaint.",
      statusCode: 404
    },
    INVALID_USER: {
      message: "User Couldn't be found",
      statusCode: 404
    },
    UNRESOLVED_COMPLAINT: {
      message: "Complaint is not yet resolved to give/view the feedback.",
      statusCode: 400
    },
    UPVOTE_NOT_ALLOWED: {
      message: "You are not allowed to upvoted this complaint",
      statusCode: 403
    },
    FEEDBACK_EXIST: {
      message: "Feedback already exists on this complaint",
      statusCode: 400
    },
    ALREADY_UPVOTED: {
      message: "You already upvoted this complaint",
      statusCode: 403
    },
    FEEDBACK_UNAUTH: {
      message: "You are not authorized to give/view the feedback. Please log in as Dean or Complainee.",
      statusCode: 403
    },
    DEFAULT: {
      message: 'Undefined Default Error',
      statusCode: 400
    }
}

export {
    errorNames,
    errorTypes
};