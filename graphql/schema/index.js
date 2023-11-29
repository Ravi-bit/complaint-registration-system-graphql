import { buildSchema } from 'graphql';

const complaint_schema =  buildSchema(`
type Complaint {
  _id: ID!
  complaint_category: String!
  section: String!
  department: String!
  complaint_details: String!
  createdAt: String!
  status: String!
  upvotes: Int!
  views: Int!
  resolvement: String
  resolvedBy: User
  resolvedAt: String
  updatedAt: String!
  complainee: User!
}

type ResolvedComplaint {
  _id: ID!
  complaint_category: String!
  section: String!
  department: String!
  complaint_details: String!
  createdAt: String!
  status: String!
  upvotes: Int!
  views: Int!
  resolvement: String
  resolvedBy: User!
  resolvedAt: String!
  updatedAt: String!
  complainee: User!
}

type Comment{
  _id: ID!
  comment_text: String!
  createdAt: String!
  updatedAt: String!
  complaint: Complaint!
}

type CreatedComment{
  _id: ID!
  comment_text: String!
  createdAt: String!
  updatedAt: String!
  commenter: User!
  complaint: Complaint!
}

type User {
  _id: ID!
  name: String!
  identification_number: String!
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
  feedback_complaint: Complaint!
}

type DetailComplaint{
  complaint: Complaint!
  upvoted: Boolean!
  viewer: User!
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
  complaint_id: ID!
}

input FeedbackupInput {
  feedback_text: String!
  createdAt: String!
  complaint_id: ID!
}

input ResolveInput {
  resolveText: String
  complaintId: ID!
  resolvedAt: String!
}

input UserInput {
  name : String!
  identification_number: String!
  email: String!
  password: String!
  role: String
}

input LogInput{
  identification_number: String!
  password: String!
  role: String
}

type RootQuery {
    listComplaints(status: String, userId: ID): [Complaint!]!
    listComments(complaintId: ID!): [Comment!]!
    login(logInput: LogInput): AuthData!
    getFeedbackup(complaintId: ID!): Feedback!
    viewComplaint(complaintId: ID!, userId: ID!): DetailComplaint
}

type RootMutation {
    createComplaint(complaintInput: ComplaintInput): Complaint
    createUser(userInput: UserInput): User
    createComment(commentInput: CommentInput): CreatedComment
    upVoteComplaint(complaintId: ID!): Complaint
    resolveComplaint(resolveInput: ResolveInput): ResolvedComplaint
    createFeedback(feedbackInput: FeedbackupInput!): Feedback
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);

export default complaint_schema;