import express from 'express';
import { handleGetMemberIssues, handleGetUtrackedIssues, handleIssueCreation, handleGetIssueDetails, handleUpdateIssue } from '../controllers/issue.controller.js';

const issueRouter = express.Router();   


issueRouter.route('/create-issue').post(handleIssueCreation);
issueRouter.route('/get-issues').get(handleGetMemberIssues);
issueRouter.route('/get-untracked-issues').get(handleGetUtrackedIssues);
issueRouter.route('/get-issue-details').get(handleGetIssueDetails);
issueRouter.route('/update-issue').post(handleUpdateIssue);

export default issueRouter;