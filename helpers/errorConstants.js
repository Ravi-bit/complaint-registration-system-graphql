const errorNames = {
    USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
    SERVER_ERROR: 'SERVER_ERROR',
    INNCORRECT_ACCOUNT: 'INNCORRECT_ACCOUNT',
    INNCORRECT_PASSWORD: 'INNCORRECT_PASSWORD'
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
    DEFAULT: {
      message: 'Undefined Default Error',
      statusCode: 400
    }
}

export {
    errorNames,
    errorTypes
};