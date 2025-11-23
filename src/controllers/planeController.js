import { getAllPlanes, getPlaneById, createNewPlane, updatePlaneById, deletePlane } from '../services/planeService.js';

export async function getAllPlanesHandler(req, res) {
    const planes = await getAllPlanes();
    res.status(200).json(planes);
}

export async function getPlaneByIdHandler(req, res) {
    const planeId = parseInt(req.params.id);
    const plane = await getPlaneById(planeId);
    res.status(200).json(plane);
}

export async function createPlaneHandler(req, res) {
    const operatorId = req.user.id;
    const newPlane = await createNewPlane(req.body, operatorId);
    res.status(201).json(newPlane);
}

export async function updatePlaneHandler(req, res) {
    const planeId = parseInt(req.params.id);
    const operatorId = req.user.id;
    const updatedPlane = await updatePlaneById(planeId, req.body, operatorId);
    res.status(200).json(updatedPlane);
}

export async function deletePlaneHandler(req, res) {
    const planeId = parseInt(req.params.id);
    await deletePlane(planeId);
    res.status(204).send();
}