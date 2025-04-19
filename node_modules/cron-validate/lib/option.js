"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOptions = exports.registerOptionPreset = exports.getOptionPresets = exports.getOptionPreset = void 0;
const yup = __importStar(require("yup"));
require("yup");
const result_1 = require("./result");
const presets_1 = __importDefault(require("./presets"));
require("./types");
const optionPresets = {
    // http://crontab.org/
    default: {
        presetId: 'default',
        useSeconds: false,
        useYears: false,
        useAliases: false,
        useBlankDay: false,
        allowOnlyOneBlankDayField: false,
        // Optional for backward compatibility.
        // Undefined implies true.
        allowStepping: true,
        // Undefined implies false.
        mustHaveBlankDayField: false,
        useLastDayOfMonth: false,
        useLastDayOfWeek: false,
        useNearestWeekday: false,
        useNthWeekdayOfMonth: false,
        //
        seconds: {
            minValue: 0,
            maxValue: 59,
        },
        minutes: {
            minValue: 0,
            maxValue: 59,
        },
        hours: {
            minValue: 0,
            maxValue: 23,
        },
        daysOfMonth: {
            minValue: 0,
            maxValue: 31,
        },
        months: {
            minValue: 0,
            maxValue: 12,
        },
        daysOfWeek: {
            minValue: 0,
            maxValue: 7,
        },
        years: {
            minValue: 1970,
            maxValue: 2099,
        },
    },
};
const optionPresetSchema = yup
    .object({
    presetId: yup.string().required(),
    useSeconds: yup.boolean().required(),
    useYears: yup.boolean().required(),
    useAliases: yup.boolean(),
    useBlankDay: yup.boolean().required(),
    allowOnlyOneBlankDayField: yup.boolean().required(),
    allowStepping: yup.boolean(),
    mustHaveBlankDayField: yup.boolean(),
    useLastDayOfMonth: yup.boolean(),
    useLastDayOfWeek: yup.boolean(),
    useNearestWeekday: yup.boolean(),
    useNthWeekdayOfMonth: yup.boolean(),
    seconds: yup
        .object({
        minValue: yup.number().min(0).required(),
        maxValue: yup.number().min(0).required(),
        lowerLimit: yup.number().min(0),
        upperLimit: yup.number().min(0),
    })
        .required(),
    minutes: yup
        .object({
        minValue: yup.number().min(0).required(),
        maxValue: yup.number().min(0).required(),
        lowerLimit: yup.number().min(0),
        upperLimit: yup.number().min(0),
    })
        .required(),
    hours: yup
        .object({
        minValue: yup.number().min(0).required(),
        maxValue: yup.number().min(0).required(),
        lowerLimit: yup.number().min(0),
        upperLimit: yup.number().min(0),
    })
        .required(),
    daysOfMonth: yup
        .object({
        minValue: yup.number().min(0).required(),
        maxValue: yup.number().min(0).required(),
        lowerLimit: yup.number().min(0),
        upperLimit: yup.number().min(0),
    })
        .required(),
    months: yup
        .object({
        minValue: yup.number().min(0).required(),
        maxValue: yup.number().min(0).required(),
        lowerLimit: yup.number().min(0),
        upperLimit: yup.number().min(0),
    })
        .required(),
    daysOfWeek: yup
        .object({
        minValue: yup.number().min(0).required(),
        maxValue: yup.number().min(0).required(),
        lowerLimit: yup.number().min(0),
        upperLimit: yup.number().min(0),
    })
        .required(),
    years: yup
        .object({
        minValue: yup.number().min(0).required(),
        maxValue: yup.number().min(0).required(),
        lowerLimit: yup.number().min(0),
        upperLimit: yup.number().min(0),
    })
        .required(),
})
    .required();
