import { Research } from "@prisma/client";

export interface RetrievedPost {
    post: Research,
    source: string,
    fromCache?: boolean
}