import bcrypt from 'bcrypt';
import prisma from '../src/config/db.js';

try {
    await prisma.bus.deleteMany();
    await prisma.train.deleteMany();
    await prisma.plane.deleteMany();
    await prisma.user.deleteMany();

    const usersData = [
    {
        email: 'billy@gmail.com',
        password: await bcrypt.hash('billy123', 10),
    },
    {
        email: 'ken@example.com',
        password: await bcrypt.hash('ken123', 10),
        role: 'PILOT',
    },
        {
        email: 'pilot@example.com',
        password: await bcrypt.hash('pilot123', 10),
        role: 'PILOT',
    },
    {
        email: 'driver@yahoo.com',
        password: await bcrypt.hash('driver123', 10),
        role: 'DRIVER',
    },
        {
        email: 'test@test.com',
        password: await bcrypt.hash('test123', 10),
        role: 'DRIVER',
    },
    {
        email: 'tim@example.com',
        password: await bcrypt.hash('tim123', 10),
        role: 'CONDUCTOR',
    },
        {
        email: 'conda@example.com',
        password: await bcrypt.hash('conda123', 10),
        role: 'CONDUCTOR',
    },
    {
        email: 'tom@yahoo.com',
        password: await bcrypt.hash('tom123', 10),
    },
    ];

    const users = await Promise.all(
        usersData.map((user) => prisma.user.create({ data: user })),
    );

    const pilot = users.filter((user) => user.role === 'PILOT');
    const driver = users.filter((user) => user.role === 'DRIVER');
    const conductor = users.filter((user) => user.role === 'CONDUCTOR');

    if (driver.length > 0) {
        await prisma.bus.createMany({
            data: [
                {
                    type: 'Coach',
                    route_num: 22,
                    passengers: 80,
                    operator_id: driver[0].id,
                },
                {
                    type: 'School',
                    route_num: 72,
                    passengers: 45, 
                    operator_id: driver[1].id,
                },
            ],
        });
    }
    if (conductor.length > 0) {
        await prisma.train.createMany({
            data: [
                {
                    type: 'Freight',
                    origin: 'New York',
                    destination: 'Chicago',
                    passengers: 0,
                    operator_id: conductor[0].id,
                },
                {
                    type: 'Passenger',
                    origin: 'Los Angeles',
                    destination: 'San Francisco',
                    passengers: 200,
                    operator_id: conductor[1].id,
                },
            ],
        });
    }
    if (pilot.length > 0) {
        await prisma.plane.createMany({
            data: [
                {
                    type: 'Commercial',
                    origin: 'Miami',
                    destination: 'Houston',
                    passengers: 150,
                    operator_id: pilot[0].id,
                },
                {
                    type: 'Private',
                    origin: 'Dallas',
                    destination: 'Orlando',
                    passengers: 10,
                    operator_id: pilot[1].id,
                },
            ],
        });
    }

    console.log('Seed completed successfully!');
} catch (error) {
    console.error('Seed failed:', error);
} finally {
    await prisma.$disconnect();
}