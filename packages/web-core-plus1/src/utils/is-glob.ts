export const isGlob = (str: string) => {
    const chars: Record<string, string> = { '{': '}', '(': ')', '[': ']' };
    /* eslint-disable-next-line max-len */
    const regex = /\\(.)|(^!|\*|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\))/;

    if (str === '') {
        return false;
    }

    let match: RegExpExecArray | null;

    while ((match = regex.exec(str))) {
        if (match[2]) return true;
        let idx = match.index + match[0].length;

        // if an open bracket/brace/paren is escaped,
        // set the index to the next closing character
        const open = match[1];
        const close = open ? chars[open] : null;
        if (open && close) {
            const n = str.indexOf(close, idx);
            if (n !== -1) {
                idx = n + 1;
            }
        }

        str = str.slice(idx);
    }

    return false;
};
