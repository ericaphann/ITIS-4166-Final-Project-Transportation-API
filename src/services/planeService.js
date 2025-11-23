import { findAllPlanes, findPlaneById, createPlane, updatePlane, removePlane } from '../repositories/planeRepo.js';

export async function getAllPlanes() {
    return await findAllPlanes();
}

export async function getPlaneById(id) {
    const plane = await findPlaneById(id);
    if (plane) return plane;
    else {
        const error = new Error(`Cannot find plane with id ${id}`);
        error.status = 404;
        throw error;
    }
}

export async function createNewPlane(data, operatorId) {
    const planeData = {
        ...data,
        operator_id: operatorId
    };
    return await createPlane(planeData);
}

export async function updatePlaneById(id, data, operatorId) {
    const updates = { ...data };
    if (!updates.operator_id) {
        updates.operator_id = operatorId;
    }
    
    const updatedPlane = await updatePlane(id, updates);
    if (updatedPlane) return updatedPlane;
    else {
        const error = new Error(`Cannot find plane with id ${id}`);
        error.status = 404;
        throw error;
    }
}

export async function deletePlane(id) {
    try {
        return await removePlane(id);
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}