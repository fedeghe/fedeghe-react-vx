import { trakTime, mayWarnIf } from "../utils";
import WARNS from "./warns";

export const getLinesNumber = ({entriesLength, elementsPerLine}) => Math.ceil(entriesLength / elementsPerLine),

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
            }, {});

        mayWarnIf({
            condition: ret[ungroupedLabel].entries.length > 0,
            message: WARNS.OUTKAST_DATA.description,
            params: {num: ret[ungroupedLabel].entries.length},
            opts
        });
        
        if (opts.trakTimes) {
            trak.end = +new Date();
            trakTime({ what: '__getGroupedInit', time: trak.end - trak.start, opts });
        }
        return ret;
    },

    getAllocation = () => {
        return {};
    };
