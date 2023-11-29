import {User} from '@prisma/client';

interface AppAuthorProps {
  allUsers: User[] | null;
  userId: string;
  currentUserEmail?: string;
}

function AppAuthor({allUsers, userId, currentUserEmail}: AppAuthorProps) {
  return <p>Owner: {allUsers?.find(user => user.id === userId)?.email || currentUserEmail}</p>;
}

export default AppAuthor;
