const filters = ['<p>', '</p>', '&nbsp;'];

export function parseString(string: string): string {
    return filters.map((filter) => string.replaceAll(filter, '')).join('');
}
