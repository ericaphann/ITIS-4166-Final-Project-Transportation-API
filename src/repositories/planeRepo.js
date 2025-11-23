import prisma from '../config/db.js';

export async function findAllPlanes() {
    const planes = await prisma.plane.findMany({
        include: {
            user: { select: { email: true } }
        }
    });
    
    return planes.map(plane => ({
        id: plane.id,
        type: plane.type,
        origin: plane.origin,
        destination: plane.destination,
        passengers: plane.passengers,
        opperator: plane.user.email.split('@')[0]
    }));
}

export async function findPlaneById(id) {
    const plane = await prisma.plane.findUnique({
        where: { id },
        include: {
            user: { select: { email: true } }
        }
    });
    
    if (!plane) return null;
    
    return {
        id: plane.id,
        type: plane.type,
        origin: plane.origin,
        destination: plane.destination,
        passengers: plane.passengers,
        opperator: plane.user.email.split('@')[0]
    };
}

export async function createPlane(data) {
    const plane = await prisma.plane.create({
        data: data,
        include: {
            user: { select: { email: true } }
        }
    });
    
    return {
        id: plane.id,
        type: plane.type,
        origin: plane.origin,
        destination: plane.destination,
        passengers: plane.passengers,
        opperator: plane.user.email.split('@')[0]
    };
}

export async function updatePlane(id, updates) {
    try {
        const plane = await prisma.plane.update({
            where: { id },
            data: updates,
            include: {
                user: { select: { email: true } }
            }
        });
        
        return {
            id: plane.id,
            type: plane.type,
            origin: plane.origin,
            destination: plane.destination,
            passengers: plane.passengers,
            opperator: plane.user.email.split('@')[0]
        };
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}

export async function removePlane(id) {
    try {
        const deletedPlane = await prisma.plane.delete({
            where: { id }
        });
        return deletedPlane;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}