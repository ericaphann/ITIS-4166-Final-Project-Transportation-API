import { getAllBuses, getBusById, createNewBus, updateBusById, deleteBus } from '../services/busService.js';

export async function getAllBusesHandler(req, res) {
    const buses = await getAllBuses();
    res.status(200).json(buses);
}

export async function getBusByIdHandler(req, res) {
    const busId = parseInt(req.params.id);
    const bus = await getBusById(busId);
    res.status(200).json(bus);
}

export async function createBusHandler(req, res) {
    const operatorId = req.user.id;
    const newBus = await createNewBus(req.body, operatorId);
    res.status(201).json(newBus);
}

export async function updateBusHandler(req, res) {
    const busId = parseInt(req.params.id);
    const operatorId = req.user.id;
    const updatedBus = await updateBusById(busId, req.body, operatorId);
    res.status(200).json(updatedBus);
}

export async function deleteBusHandler(req, res) {
    const busId = parseInt(req.params.id);
    const deletedBus = await deleteBus(busId);
    res.status(204).json(deletedBus);
}