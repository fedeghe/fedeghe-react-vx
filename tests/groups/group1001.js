export default [{
    label: 'lower',
    grouper: row => row.id <= 200
},{
    label: 'mid',
    grouper: row => row.id > 200 && row.id <= 500
},{
    label: 'high',
    grouper: row => row.id > 500 && row.id <= 900
}];