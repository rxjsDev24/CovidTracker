export const mapData = (data) => {
    let parsedData = {};
    let states = {};
    data.forEach(data => {
        let date = (new Date(data.date)).toLocaleDateString();
        let status = data.status
        for (let state in data) {
            if (state === 'date' || state === 'status')
                continue;

            let code = state.toUpperCase()
            states[code] = {
                ...states[code],
                [status]: data[state]
            }
            states = {
                ...states,
                [code]: {
                    ...states[code],
                    [status]: data[state]
                }
            }
        }
        parsedData[date] = states
    })
    return parsedData;
}

export const mapTotalData = (data) => {
    let parsedData = {};
    data.forEach(data => {
        parsedData = {
            ...parsedData,
            [data.statecode]: {
                Confirmed: data.confirmed,
                Recovered: data.recovered,
                Deceased: data.deaths,
                Active: data.active,
                name: data.state,
                lastUpdated: data.lastupdatedtime,
                code: data.statecode
            }
        }
    })
    return parsedData;
}

export const setMapData = (data) => {
    let map = [];
    let code = '';
    let id='';
    for (let state in data) {
        if (data[state].code === 'TT' || data[state].code === 'UN') {
            continue;
        }
        if (data[state].code === 'LA') {
            code = 'LK';
            id='LA'
        } else if (data[state].code === 'DN') {
            code = 'DNDD';
            id='DN'
        } else {
            code = data[state].code;
            id=code;
        }
        map.push({
            id: 'IN-' + code,
            value: data[state].Confirmed,
            code: id
        })
    }
    return map;
}

// const setActiveStatus = (data) => {
//     for (let date in data) {
//         let states = data[date]
//         for (let state in states) {
//             let active = states[state].Confirmed - (states[state].Deceased + states[state].Recovered)
//             states[state] = {
//                 ...states[state],
//                 Active: active
//             }
//         }
//     }
//     return data;
// }