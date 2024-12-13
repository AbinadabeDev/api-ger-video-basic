import { randomUUID } from "crypto"

export class DatabaseMemory {
    #videos = new Map()

    list(search) {
        return Array.from(this.#videos.entries())
            .map(([id, data]) => ({ id, ...data })) // Cria um array de objetos de vídeo
            .filter((video) => {
                if (typeof search === "string" && search.trim() !== "") {
                    return video.title.toLowerCase().includes(search.toLowerCase());
                }
                return true; // Retorna todos os vídeos se search não for uma string válida
            });
    }
    
    

    create(video) {
        const videoId = randomUUID()
        
        this.#videos.set(videoId, video)
    }

    update(id, video) {
        this.#videos.set(id, video)
    }

    
    delete(id) {
        this.#videos.delete(id)
    }


}