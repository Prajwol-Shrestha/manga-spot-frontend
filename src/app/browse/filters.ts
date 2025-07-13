import { parseAsInteger, parseAsString } from "nuqs";

export const allSearchFilters = {
    title: parseAsString,
    limit: parseAsInteger,
    offset: parseAsInteger
}