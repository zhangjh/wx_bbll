const props = {
    cancelBtn: {
        type: String,
        optionalTypes: [Object],
        value: '',
    },
    confirmBtn: {
        type: String,
        optionalTypes: [Object],
        value: '',
    },
    header: {
        type: Boolean,
        value: true,
    },
    title: {
        type: String,
        value: '',
    },
    value: {
        type: Array,
        value: null,
    },
    defaultValue: {
        type: Array,
    },
    visible: {
        type: Boolean,
        value: false,
    },
};
export default props;
