import { findAllBuses, findBusById, createBus, updateBus, removeBus } from '../repositories/busRepo.js';

export async function getAllBuses() {
    return await findAllBuses();
}

export async function getBusById(id) {
    const bus = await findBusById(id);
    if (bus) return bus;
    else {
        const error = new Error(`Cannot find bus with id ${id}`);
        error.status = 404;
        throw error;
    }
}

export async function createNewBus(data, operatorId) {
    const busData = {
        ...data,
        operator_id: operatorId
    };
    return await createBus(busData);
}

export async function updateBusById(id, data, operatorId) {
    const updates = { ...data };
    if (!updates.operator_id) {
        updates.operator_id = operatorId;
    }
    
    const updatedBus = await updateBus(id, updates);
    if (updatedBus) return updatedBus;
    else {
        const error = new Error(`Cannot find bus with id ${id}`);
        error.status = 404;
        throw error;
    }
}

export async function deleteBus(id) {
    try {
        return await removeBus(id);
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}