if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function replaceAll(search, replace) {
        return this.split(search).join(replace);
    };
}

export {};
