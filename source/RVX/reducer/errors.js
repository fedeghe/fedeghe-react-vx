const INIT_UNEXPECTED_LAYOUT = Symbol('init unexpected layout'),
    NO_HEADERS_PROVIDED = Symbol('no consumable headers provived'),
    HEADERS_UNKEYED = Symbol('found a header without a key'),
    REDUCER_NO_TYPE_IN_ACTION = Symbol('no type in reducer action found'),
    GAP_NEGATIVE = Symbol('Gap cant be negative');
// eslint-disable-next-line one-var
export default {
    INIT_UNEXPECTED_LAYOUT,
    NO_HEADERS_PROVIDED,
    HEADERS_UNKEYED,
    GAP_NEGATIVE,
    REDUCER_NO_TYPE_IN_ACTION
};