import express from 'express';
import { handleGetMemberIssues, handleGetUtrackedIssues, handleIssueCreation } from '../controllers/issue.controller.js';

const issueRouter = express.Router();   


issueRouter.route('/create-issue').post(handleIssueCreation);
issueRouter.route('/get-issues').get(handleGetMemberIssues);
issueRouter.route('/get-untracked-issues').get(handleGetUtrackedIssues)

export default issueRouter;