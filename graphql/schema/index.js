import buildSchema from 'graphql';


const complaint_schema =  buildSchema(`
type Complaint {
  _id: ID!
  complaint_category: String!
  section: String!
  department: String!
  complaint_details: String!
  createdAt: String!
  status: Int!
  upvote: Int!
  downvote: Int!
  updatedAt: String!
  complainee: User!
}

type Comment{
  _id: ID!
  comment_text: String!
  createdAt: String!
  upvote: Int!
  downvote: Int!
  updatedAt: String!
  commenter: User!
}

type User {
  _id: ID!
  name: String!
  roll_no: Int!
  email: String!
}

type AuthData {
  userId: ID!
  roll_no : Int!
  token: String!
}

type Feedback {
  _id: ID!
  feedback_text: String!
  createdAt: String!
  updatedAt: String!
  feedbacker: User!
}

input ComplaintInput {
  complaint_category: String!
  section: String!
  department: String!
  complaint_details: String!
  createdAt: String!
}

input CommentInput {
  comment_text: String!
  createdAt: String!
}

input UserInput {
  name : String!
  roll_no: Int!
  email: String!
  password: String!
}

type RootQuery {
    listComplaints(status: Int, userId: ID): [Complaint!]!
    listComments(complaintId: ID!): [Comment!]!
    login(roll_no: String!, password: String!): AuthData!
    getFeedbackup(complaintId: ID!): Feedback!
}

type RootMutation {
    createComplaint(complaintInput: ComplaintInput): Complaint
    createUser(userInput: UserInput): User
    createComment(commentInput: CommentInput): Comment
    upVoteComplaint(complaintId: ID!): Complaint
    downVoteComplaint(complaintId: ID!): Complaint
    upVoteComment(commentId: ID!): Comment
    downVoteComment(commentId: ID!): Comment
    createFeedback(complaintId: ID!): Feedback
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);

export default complaint_schema