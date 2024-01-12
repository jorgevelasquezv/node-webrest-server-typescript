export class ToDoEntity {
    constructor(
        public readonly id: number,
        public readonly text: string,
        public readonly completedAt?: Date | null
    ) {}

    get isCompleted() {
        return !!this.completedAt;
    }

    public static fromObject(object: { [key: string]: any }): ToDoEntity {
        const { id, text, completedAt } = object;

        if (!id) throw new Error('id is required');
        if (!text) throw new Error('text is required');

        let newCompletedAt;
        if (completedAt) {
            newCompletedAt = new Date(completedAt);
            if (isNaN(newCompletedAt.getTime()))
                throw new Error('completedAt must be a valid date');
        }

        return new ToDoEntity(id, text, completedAt);
    }
}
