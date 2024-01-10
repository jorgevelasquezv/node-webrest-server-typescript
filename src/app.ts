import { envs } from "./config/envs";
import { Server } from "./presentation/server";

(() => {
    main();
})();

function main() {
    const server = new Server({
        port: envs.PORT,
        publicPath: envs.PUBLIC_PATH,
    });
    server.start();
}
