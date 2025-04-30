import app from "./app";

async function upServer() {
    var port = Number(process.env.PORT) || 3000;

    try {
        await app.listen({ port });
        console.log('Server is running on port ' + port);
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}