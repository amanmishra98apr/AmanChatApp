// node server which will handle socket io connections
const io = require('socket.io')(8000, {
    cors: {
        origin: '*',
    }
});

const users = {};
console.log("hiiii")
io.on('connection', socket => {
    // console.log("io.on")
    socket.on('new-user-joined', name => {
        console.log(`${name} joined`)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
    })

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
        console.log(users[socket.id])
    })

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id]
    })
})