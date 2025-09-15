import { User } from './types';

export const generateUser = (): User => {
    const timestamp = Date.now();
    return {
        full_name: `user${timestamp}`,
        email: `test${timestamp}@mail.com`,
        password: 'Password123!'
    };
};
