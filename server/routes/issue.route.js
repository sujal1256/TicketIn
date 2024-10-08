import express from 'express';

const issueRouter = express.Router();


issueRouter.route('/create-issue').post(handleIssueCreation);

export default issueRouter;