import bcrypt from 'bcrypt';
import { findAllUsers, findUserById, update, remove, updateRole } from '../repositories/userRepo.js';

export async function getAllUsers() {
    return await findAllUsers();
}

export async function getUserById(id) {
    return await findUserById(id);
}

export async function updateUser(id, data) {
    try {
        const updates = { ...data };
        if (updates.password) {
            updates.password = await bcrypt.hash(data.password, 10);
        }
        const updatedUser = await update(id, updates);
        if (updatedUser) return updatedUser;
    } catch (error) {
        if (error.code === 'P2025') {
            const error = new Error(`Cannot find user with id ${id}`);
            error.status = 404;
            throw error;
        }
    }
}

export async function deleteUser(id) {
    try {
        return await remove(id);
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}

export async function updateUserRole(id, role) {
    const updatedUser = await updateRole(id, role);
    if (updatedUser) return updatedUser;
    else {
        const error = new Error(`Cannot find user with id ${id}`);
        error.status = 404;
        throw error;
    }
}