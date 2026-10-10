import { memo } from "react";
import { useTranslation } from "react-i18next";
import { translateDeviceFeatureValue } from "../../i18n/deviceFeatureTranslations.js";

type DisplayValueProps = {
    name: string;
    value: unknown;
};

const BooleanValueView = memo((props: DisplayValueProps) => {
    const { value, name } = props;
    const { t, i18n } = useTranslation(["values", "deviceFeatureValues"]);
    const translatedValue = translateDeviceFeatureValue(i18n, t, name, Boolean(value));

    if (translatedValue !== undefined) {
        return translatedValue;
    }

    switch (name) {
        case "contact": {
            return value ? t(($) => $.closed) : t(($) => $.open);
        }
        case "occupancy":
        case "area1Occupancy":
        case "area2Occupancy":
        case "area3Occupancy":
        case "area4Occupancy": {
            return value ? t(($) => $.occupied) : t(($) => $.clear);
        }
        case "water_leak": {
            return value ? <span className="text-error animate-pulse">{t(($) => $.leaking)}</span> : t(($) => $.clear);
        }
        case "carbon_monoxide": {
            return value ? <span className="text-error animate-pulse">{t(($) => $.alarm)}</span> : t(($) => $.normal);
        }
        case "tamper": {
            return value ? <span className="text-error animate-pulse">{t(($) => $.tampered)}</span> : t(($) => $.clear);
        }
        case "end_of_life":
        case "fault": {
            return value ? <span className="text-error animate-pulse">{t(($) => $.true)}</span> : t(($) => $.false);
        }
        case "testing":
        case "warming_up": {
            return value ? <span className="text-warning animate-pulse">{t(($) => $.in_progress)}</span> : t(($) => $.done);
        }
        default: {
            return value ? t(($) => $.true) : t(($) => $.false);
        }
    }
});

const DisplayValue = memo((props: DisplayValueProps) => {
    const { t, i18n } = useTranslation(["values", "deviceFeatureValues"]);
    const { name, value } = props;

    switch (typeof value) {
        case "boolean":
            return <BooleanValueView {...props} />;
        case "undefined":
            return "N/A";
        case "object":
            return value === null ? t(($) => $.null) : JSON.stringify(value);
        case "string": {
            if (value === "") {
                return <span className="text-xs opacity-50">{t(($) => $.empty_string, { ns: "values" })}</span>;
            }

            return translateDeviceFeatureValue(i18n, t, name, value) ?? value;
        }
        case "number":
            return translateDeviceFeatureValue(i18n, t, name, value) ?? JSON.stringify(value);
        default:
            return JSON.stringify(value);
    }
});

export default DisplayValue;
