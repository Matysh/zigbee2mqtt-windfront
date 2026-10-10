export const DEVICE_FEATURE_NAMES_NAMESPACE = "deviceFeatureNames";
export const DEVICE_FEATURE_LABELS_NAMESPACE = "deviceFeatureLabels";
export const DEVICE_FEATURE_DESCRIPTIONS_NAMESPACE = "deviceFeatureDescriptions";
export const DEVICE_FEATURE_VALUES_NAMESPACE = "deviceFeatureValues";
export const DEVICE_FEATURE_UNITS_NAMESPACE = "deviceFeatureUnits";

type RuntimeTFunction = (key: string, options: Record<string, unknown>) => string;
type RuntimeI18n = {
    exists(key: string, options: Record<string, unknown>): boolean;
};

const runtimeT = (t: unknown) => t as RuntimeTFunction;

export function translateDeviceFeatureName(t: unknown, name: string | undefined, fallback: string): string {
    const translate = runtimeT(t);

    if (fallback) {
        const translatedLabel = translate(fallback, {
            ns: DEVICE_FEATURE_LABELS_NAMESPACE,
            defaultValue: "",
            keySeparator: false,
        });

        if (translatedLabel) {
            return translatedLabel;
        }
    }

    if (!name) {
        return fallback;
    }

    return translate(name, { ns: DEVICE_FEATURE_NAMES_NAMESPACE, defaultValue: fallback });
}

export function translateDeviceFeatureDescription(t: unknown, description: string | undefined): string | undefined {
    if (!description) {
        return description;
    }

    return runtimeT(t)(description, {
        ns: DEVICE_FEATURE_DESCRIPTIONS_NAMESPACE,
        defaultValue: description,
        keySeparator: false,
    });
}

export function translateDeviceFeatureValue(i18nInstance: unknown, t: unknown, name: string, value: string | number | boolean): string | undefined {
    if (!name) {
        return undefined;
    }

    const key = `${name}.${String(value)}`;

    if (!(i18nInstance as RuntimeI18n).exists(key, { ns: DEVICE_FEATURE_VALUES_NAMESPACE })) {
        return undefined;
    }

    return runtimeT(t)(key, { ns: DEVICE_FEATURE_VALUES_NAMESPACE, defaultValue: String(value) });
}

export function translateDeviceFeatureUnit(t: unknown, unit: string | undefined): string | undefined {
    if (!unit) {
        return unit;
    }

    return runtimeT(t)(unit, { ns: DEVICE_FEATURE_UNITS_NAMESPACE, defaultValue: unit, keySeparator: false });
}
