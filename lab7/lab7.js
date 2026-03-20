import fetch from 'node-fetch';
//2
let name = "Василь";
let admin = name;
console.log(admin);

//3
let countiesData = [];

async function fetchCounties() {
    const url = 'https://api.census.gov/data/2020/acs/acs5/profile?get=NAME&for=county:*';
    const res = await fetch(url);
    const raw = await res.json();

    countiesData = raw.slice(1).map(row => ({
        name:   row[0],
        state:  row[1],
        county: row[2]
    }));

    return countiesData;
}

function getCountyCode(countyName) {
    const found = countiesData.find(
        c => c.name.toLowerCase() === countyName.toLowerCase()
    );
    return found ? found.state + found.county : null;
}

async function main() {
    console.log('Завантаження даних...');
    await fetchCounties();
    console.log(`Завантажено ${countiesData.length} округів`);

    const code = getCountyCode('Baldwin County, Alabama');
    console.log('Код округу:', code); // 01003
}

main();

//4