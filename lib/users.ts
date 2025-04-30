
import fs from 'fs';
import path from 'path';

const filePath = path.resolve(process.cwd(), 'data', 'users.json');

type User = {
  username: string;
  password: string;
};

export function getUsers(): User[] {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

export function addUser(user: User) {
  const users = getUsers();
  users.push(user);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}
