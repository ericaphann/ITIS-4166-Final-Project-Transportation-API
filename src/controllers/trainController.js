import { getAllTrains, getTrainById, createNewTrain, updateTrainById, deleteTrain } from '../services/trainService.js';

export async function getAllTrainsHandler(req, res) {
    const trains = await getAllTrains();
    res.status(200).json(trains);
}

export async function getTrainByIdHandler(req, res) {
    const trainId = parseInt(req.params.id);
    const train = await getTrainById(trainId);
    res.status(200).json(train);
}

export async function createTrainHandler(req, res) {
    const operatorId = req.user.id;
    const newTrain = await createNewTrain(req.body, operatorId);
    res.status(201).json(newTrain);
}

export async function updateTrainHandler(req, res) {
    const trainId = parseInt(req.params.id);
    const operatorId = req.user.id;
    const updatedTrain = await updateTrainById(trainId, req.body, operatorId);
    res.status(200).json(updatedTrain);
}

export async function deleteTrainHandler(req, res) {
    const trainId = parseInt(req.params.id);
    await deleteTrain(trainId);
    res.status(204).send();
}