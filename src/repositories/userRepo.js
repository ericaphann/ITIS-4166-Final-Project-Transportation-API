import prisma from '../config/db.js';

export async function createUser(data) {
    return await prisma.user.create({
        data: data,
        omit: { password: true }
    });
}

export async function findUserByEmail(email) {
    return await prisma.user.findUnique({
        where: { email }
    });
}

export async function findAllUsers() {
    return await prisma.user.findMany({
        omit: { password: true }
    });
}

export async function findUserById(id) {
    return await prisma.user.findUnique({
        where: { id },
        omit: { password: true }
    });
}

export async function update(id, updates) {
    try {
        return await prisma.user.update({
            where: { id },
            data: updates,
            omit: { password: true }
        });
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}

export async function remove(id) {
    return await prisma.user.delete({
        where: { id }
    });
}

export async function updateRole(id, role) {
    try {
        return await prisma.user.update({
            where: { id },
            data: { role },
            omit: { password: true }
        });
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}