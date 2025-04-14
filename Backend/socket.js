const socketIO = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

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

        // Handle join event
        socket.on('join', async (data) => {
            const { userId, userType } = data;

            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id }); 
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id }); 
            }
        });

        // Handle location updates from captain
        socket.on('update-location-captain', async (data) => {
            const { userId, latitude, longitude } = data;

            if (!latitude || !longitude) {
                return socket.emit('location_error', { message: 'Invalid location data' });
            }

            if (typeof latitude !== 'number' || typeof longitude !== 'number') {
                return socket.emit('location_error', { message: 'Location coordinates must be numbers' });
            }

            if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
                return socket.emit('location_error', { message: 'Location coordinates out of valid range' });
            }

            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: latitude,
                    lng: longitude
                }
            });
        });

        // Handle ride requests
        socket.on('request_ride', (data) => {
            const { userId, pickup, destination, vehicleType } = data;
            io.emit('new_ride_request', {
                userId,
                pickup,
                destination,
                vehicleType,
                requestId: socket.id
            });
        });

        // Handle ride acceptance
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