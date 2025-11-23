import { findAllTrains, findTrainById, createTrain, updateTrain, removeTrain } from '../repositories/trainRepo.js';

export async function getAllTrains() {
    return await findAllTrains();
}

export async function getTrainById(id) {
    const train = await findTrainById(id);
    if (train) return train;
    else {
        const error = new Error(`Cannot find train with id ${id}`);
        error.status = 404;
        throw error;
    }
}

export async function createNewTrain(data, operatorId) {
    const trainData = {
        ...data,
        operator_id: operatorId
    };
    return await createTrain(trainData);
}

export async function updateTrainById(id, data, operatorId) {
    const updates = { ...data };
    if (!updates.operator_id) {
        updates.operator_id = operatorId;
    }
    
    const updatedTrain = await updateTrain(id, updates);
    if (updatedTrain) return updatedTrain;
    else {
        const error = new Error(`Cannot find train with id ${id}`);
        error.status = 404;
        throw error;
    }
}

export async function deleteTrain(id) {
    try {
        return await removeTrain(id);
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}