import express from 'express';
import { handleGetMemberIssues, handleIssueCreation } from '../controllers/issue.controller.js';

const issueRouter = express.Router();   


issueRouter.route('/create-issue').post(handleIssueCreation);
issueRouter.route('/get-issues').get(handleGetMemberIssues);

export default issueRouter;