import { trakTime, mayWarnIf } from "../utils";

export const getLinesNumber = ({entriesLength, elementsPerLine}) => Math.ceil(entriesLength / elementsPerLine);
    
// eslint-disable-next-line one-var
export const getInitialGroupedData = ({data, grouping, elementsPerLine, opts = {}}) => {
        const trak = opts.trackTimes ? {start: +new Date} : null,
            {groups, collapsible} = grouping,
            groupedEntries = data.reduce((acc, entry) => {
                // find the first filter that let it pass, in case groups is not empty
                let targetGroupLabel = grouping.ungroupedLabel;
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
                [grouping.ungroupedLabel]: {entries: []}
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
                        condition: label !== grouping.ungroupedLabel,
                        message: `group named \`${label}\` is empty thus ignored`,
                        opts
                    });
                }
                return acc;
            }, {});

        if (opts.trakTimes) {
            trak.end = +new Date();
            trakTime({ what: '__getGroupedInit', time: trak.end - trak.start, opts });
        }
        return ret;
    };
