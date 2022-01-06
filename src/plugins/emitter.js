export function createEmitter(emitter){
    return {
        install: (app) => {
            app.config.globalProperties.$emitter = emitter
        }
    }
}
