export class InvalidEnvError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidEnvError';
    }
}