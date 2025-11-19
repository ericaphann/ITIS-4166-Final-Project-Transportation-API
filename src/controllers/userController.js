import { getAllUsers, getUserById, updateUser, deleteUser, updateUserRole } from '../services/userService.js';

export async function getAllUsersHandler(req, res) {
    const users = await getAllUsers();
    res.status(200).json(users);
}

export async function getCurrentUserHandler(req, res) {
    const userId = parseInt(req.user.id);
    const user = await getUserById(userId);
    res.status(200).json(user);
}

export async function deleteUserHandler(req, res) {
    const userId = parseInt(req.user.id);
    const deletedUser = await deleteUser(userId);
    res.status(204).json(deletedUser);
}

export async function updateCurrentUserHandler(req, res) {
    const userId = parseInt(req.user.id);
    const updates = {};
    if (req.body.email) updates.email = req.body.email;
    if (req.body.password) updates.password = req.body.password;
    const updatedUser = await updateUser(userId, updates);
    res.status(200).json(updatedUser);
}

export async function updateUserRoleHandler(req, res) {
    const userId = parseInt(req.params.id);
    const role = req.body.role;
    const updatedUser = await updateUserRole(userId, role);
    res.status(200).json(updatedUser);
}