import {UserModel} from "@/shared/models/user.model.ts";

interface AppAuthorProps {
  allUsers: UserModel[] | null;
  userId: string;
  currentUserEmail?: string;
}

function AppAuthor({allUsers, userId, currentUserEmail}: AppAuthorProps) {
  return <p>Owner: {allUsers?.find(user => user.id === userId)?.email || currentUserEmail}</p>;
}

export default AppAuthor;
