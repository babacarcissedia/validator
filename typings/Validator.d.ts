export interface IValidatorOptions {
    data: Map<string, any> | {};
    rules: any;
    messages?: any;
    models?: any;
}
export interface IValidatorMessage {
    required: string;
    email: string;
    confirmed: string;
}
export declare class Validator {
    protected data: Map<string, any>;
    protected rules: any;
    protected messages: Map<string, string>;
    protected errors: Map<string, string>;
    protected models: any;
    protected afterCallbacks: ((v: Validator) => void)[];
    constructor(options: IValidatorOptions);
    /**
     * @returns Promise<Validator>
     */
    validate(): Promise<Validator>;
    /**
     * @param {string} field
     * @returns boolean
     */
    required(field: string): boolean;
    /**
     * @param {string} field
     * @param {string} l
     * @returns boolean
     */
    min_length(field: string, l: string): boolean;
    /**
     * @param {string} field
     * @param {string} l
     * @returns boolean
     */
    max_length(field: string, l: string): boolean;
    /**
     *
     * @param {string} field
     * @returns boolean
     */
    email(field: string): boolean;
    /**
     * @param {string} field
     * @returns boolean
     */
    confirmed(field: string): boolean;
    /**
     *
     * @param {string} field
     * @param {string} min
     * @returns boolean
     */
    min(field: string, min: string): boolean;
    /**
     *
     * @param {string} field
     * @param {string} max
     * @returns boolean
     */
    max(field: string, max: string): boolean;
    /**
     *
     * @param {string} field
     * @param {string} min
     * @param {string} max
     * @returns boolean
     */
    between(field: string, min: string, max: string): boolean;
    /**
     * @param {string} field
     * @param {string} model
     * @returns Promise<boolean>
     */
    unique(field: string, model: string): Promise<boolean>;
    /**
     * @param {string} field
     * @param {string} model
     * @param {string} key
     * @returns Promise<boolean>
     * @private
     */
    _modelExists(field: string, model: string, key: string): Promise<boolean>;
    /**
     * @param {string} field
     * @param {string} model
     * @param {string} key
     * @returns Promise<boolean>
     */
    exists(field: string, model: string, key: string): Promise<boolean>;
    /**
     * @param {string} field
     * @param {string} otherField
     * @returns boolean
     */
    required_unless(field: string, otherField: string): boolean;
    /**
     * @param {string} field
     * @param {string} otherField
     * @returns boolean
     */
    required_with(field: string, otherField: string): boolean;
    /**
     * @param {string} field
     * @param {number} otherField
     * @returns {boolean}
     */
    greater_than(field: string, otherField: number): boolean;
    /**
     * @param {string} date
     * @returns {year: string, month: string, day: string}
     * @private
     */
    _validateDate(date: string): false | {
        year: string;
        month: string;
        day: string;
    };
    /**
     * @param {string} field
     * @param {string} date
     * @returns {boolean}
     */
    after(field: string, date: string): boolean;
    regex(field: string, reg: string): boolean;
    array(field: string, otherField: string): boolean;
    in_array(field: string, ...values: string[]): boolean;
    boolean(field: string): boolean;
    /**
     * @param {IValidatorOptions} options
     * @returns Validator
     */
    static make(options: IValidatorOptions): Promise<Validator>;
    /**
     * @returns boolean
     */
    fails(): boolean;
    /**
     * @returns {[key: string]: string}
     */
    getErrors(): {
        [key: string]: string;
    };
    getErrorMessage(): string;
    /**
     * @param {string} rule
     * @param {string} field
     * @param {any} options
     * @returns string
     */
    protected getErrorFor(rule: string, field: string, options?: any): string;
    /**
     * @param {string} field
     * @param {string} message
     * @returns Validator
     */
    addError(field: string, message: string): Validator;
    afterHook(callback: (v: Validator) => void): void;
}
export default Validator;