const getOptionPreset = (presetId) => {
    if (optionPresets[presetId]) {
        return (0, result_1.valid)(optionPresets[presetId]);
    }
    return (0, result_1.err)(`Option preset '${presetId}' not found.`);
};
exports.getOptionPreset = getOptionPreset;
const getOptionPresets = () => optionPresets;
exports.getOptionPresets = getOptionPresets;
const registerOptionPreset = (presetName, preset) => {
    optionPresets[presetName] = optionPresetSchema.validateSync(preset, {
        strict: false,
        abortEarly: false,
        stripUnknown: true,
        recursive: true,
    });
};
exports.registerOptionPreset = registerOptionPreset;
function loadPresets() {
    for (let index = 0; index < presets_1.default.length; index += 1) {
        const { name, preset } = presets_1.default[index];
        (0, exports.registerOptionPreset)(name, preset);
    }
}
loadPresets();
const optionsCache = new Map();
function toOptionsCacheKey(presetId, override) {
    var _a;
    return presetId + ((_a = JSON.stringify(override)) !== null && _a !== void 0 ? _a : "");
}
function presetToOptionsSchema(preset) {
    return yup
        .object({
        presetId: yup.string().required(),
        preset: optionPresetSchema.required(),
        useSeconds: yup.boolean().required(),
        useYears: yup.boolean().required(),
        useAliases: yup.boolean(),
        useBlankDay: yup.boolean().required(),
        allowOnlyOneBlankDayField: yup.boolean().required(),
        allowStepping: yup.boolean(),
        mustHaveBlankDayField: yup.boolean(),
        useLastDayOfMonth: yup.boolean(),
        useLastDayOfWeek: yup.boolean(),
        useNearestWeekday: yup.boolean(),
        useNthWeekdayOfMonth: yup.boolean(),
        seconds: yup
            .object({
            lowerLimit: yup
                .number()
                .min(preset.seconds.minValue)
                .max(preset.seconds.maxValue),
            upperLimit: yup
                .number()
                .min(preset.seconds.minValue)
                .max(preset.seconds.maxValue),
        })
            .required(),
        minutes: yup
            .object({
            lowerLimit: yup
                .number()
                .min(preset.minutes.minValue)
                .max(preset.minutes.maxValue),
            upperLimit: yup
                .number()
                .min(preset.minutes.minValue)
                .max(preset.minutes.maxValue),
        })
            .required(),
        hours: yup
            .object({
            lowerLimit: yup
                .number()
                .min(preset.hours.minValue)
                .max(preset.hours.maxValue),
            upperLimit: yup
                .number()
                .min(preset.hours.minValue)
                .max(preset.hours.maxValue),
        })
            .required(),
        daysOfMonth: yup
            .object({
            lowerLimit: yup
                .number()
                .min(preset.daysOfMonth.minValue)
                .max(preset.daysOfMonth.maxValue),
            upperLimit: yup
                .number()
                .min(preset.daysOfMonth.minValue)
                .max(preset.daysOfMonth.maxValue),
        })
            .required(),
        months: yup
            .object({
            lowerLimit: yup
                .number()
                .min(preset.months.minValue)
                .max(preset.months.maxValue),
            upperLimit: yup
                .number()
                .min(preset.months.minValue)
                .max(preset.months.maxValue),
        })
            .required(),
        daysOfWeek: yup
            .object({
            lowerLimit: yup
                .number()
                .min(preset.daysOfWeek.minValue)
                .max(preset.daysOfWeek.maxValue),
            upperLimit: yup
                .number()
                .min(preset.daysOfWeek.minValue)
                .max(preset.daysOfWeek.maxValue),
        })
            .required(),
        years: yup
            .object({
            lowerLimit: yup
                .number()
                .min(preset.years.minValue)
                .max(preset.years.maxValue),
            upperLimit: yup
                .number()
                .min(preset.years.minValue)
                .max(preset.years.maxValue),
        })
            .required(),
    })
        .required();
}
function presetToOptions(preset, override) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
    const unvalidatedConfig = Object.assign(Object.assign({ presetId: preset.presetId, preset }, {
        useSeconds: preset.useSeconds,
        useYears: preset.useYears,
        useAliases: (_a = preset.useAliases) !== null && _a !== void 0 ? _a : false,
        useBlankDay: preset.useBlankDay,
        allowOnlyOneBlankDayField: preset.allowOnlyOneBlankDayField,
        allowStepping: (_b = preset.allowStepping) !== null && _b !== void 0 ? _b : true,
        mustHaveBlankDayField: (_c = preset.mustHaveBlankDayField) !== null && _c !== void 0 ? _c : false,
        useLastDayOfMonth: (_d = preset.useLastDayOfMonth) !== null && _d !== void 0 ? _d : false,
        useLastDayOfWeek: (_e = preset.useLastDayOfWeek) !== null && _e !== void 0 ? _e : false,
        useNearestWeekday: (_f = preset.useNearestWeekday) !== null && _f !== void 0 ? _f : false,
        useNthWeekdayOfMonth: (_g = preset.useNthWeekdayOfMonth) !== null && _g !== void 0 ? _g : false,
        seconds: {
            lowerLimit: (_h = preset.seconds.lowerLimit) !== null && _h !== void 0 ? _h : preset.seconds.minValue,
            upperLimit: (_j = preset.seconds.upperLimit) !== null && _j !== void 0 ? _j : preset.seconds.maxValue,
        },
        minutes: {
            lowerLimit: (_k = preset.minutes.lowerLimit) !== null && _k !== void 0 ? _k : preset.minutes.minValue,
            upperLimit: (_l = preset.minutes.upperLimit) !== null && _l !== void 0 ? _l : preset.minutes.maxValue,
        },
        hours: {
            lowerLimit: (_m = preset.hours.lowerLimit) !== null && _m !== void 0 ? _m : preset.hours.minValue,
            upperLimit: (_o = preset.hours.upperLimit) !== null && _o !== void 0 ? _o : preset.hours.maxValue,
        },
        daysOfMonth: {
            lowerLimit: (_p = preset.daysOfMonth.lowerLimit) !== null && _p !== void 0 ? _p : preset.daysOfMonth.minValue,
            upperLimit: (_q = preset.daysOfMonth.upperLimit) !== null && _q !== void 0 ? _q : preset.daysOfMonth.maxValue,
        },
        months: {
            lowerLimit: (_r = preset.months.lowerLimit) !== null && _r !== void 0 ? _r : preset.months.minValue,
            upperLimit: (_s = preset.months.upperLimit) !== null && _s !== void 0 ? _s : preset.months.maxValue,
        },
        daysOfWeek: {
            lowerLimit: (_t = preset.daysOfWeek.lowerLimit) !== null && _t !== void 0 ? _t : preset.daysOfWeek.minValue,
            upperLimit: (_u = preset.daysOfWeek.upperLimit) !== null && _u !== void 0 ? _u : preset.daysOfWeek.maxValue,
        },
        years: {
            lowerLimit: (_v = preset.years.lowerLimit) !== null && _v !== void 0 ? _v : preset.years.minValue,
            upperLimit: (_w = preset.years.upperLimit) !== null && _w !== void 0 ? _w : preset.years.maxValue,
        },
    }), override);
    const optionsSchema = presetToOptionsSchema(preset);
    const validatedConfig = optionsSchema.validateSync(unvalidatedConfig, {
        strict: false,
        abortEarly: false,
        stripUnknown: true,
        recursive: true,
    });
    return validatedConfig;
}
const validateOptions = (inputOptions) => {
    try {
        let preset;
        if (inputOptions.preset) {
            if (typeof inputOptions.preset === 'string') {
                if (!optionPresets[inputOptions.preset]) {
                    return (0, result_1.err)([`Option preset ${inputOptions.preset} does not exist.`]);
                }
                preset = optionPresets[inputOptions.preset];
            }
            else {
                preset = inputOptions.preset;
            }
        }
        else {
            preset = optionPresets.default;
        }
        const cacheKey = toOptionsCacheKey(preset.presetId, inputOptions.override);
        const cachedOptions = optionsCache.get(cacheKey);
        if (cachedOptions)
            return (0, result_1.valid)(cachedOptions);
        const options = presetToOptions(preset, inputOptions.override);
        optionsCache.set(cacheKey, options);
        return (0, result_1.valid)(options);
    }
    catch (validationError) {
        return (0, result_1.err)(validationError.errors);
    }
};
exports.validateOptions = validateOptions;
