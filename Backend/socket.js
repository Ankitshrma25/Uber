const socketIO = require('socket.io');

let io;
const connectedUsers = new Map(); // Store user_id -> socket_id mapping
const connectedCaptains = new Map(); // Store captain_id -> socket_id mapping

const initializeSocket = (server) => {
    io = socketIO(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('New connection established:', socket.id);

        // Handle user connection
        socket.on('user_connected', (userId) => {
            console.log('User connected:', userId);
            connectedUsers.set(userId, socket.id);
            socket.userId = userId;
        });

        // Handle captain connection
        socket.on('captain_connected', (captainId) => {
            console.log('Captain connected:', captainId);
            connectedCaptains.set(captainId, socket.id);
            socket.captainId = captainId;
        });

        // Handle ride request
        socket.on('request_ride', (data) => {
            const { userId, pickup, destination, vehicleType } = data;
            // Broadcast ride request to all available captains
            io.emit('new_ride_request', {
                userId,
                pickup,
                destination,
                vehicleType,
                requestId: socket.id
            });
        });

        // Handle captain accepting ride
        socket.on('accept_ride', (data) => {
            const { userId, captainId } = data;
            const userSocketId = connectedUsers.get(userId);
            
            if (userSocketId) {
                io.to(userSocketId).emit('ride_accepted', {
                    captainId,
                    captainSocketId: socket.id
                });
            }
        });

        // Handle location updates
        socket.on('location_update', (location) => {
            console.log('Location update:', location);
            // Handle location update logic here
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
            if (socket.userId) {
                connectedUsers.delete(socket.userId);
            }
            if (socket.captainId) {
                connectedCaptains.delete(socket.captainId);
            }
        });
    });

    return io;
};

// Utility functions
const getUserSocketId = (userId) => connectedUsers.get(userId);
const getCaptainSocketId = (captainId) => connectedCaptains.get(captainId);
const isUserOnline = (userId) => connectedUsers.has(userId);
const isCaptainOnline = (captainId) => connectedCaptains.has(captainId);

module.exports = {
    initializeSocket,
    getUserSocketId,
    getCaptainSocketId,
    isUserOnline,
    isCaptainOnline
};