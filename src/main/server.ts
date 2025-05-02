import { env } from "@src/infrastructure/config/env";
import app from "./app";

app.listen(env.PORT, () =>
    console.log(`Server is running in port ${env.PORT}`)
);