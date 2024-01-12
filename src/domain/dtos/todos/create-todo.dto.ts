export class CreateToDoDto {
    private constructor(public readonly text: string) { }
    
    static create(props: {[key: string]: any}): [string?, CreateToDoDto?] {
        
        const { text } = props;

        if (!text) return ['Text property is required', undefined];


        return [undefined, new CreateToDoDto(text)];
    }
}
