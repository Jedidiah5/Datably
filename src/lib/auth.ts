import type { User } from '@/types';

// Mock database of users
const MOCK_USERS: User[] = [
  { id: '1', fullName: 'Demo User', email: 'demo@example.com' },
];
// Passwords would normally be hashed and stored securely. For mock, we don't store passwords.

export const mockLogin = (email: string, password?: string): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, password would be checked.
      // For demo, any password for a demo user is fine.
      if (email === 'demo@example.com' && password === 'password') {
        resolve(MOCK_USERS[0]);
      } else {
        const existingUser = MOCK_USERS.find(u => u.email === email);
        if (existingUser) { // Allow login if user exists and password is "password" for simplicity
             resolve(existingUser);
        } else {
             resolve(null);
        }
      }
    }, 500);
  });
};

export const mockRegister = (fullName: string, email: string, password?: string): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (MOCK_USERS.find(u => u.email === email)) {
        reject(new Error('User with this email already exists.'));
        return;
      }
      const newUser: User = {
        id: String(MOCK_USERS.length + 1),
        fullName,
        email,
      };
      MOCK_USERS.push(newUser);
      resolve(newUser);
    }, 500);
  });
};

export const mockLogout = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 200);
  });
};

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const storedUser = localStorage.getItem('insightboard_user');
            if (storedUser) {
                resolve(JSON.parse(storedUser) as User);
            } else {
                resolve(null);
            }
        }, 100);
    });
};
