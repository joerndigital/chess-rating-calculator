export interface StepInterface {
    id: number;
    key: string;
    helperKey?: string;
    step?: string;
    title?: string;
    question?: string;
    helperQuestion?: string;
    placeholder?: number;
    helperPlaceholder?: number;
    buttonText?: string;
    errorMessage?: string;
    result?: number;
    helperResult?: number;
}
