import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from '../auth/kinde';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

let users: User[] = []; // Mock data store for simplicity

export async function GET(request: Request) {
        console.log('test')
        const M2MToken = await getToken();
      // Return all users
        const kindeUsers = await fetch('https://golanproject.kinde.com/api/v1/users', {
            method: 'GET',
            headers: {
            Authorization: `Bearer ${M2MToken.access_token}`
            }
        })
        const {users} =  await kindeUsers.json();
        return Response.json(users )
}
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   switch (req.method) {
//     case 'GET':
//         console.log('test')
//         const M2MToken = await getToken(); 
//       // Return all users
//         const kindeUsers = await fetch('https://golanproject.kinde.com/api/v1/users', {
//             method: 'POST',
//             headers: {
//             Authorization: `Bearer ${M2MToken.access_token}`
//             }
//         })
//         console.log(kindeUsers);
//       res.status(200).json({ message: 'List of users', users });
//       break;

//     case 'POST':
//       // Add a new user
//       const { name, email, role } = req.body;
//       if (!name || !email || !role) {
//         return res.status(400).json({ error: 'Missing required fields' });
//       }
//       const newUser: User = { id: Date.now().toString(), name, email, role };
//       users.push(newUser);
//       res.status(201).json({ message: 'User added', user: newUser });
//       break;

//     default:
//       res.setHeader('Allow', ['GET', 'POST']);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
