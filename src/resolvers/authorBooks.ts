import { AppSyncResolverEvent } from "aws-lambda";
import { books } from "../data/books";
import { Author } from "../types/author";

export const handler = (event: AppSyncResolverEvent<object, Author>) => {
    const author = event.source
    return books.filter((book) => book.authorId === author.id)
} 