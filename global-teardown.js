import fs from 'fs';

export default async function globalTeardown() {
    const filePath = '.auth/user.json';
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}

