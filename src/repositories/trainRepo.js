import prisma from '../config/db.js';

export async function findAllTrains() {
    const trains = await prisma.train.findMany({
        include: {
            user: { select: { email: true } }
        }
    });
    
    return trains.map(train => ({
        id: train.id,
        type: train.type,
        origin: train.origin,
        destination: train.destination,
        passengers: train.passengers,
        opperator: train.user.email
    }));
}

export async function findTrainById(id) {
    const train = await prisma.train.findUnique({
        where: { id },
        include: {
            user: { select: { email: true } }
        }
    });
    
    if (!train) return null;
    
    return {
        id: train.id,
        type: train.type,
        origin: train.origin,
        destination: train.destination,
        passengers: train.passengers,
        opperator: train.user.email
}
}

export async function createTrain(data) {
    const train = await prisma.train.create({
        data: data,
        include: {
            user: { select: { email: true } }
        }
    });
    
    return {
        id: train.id,
        type: train.type,
        origin: train.origin,
        destination: train.destination,
        passengers: train.passengers,
        opperator: train.user.email
    };
}

export async function updateTrain(id, updates) {
    try {
        const train = await prisma.train.update({
            where: { id },
            data: updates,
            include: {
                user: { select: { email: true } }
            }
        });
        
        return {
            id: train.id,
            type: train.type,
            origin: train.origin,
            destination: train.destination,
            passengers: train.passengers,
            opperator: train.user.email
        };
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}

export async function removeTrain(id) {
    try {
        const deletedTrain = await prisma.train.delete({
            where: { id }
        });
        return deletedTrain;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}