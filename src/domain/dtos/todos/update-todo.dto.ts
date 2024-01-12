export class UpdateToDoDto {
    private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date
    ) {}

    get values() {
        const returnObject: { [key: string]: any } = {};

        if (this.text) returnObject.text = this.text;
        if (this.completedAt) returnObject.completedAt = this.completedAt;

        return returnObject;
    }

    static create(props: { [key: string]: any }): [string?, UpdateToDoDto?] {
        const { id, text, completedAt } = props;

        if (!id || isNaN(Number(id))) return ['id must be a valid number', undefined];

        let newCompletedAt = completedAt;
        if (completedAt) {
            newCompletedAt = new Date(completedAt);
            if (isNaN(newCompletedAt.getTime()))
                return ['CompletedAt must be a valid date', undefined];
        }

        return [undefined, new UpdateToDoDto(id, text, newCompletedAt)];
    }
}
