class Truncate {
    private maxLength: number;

    constructor(maxLength: number) {
        this.maxLength = maxLength;
    }

    cut(text: string): string {
        let str = text;

        if(text.length >= this.maxLength) {
            str = text.slice(0, this.maxLength);
        }
        return str;
    }
}

export default Truncate;