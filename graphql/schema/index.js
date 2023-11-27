import buildSchema from 'graphql';


const complaint_schema =  buildSchema(`
type Complaint {
  _id: ID!
  complaint_category: String!
  section: String!
  department: String!
  complaint_details: String!
  createdAt: String!
  status: String!
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
  complaint: Complaint!
}

type User {
  _id: ID!
  name: String!
  identification_number: Int!
  email: String!
}

type AuthData {
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
  identification_number: Int!
  email: String!
  password: String!
  role: String
}

input LogInput{
  identification_number: Int!
  password: String!
  role: String
}

type RootQuery {
    listComplaints(status: String, userId: ID): [Complaint!]!
    listComments(complaintId: ID!): [Comment!]!
    login(logInput: LogInput): AuthData!
    getFeedbackup(complaintId: ID!): Feedback!
}

type RootMutation {
    createComplaint(complaintInput: ComplaintInput): Complaint
    createUser(userInput: UserInput): User
    createComment(commentInput: CommentInput): Comment
    upVoteComplaint(complaintId: ID!): Complaint
    resolveComplaint(complaintId: ID!): Complaint
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