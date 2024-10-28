import express from 'express';
import { handleGetMemberIssues, handleGetUtrackedIssues, handleIssueCreation, handleGetIssueDetails, handleUpdateIssue, handleDeleteIssue } from '../controllers/issue.controller.js';
import commentRouter from './comment.route.js';

const issueRouter = express.Router();   

issueRouter.use('/comment', commentRouter);

issueRouter.route('/create-issue').post(handleIssueCreation);
issueRouter.route('/get-issues').get(handleGetMemberIssues);
issueRouter.route('/get-untracked-issues').get(handleGetUtrackedIssues);
issueRouter.route('/get-issue-details').get(handleGetIssueDetails);
issueRouter.route('/update-issue').post(handleUpdateIssue);
issueRouter.route('/delete-issue').post(handleDeleteIssue);

export default issueRouter;