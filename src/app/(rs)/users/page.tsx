// Userspage.tsx
import { getAllUsers } from "@/lib/queries/users/getAllUsers";
import UsersTable from "./userstable";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
type PropUser = {
  id: string;
  email: string;
  full_name: string;
  last_name: string;
  created_on: string;
  first_name: string;
  provided_id: string;
  is_suspended: boolean;
  total_sign_ins: number;
  failed_sign_ins: number;
};

type PropFetchUsers = {
  code: string;
  users: Array<PropUser>;
  message: string;
  next_token: string | null;
};

export default async function Userspage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // Await the search parameters from the URL
  // const { pageSize, nextToken } = await searchParams;
  const {getPermissions, getUser} = getKindeServerSession();
  const {permissions} = await getPermissions();
  const users = await getAllUsers();
  const {id} = await getUser();
  // Fetch data using the provided tokens
  // const data: PropFetchUsers = await testGetUsersApi(pageSize, nextToken);
  return (
    <>
      <h2>רשימת משתמשים</h2>
      <UsersTable
        users={users}
        id={id}
        permissions={permissions}
      />
    </>
  );
}