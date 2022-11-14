import { trakTime, mayWarnIf } from "../utils";
import WARNS from "./warns";

export const getLinesNumber = ({entriesLength, elementsPerLine}) => Math.ceil(entriesLength / elementsPerLine),

    /**
     * This is supposed to run once at the very beginning 
     * 
     * Starting from raw data and the user grouping functions
     * returns a hash with keys corresponding to the named groups,
     * elements not selected are pushed into a special group (keyed ungroupedLabel)
     * thus the response has a shape of :
     *  {
     *      [group.label]: {
     *          entries: [],
     *          lines: 
     *          collapsed: false
     *      }
     *  }
     * throws some warnings
     */
    getInitialGroupedData = ({data, grouping, elementsPerLine, opts = {}}) => {
        const trak = opts.trakTimes ? {start: +new Date} : null,
            {groups, ungroupedLabel, collapsible} = grouping,
            groupedEntries = data.reduce((acc, entry) => {
                // find the first filter that let it pass, in case groups is not empty
                let targetGroupLabel = ungroupedLabel;
                if (groups.length) {
                    const matchingGroup = groups.find(({ grouper }) => grouper(entry));
                    if (matchingGroup) {
                        targetGroupLabel = matchingGroup.label;
                    }
                }
                acc[targetGroupLabel].entries.push(entry);
                return acc;
            }, {
                ...groups.reduce((acc, group) => {
                    acc[group.label] = {entries: []};
                    return acc;
                }, {}),
                [ungroupedLabel]: {entries: []}
            }),

            // O(groups length)
            ret = Object.entries(groupedEntries).reduce((acc, [label, groupEntry]) => {
                if (groupEntry.entries.length) {
                    acc[label] = {
                        entries: groupEntry.entries,
                        lines: getLinesNumber({entriesLength: groupEntry.entries.length, elementsPerLine})
                    };
                    // add by default disabled collapsed in case is set collapsible
                    if (collapsible) acc[label].collapsed = false;
                } else {
                    mayWarnIf({
                        condition: label !== ungroupedLabel,
                        message: WARNS.EMPTY_GROUP.description,
                        params: {groupName: label},
                        opts
                    });
                }
                return acc;
            }, {}),
            num = ret[ungroupedLabel].entries.length;

        mayWarnIf({
            condition: !!num,
            message: WARNS.OUTKAST_DATA.description,
            params: {num},
            opts
        });
        
        if (opts.trakTimes) {
            trak.end = +new Date();
            trakTime({ what: '__getGroupedInit', time: trak.end - trak.start, opts });
        }
        return ret;
    },

    /**
     * groupedData,
     * dimensions: {width, itemWidth, height, itemHeight},
     * scrollTop,
     * contentHeight = height - headerCaptionHeight - footerCAptionHeight 
     */
    /// WARN : scrollTop => 0
    /**
     * __getVirtualGroup of react-vgrid
     * __getVirtual of react-vtable
     */
    getAllocation = ({
        gruopedData,
        scrollTop,
        contentHeight, headerHeight, itemHeight,
        elementsPerLine, layout, opts
    }) => {
        return {};
    };
