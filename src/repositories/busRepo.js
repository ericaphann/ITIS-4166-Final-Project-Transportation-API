import prisma from '../config/db.js';

export async function findAllBuses() {
    const buses = await prisma.bus.findMany({
        include: {
            user: { select: { email: true } }
        }
    });
    
    return buses.map(bus => ({
        id: bus.id,
        type: bus.type,
        route_num: bus.route_num,
        passengers: bus.passengers,
        opperator: bus.user.email.split('@')[0]
    }));
}

export async function findBusById(id) {
    const bus = await prisma.bus.findUnique({
        where: { id },
        include: {
            user: { select: { email: true } }
        }
    });
    
    if (!bus) return null;
    
    return {
        id: bus.id,
        type: bus.type,
        route_num: bus.route_num,
        passengers: bus.passengers,
        opperator: bus.user.email.split('@')[0]
    };
}

export async function createBus(data) {
    const bus = await prisma.bus.create({
        data: data,
        include: {
            user: { select: { email: true } }
        }
    });
    
    return {
        id: bus.id,
        type: bus.type,
        route_num: bus.route_num,
        passengers: bus.passengers,
        opperator: bus.user.email.split('@')[0]
    };
}

export async function updateBus(id, updates) {
    try {
        const bus = await prisma.bus.update({
            where: { id },
            data: updates,
            include: {
                user: { select: { email: true } }
            }
        });
        
        return {
            id: bus.id,
            type: bus.type,
            route_num: bus.route_num,
            passengers: bus.passengers,
            opperator: bus.user.email.split('@')[0]
        };
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}

export async function removeBus(id) {
    try {
        const deletedBus = await prisma.bus.delete({
            where: { id }
        });
        return deletedBus;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}