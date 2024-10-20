import express from 'express';
import { handleGetMemberIssues, handleGetUtrackedIssues, handleIssueCreation, handleGetIssueDetails } from '../controllers/issue.controller.js';

const issueRouter = express.Router();   


issueRouter.route('/create-issue').post(handleIssueCreation);
issueRouter.route('/get-issues').get(handleGetMemberIssues);
issueRouter.route('/get-untracked-issues').get(handleGetUtrackedIssues);
issueRouter.route('/get-issue-details').get(    handleGetIssueDetails)

export default issueRouter;