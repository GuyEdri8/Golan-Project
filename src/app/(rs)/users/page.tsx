import { BackButton } from "@/components/BackButton";
import UsersTable from "./userstable";
import { User } from "./columns";

export default async function  Userspage() {
    const users: Array<any> = await testGetUsersApi();
    console.log(users);
    return (
        <>
            <h2>רשימת משתמשים</h2>
            <UsersTable users={users} />
        </>
    )
}


async function testGetUsersApi() {
    const apiUrl = 'http://localhost:3000/api/users'; // Replace with your actual API URL if needed.
  
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Users fetched successfully:', data);
      return data; // Returns the fetched user data
    } catch (error) {
      console.error('Error fetching users:', error);
      // throw error;
    }
  }