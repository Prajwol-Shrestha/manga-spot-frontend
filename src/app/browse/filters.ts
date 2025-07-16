import { parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs";

export const allSearchFilters = {
    title: parseAsString,
    includedTags: parseAsArrayOf(parseAsString),
    limit: parseAsInteger,
    offset: parseAsInteger
}