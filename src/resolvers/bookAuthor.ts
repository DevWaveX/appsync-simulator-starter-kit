import { AppSyncResolverEvent } from "aws-lambda";
import { authors } from "../data/authors";
import { Book } from "../types/book";

export const handler = (event: AppSyncResolverEvent<object, Book>) => {
    const book = event.source

    return authors.find((author) => author.id === book.authorId)
} 