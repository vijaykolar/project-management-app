import { Router } from 'express';
import { joinWorkspaceController } from '../controllers/member-controller';

const memberRouters = Router();

memberRouters.post('/workspace/:inviteCode/join', joinWorkspaceController);

memberRouters.get('/', (req, res) => {
  res.send('Hello from member route');
});

export { memberRouters };
