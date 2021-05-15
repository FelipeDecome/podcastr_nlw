const filters = ['<p>', '</p>', '&nbsp;'];

export function parseString(string: string): string {
    let parsedString = string;

    filters.forEach((filter) => (parsedString = parsedString.replaceAll(filter, '')));

    return parsedString;
}
