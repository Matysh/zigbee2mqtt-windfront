import type { i18n, Namespace, TFunction } from "i18next";

export const DEVICE_FEATURE_NAMES_NAMESPACE = "deviceFeatureNames";
export const DEVICE_FEATURE_DESCRIPTIONS_NAMESPACE = "deviceFeatureDescriptions";
export const DEVICE_FEATURE_VALUES_NAMESPACE = "deviceFeatureValues";
export const DEVICE_FEATURE_UNITS_NAMESPACE = "deviceFeatureUnits";

export function translateDeviceFeatureName<Ns extends Namespace>(t: TFunction<Ns>, name: string | undefined, fallback: string): string {
    if (!name) {
        return fallback;
    }

    return t(name as never, { ns: DEVICE_FEATURE_NAMES_NAMESPACE, defaultValue: fallback });
}

export function translateDeviceFeatureDescription<Ns extends Namespace>(t: TFunction<Ns>, description: string | undefined): string | undefined {
    if (!description) {
        return description;
    }

    return t(description as never, {
        ns: DEVICE_FEATURE_DESCRIPTIONS_NAMESPACE,
        defaultValue: description,
        keySeparator: false,
    });
}

export function translateDeviceFeatureValue<Ns extends Namespace>(
    i18nInstance: i18n,
    t: TFunction<Ns>,
    name: string,
    value: string | number | boolean,
): string | undefined {
    if (!name) {
        return undefined;
    }

    const key = `${name}.${String(value)}`;

    if (!i18nInstance.exists(key, { ns: DEVICE_FEATURE_VALUES_NAMESPACE })) {
        return undefined;
    }

    return t(key as never, { ns: DEVICE_FEATURE_VALUES_NAMESPACE, defaultValue: String(value) });
}

export function translateDeviceFeatureUnit<Ns extends Namespace>(t: TFunction<Ns>, unit: string | undefined): string | undefined {
    if (!unit) {
        return unit;
    }

    return t(unit as never, { ns: DEVICE_FEATURE_UNITS_NAMESPACE, defaultValue: unit, keySeparator: false });
}
