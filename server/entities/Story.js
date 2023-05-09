export default class Story {

    constructor({paragraph = "", options = null}) {
        this.paragraph = paragraph;
        this.options = options;
    }

    toJSON() {
        return {
            paragraph: this.paragraph,
            options: this.options
        }
    }

}