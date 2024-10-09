import express from 'express';
import { handleIssueCreation } from '../controllers/issue.controller';

const issueRouter = express.Router();


issueRouter.route('/create-issue').post(handleIssueCreation);

export default issueRouter;