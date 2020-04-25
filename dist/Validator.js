"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Validator = /** @class */ (function () {
    function Validator(options) {
        this.errors = new Map();
        this.afterCallbacks = [];
        var defaultOptions = {
            data: {},
            rules: {},
            messages: {},
            models: {}
        };
        options = Object.assign({}, defaultOptions, options);
        this.data = new Map(Object.entries(options.data));
        this.rules = options.rules;
        this.models = options.models;
        var messages = Object.assign({}, {
            required: ':field is required.',
            min_length: ':field length need to be at least :length: character(s) long.',
            max_length: ':field length need to be at most :length: character(s) long.',
            email: ':value is not a valid email.',
            confirmed: ':field does not match confirmation field.',
            min: ':field length must be greater than or equal :min',
            max: ':field length must be lesser than or equal :max',
            between: ':field length must be between :min and :max',
            unique: ':field already exists.',
            exists: 'No :model matching :key = :value',
            required_unless: ':field is required when \':otherField\' is not present',
            required_with: '\':field\' is required when \':otherField\' is defined.',
            greater_than: '\':field\' should be a greater than \':otherField\'.',
            after: '\':field\' should be a date greater past \':date\'.',
            in_array: '\':value\' is not a value from \':values\'.',
            regex: '\':field\' does not match regex \':regex\'.',
            boolean: '\':field\' should be true or false value not \':value\'.'
        }, options.messages);
        this.messages = new Map(Object.entries(messages));
    }
    /**
     * @returns Promise<Validator>
     */
    Validator.prototype.validate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fields, fields_1, fields_1_1, field, validationRule, fieldValue, e_1, methods, methods_1, methods_1_1, m, parts, params, method, _a, e_2_1, e_3_1, _b, _c, callback;
            var e_3, _d, e_2, _e, e_4, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        fields = Object.keys(this.rules);
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 37, 38, 39]);
                        fields_1 = __values(fields), fields_1_1 = fields_1.next();
                        _g.label = 2;
                    case 2:
                        if (!!fields_1_1.done) return [3 /*break*/, 36];
                        field = fields_1_1.value;
                        validationRule = this.rules[field];
                        if (!(typeof validationRule === 'function')) return [3 /*break*/, 7];
                        if (!this.data.has(field)) return [3 /*break*/, 6];
                        fieldValue = this.data.get(field);
                        _g.label = 3;
                    case 3:
                        _g.trys.push([3, 5, , 6]);
                        // no need to get the result since on error it will throw an error
                        return [4 /*yield*/, validationRule(fieldValue)];
                    case 4:
                        // no need to get the result since on error it will throw an error
                        _g.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _g.sent();
                        this.addError(field, e_1.message.split(':value').join(fieldValue));
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 35];
                    case 7:
                        methods = void 0;
                        if (Array.isArray(validationRule)) {
                            methods = validationRule;
                        }
                        else {
                            methods = validationRule.split('|');
                        }
                        _g.label = 8;
                    case 8:
                        _g.trys.push([8, 33, 34, 35]);
                        methods_1 = (e_2 = void 0, __values(methods)), methods_1_1 = methods_1.next();
                        _g.label = 9;
                    case 9:
                        if (!!methods_1_1.done) return [3 /*break*/, 32];
                        m = methods_1_1.value;
                        parts = m.split(':');
                        params = [];
                        params.push(field);
                        method = parts[0];
                        if (method === 'regex') {
                            params.push(parts[1]);
                        }
                        else if (parts.length >= 2) {
                            params.push.apply(params, __spread(parts[1].split(',')));
                        }
                        _a = method;
                        switch (_a) {
                            case 'required': return [3 /*break*/, 10];
                            case 'min_length': return [3 /*break*/, 11];
                            case 'max_length': return [3 /*break*/, 12];
                            case 'email': return [3 /*break*/, 13];
                            case 'confirmed': return [3 /*break*/, 14];
                            case 'min': return [3 /*break*/, 15];
                            case 'max': return [3 /*break*/, 16];
                            case 'between': return [3 /*break*/, 17];
                            case 'unique': return [3 /*break*/, 18];
                            case 'exists': return [3 /*break*/, 20];
                            case 'required_unless': return [3 /*break*/, 22];
                            case 'required_with': return [3 /*break*/, 23];
                            case 'greater_than': return [3 /*break*/, 24];
                            case 'after': return [3 /*break*/, 25];
                            case 'array': return [3 /*break*/, 26];
                            case 'regex': return [3 /*break*/, 27];
                            case 'in_array': return [3 /*break*/, 28];
                            case 'boolean': return [3 /*break*/, 29];
                        }
                        return [3 /*break*/, 30];
                    case 10:
                        this.required.apply(this, params);
                        return [3 /*break*/, 31];
                    case 11:
                        this.min_length.apply(this, params);
                        return [3 /*break*/, 31];
                    case 12:
                        this.max_length.apply(this, params);
                        return [3 /*break*/, 31];
                    case 13:
                        this.email.apply(this, params);
                        return [3 /*break*/, 31];
                    case 14:
                        this.confirmed.apply(this, params);
                        return [3 /*break*/, 31];
                    case 15:
                        this.min.apply(this, params);
                        return [3 /*break*/, 31];
                    case 16:
                        this.max.apply(this, params);
                        return [3 /*break*/, 31];
                    case 17:
                        this.between.apply(this, params);
                        return [3 /*break*/, 31];
                    case 18: return [4 /*yield*/, this.unique.apply(this, params)];
                    case 19:
                        _g.sent();
                        return [3 /*break*/, 31];
                    case 20: return [4 /*yield*/, this.exists.apply(this, params)];
                    case 21:
                        _g.sent();
                        return [3 /*break*/, 31];
                    case 22:
                        this.required_unless.apply(this, params);
                        return [3 /*break*/, 31];
                    case 23:
                        this.required_with.apply(this, params);
                        return [3 /*break*/, 31];
                    case 24:
                        this.greater_than.apply(this, params);
                        return [3 /*break*/, 31];
                    case 25:
                        this.after.apply(this, params);
                        return [3 /*break*/, 31];
                    case 26:
                        this.array.apply(this, params);
                        return [3 /*break*/, 31];
                    case 27:
                        this.regex.apply(this, params);
                        return [3 /*break*/, 31];
                    case 28:
                        this.in_array.apply(this, params);
                        return [3 /*break*/, 31];
                    case 29:
                        this.boolean.apply(this, params);
                        return [3 /*break*/, 31];
                    case 30: throw new Error('Unknown validation rule: ' + method);
                    case 31:
                        methods_1_1 = methods_1.next();
                        return [3 /*break*/, 9];
                    case 32: return [3 /*break*/, 35];
                    case 33:
                        e_2_1 = _g.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 35];
                    case 34:
                        try {
                            if (methods_1_1 && !methods_1_1.done && (_e = methods_1.return)) _e.call(methods_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 35:
                        fields_1_1 = fields_1.next();
                        return [3 /*break*/, 2];
                    case 36: return [3 /*break*/, 39];
                    case 37:
                        e_3_1 = _g.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 39];
                    case 38:
                        try {
                            if (fields_1_1 && !fields_1_1.done && (_d = fields_1.return)) _d.call(fields_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 39:
                        try {
                            for (_b = __values(this.afterCallbacks), _c = _b.next(); !_c.done; _c = _b.next()) {
                                callback = _c.value;
                                callback(this);
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_f = _b.return)) _f.call(_b);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                        return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * @param {string} field
     * @returns boolean
     */
    Validator.prototype.required = function (field) {
        if (!this.data.has(field) || String(this.data.get(field)).length === 0) {
            this.addError(field, this.getErrorFor('required', field));
            return false;
        }
        return true;
    };
    /**
     * @param {string} field
     * @param {string} l
     * @returns boolean
     */
    Validator.prototype.min_length = function (field, l) {
        var length = Number(l);
        if (this.data.has(field) && String(this.data.get(field)).length < length) {
            this.addError(field, this.getErrorFor('min_length', field, { length: length }));
            return false;
        }
        return true;
    };
    /**
     * @param {string} field
     * @param {string} l
     * @returns boolean
     */
    Validator.prototype.max_length = function (field, l) {
        var length = Number(l);
        if (this.data.has(field) && String(this.data.get(field)).length > length) {
            this.addError(field, this.getErrorFor('max_length', field, { length: length }));
            return false;
        }
        return true;
    };
    /**
     *
     * @param {string} field
     * @returns boolean
     */
    Validator.prototype.email = function (field) {
        if (!this.data.has(field)) {
            return false;
        }
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!this.data.get(field).match(emailRegex)) {
            this.addError(field, this.getErrorFor('email', field));
            return false;
        }
        return true;
    };
    /**
     * @param {string} field
     * @returns boolean
     */
    Validator.prototype.confirmed = function (field) {
        if (!this.data.has(field)) {
            return false;
        }
        if (this.data.get(field) !== this.data.get(field + "_confirmation")) {
            this.addError(field, this.getErrorFor('confirmed', field));
            return false;
        }
        return true;
    };
    /**
     *
     * @param {string} field
     * @param {string} min
     * @returns boolean
     */
    Validator.prototype.min = function (field, min) {
        if (!this.data.has(field)) {
            return false;
        }
        var value = Number(this.data.get(field));
        if (value < +min) {
            this.addError(field, this.getErrorFor('min', field, { min: min }));
            return false;
        }
        return false;
    };
    /**
     *
     * @param {string} field
     * @param {string} max
     * @returns boolean
     */
    Validator.prototype.max = function (field, max) {
        if (!this.data.has(field)) {
            return false;
        }
        var value = Number(this.data.get(field));
        if (value > +max) {
            this.addError(field, this.getErrorFor('max', field, { max: max }));
            return false;
        }
        return false;
    };
    /**
     *
     * @param {string} field
     * @param {string} min
     * @param {string} max
     * @returns boolean
     */
    Validator.prototype.between = function (field, min, max) {
        if (!this.data.has(field)) {
            return false;
        }
        var value = Number(this.data.get(field));
        if (value < +min || value > +max) {
            this.addError(field, this.getErrorFor('between', field, { min: min, max: max }));
            return false;
        }
        return true;
    };
    /**
     * @param {string} field
     * @param {string} model
     * @returns Promise<boolean>
     */
    Validator.prototype.unique = function (field, model) {
        return __awaiter(this, void 0, void 0, function () {
            var exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.data.has(field)) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this._modelExists(field, model, field)];
                    case 1:
                        exists = _a.sent();
                        if (exists) {
                            this.addError(field, this.getErrorFor('unique', field, { model: model }));
                        }
                        return [2 /*return*/, exists];
                }
            });
        });
    };
    /**
     * @param {string} field
     * @param {string} model
     * @param {string} key
     * @returns Promise<boolean>
     * @private
     */
    Validator.prototype._modelExists = function (field, model, key) {
        var DbModel = this.models[model];
        if (!DbModel) {
            throw new Error(model + " is not defined when calling Validator::make");
        }
        var filter = {};
        filter[key] = this.data.get(field);
        return DbModel.exists(filter);
    };
    /**
     * @param {string} field
     * @param {string} model
     * @param {string} key
     * @returns Promise<boolean>
     */
    Validator.prototype.exists = function (field, model, key) {
        return __awaiter(this, void 0, void 0, function () {
            var exists, e_5, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.data.has(field)) {
                            return [2 /*return*/, false];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._modelExists(field, model, key)];
                    case 2:
                        exists = _a.sent();
                        if (!exists) {
                            this.addError(field, this.getErrorFor('exists', field, { key: key, model: model }));
                        }
                        return [2 /*return*/, exists];
                    case 3:
                        e_5 = _a.sent();
                        message = (e_5.kind === 'ObjectId' && e_5.name === 'CastError')
                            ? this.getErrorFor('exists', field, { key: key, model: model })
                            : e_5.message;
                        this.addError(field, message);
                        return [2 /*return*/, true];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {string} field
     * @param {string} otherField
     * @returns boolean
     */
    Validator.prototype.required_unless = function (field, otherField) {
        var hasError = !this.data.has(field) && !this.data.has(otherField);
        if (hasError) {
            this.addError(field, this.getErrorFor('required_unless', field, { otherField: otherField }));
        }
        return !hasError;
    };
    /**
     * @param {string} field
     * @param {string} otherField
     * @returns boolean
     */
    Validator.prototype.required_with = function (field, otherField) {
        var hasError = this.data.has(otherField) && !this.data.has(field);
        if (hasError) {
            this.addError(field, this.getErrorFor('required_with', field, { otherField: otherField }));
        }
        return !hasError;
    };
    /**
     * @param {string} field
     * @param {number} otherField
     * @returns {boolean}
     */
    Validator.prototype.greater_than = function (field, otherField) {
        if (!this.data.has(field)) {
            return false;
        }
        var hasError = (+this.data.get(field) || 0) <= otherField;
        if (hasError) {
            this.addError(field, this.getErrorFor('greater_than', field, { otherField: otherField }));
        }
        return !hasError;
    };
    /**
     * @param {string} date
     * @returns {year: string, month: string, day: string}
     * @private
     */
    Validator.prototype._validateDate = function (date) {
        var regex = /([0-9]{4})-([0-9]{2})-([0-9]{2})/;
        var matches = date.match(regex) || [];
        if (matches.length <= 3) {
            return false;
        }
        var year = matches[1], month = matches[2], day = matches[3];
        if (parseInt(year) <= 0 || parseInt(month) <= 0 || parseInt(day) <= 0 || parseInt(month) > 12) {
            return false;
        }
        return { year: year, month: month, day: day };
    };
    /**
     * @param {string} field
     * @param {string} date
     * @returns {boolean}
     */
    Validator.prototype.after = function (field, date) {
        if (!this.data.has(field)) {
            return false;
        }
        var minDate;
        if (date === 'today') {
            minDate = +new Date();
        }
        else {
            var result_1 = this._validateDate(date);
            if (!result_1) {
                this.addError(field, date + " is not a valid date in yyyy-mm-dd format");
                return false;
            }
            var year_1 = result_1.year, month_1 = result_1.month, day_1 = result_1.day;
            minDate = +new Date(parseInt(year_1), parseInt(month_1) - 1, parseInt(day_1));
        }
        var result = this._validateDate(this.data.get(field));
        if (!result) {
            this.addError(field, this.data.get(field) + " is not a valid date in yyyy-mm-dd format");
            return false;
        }
        var year = result.year, month = result.month, day = result.day;
        var inputDate = +new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        var hasError = inputDate < minDate;
        if (hasError) {
            this.addError(field, this.getErrorFor('after', field, { date: date }));
        }
        return !hasError;
    };
    Validator.prototype.regex = function (field, reg) {
        if (!this.data.has(field)) {
            return false;
        }
        var regex = new RegExp(reg);
        var hasError = !regex.test(this.data.get(field));
        if (hasError) {
            this.addError(field, this.getErrorFor('regex', field, { reg: regex }));
        }
        return !hasError;
    };
    Validator.prototype.array = function (field, otherField) {
        return false;
        // TODO:
        // const hasError: boolean = this.data.has(otherField) && !this.data.has(field)
        // if (hasError) {
        //   this.addError(field, this.getErrorFor('array', field, {otherField}))
        // }
        // return hasError
    };
    Validator.prototype.in_array = function (field) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        if (!this.data.has(field)) {
            return false;
        }
        var hasError = !values.includes(this.data.get(field));
        if (hasError) {
            this.addError(field, this.getErrorFor('in_array', field, { values: values.join() }));
        }
        return !hasError;
    };
    Validator.prototype.boolean = function (field) {
        if (!this.data.has(field)) {
            return false;
        }
        var hasError = ![true, false, 1, 0, '1', '0'].includes(this.data.get(field));
        if (hasError) {
            this.addError(field, this.getErrorFor('boolean', field));
        }
        return !hasError;
    };
    /**
     * @param {IValidatorOptions} options
     * @returns Validator
     */
    Validator.make = function (options) {
        return new Validator(options)
            .validate();
    };
    /**
     * @returns boolean
     */
    Validator.prototype.fails = function () {
        return this.errors.size !== 0;
    };
    /**
     * @returns {[key: string]: string}
     */
    Validator.prototype.getErrors = function () {
        var e_6, _a;
        // Object.fromEntries is still on Draft on EcmaScript so use the following code
        // return Object.fromEntries(this.errors)
        var obj = {};
        try {
            for (var _b = __values(this.errors.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                obj[key] = value;
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return obj;
    };
    Validator.prototype.getErrorMessage = function () {
        var errors = this.getErrors();
        var keys = Object.keys(errors);
        return keys.length > 0 ? errors[keys[0]] : '';
    };
    /**
     * @param {string} rule
     * @param {string} field
     * @param {any} options
     * @returns string
     */
    Validator.prototype.getErrorFor = function (rule, field, options) {
        var e_7, _a;
        if (options === void 0) { options = {}; }
        options.value = this.data.get(field);
        options.field = field;
        var fieldErrorMessage = this.messages.get(field) || {};
        var message = fieldErrorMessage[rule] || this.messages.get(rule);
        try {
            for (var _b = __values(Object.keys(options)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                message = message.split(":" + key).join(options[key]);
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return message;
    };
    /**
     * @param {string} field
     * @param {string} message
     * @returns Validator
     */
    Validator.prototype.addError = function (field, message) {
        this.errors.set(field, message);
        return this;
    };
    Validator.prototype.afterHook = function (callback) {
        this.afterCallbacks.push(callback);
    };
    return Validator;
}());
exports.Validator = Validator;
exports.default = Validator;
//# sourceMappingURL=Validator.js.map