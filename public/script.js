function myfxn(element, val) {

    //toggeling active id

    temp = document.getElementById("active")
    if (temp != null) {
        temp.removeAttribute("id")
    }
    element.id = 'active'

    //changing base url 

    document.getElementById('delete').innerHTML = ''
    if (val == 'carbonmonoxide' || 'methane' || 'nitrogendioxide' || 'ozone') {
        gas = val
        console.log(gas)
    }
    const baseurl = "https://api.v2.emissions-api.org/api/v2/" + gas + "/statistics.json?interval=day&begin=2020-02-01&end=2020-02-02&point=";

    //deleting tables if user clicks on other tab

    x = document.getElementsByTagName("table")
    console.log(x)
    if (x[0] != undefined) {
        x[0].remove()
    }
    if (x[1] != undefined) {
        x[1].remove()
        if (x[2] != undefined) {
            x[2].remove()
            if (x[3] != undefined) {
                x[3].remove()
            }
        }
    }
    const randtable = document.createElement('table');
    table = document.getElementById('table')

    //Longitude and Latitude data

    tokyo = '139.6503,35.6762'
    jakarta = '106.8456,6.2088'
    delhi = '77.1025,28.7041'
    manila = '120.9842,14.5995'
    seoul = '126.9780,37.5665'
    shanghai = '121.4737,31.2304'
    karachi = '67.0011,24.8607'
    bejing = '116.4074,39.9042'
    newyork = '74.0060,40.7128'
    guangzhou = '113.2644,23.1291'
    saoPaulo = '46.6333,23.5505'
    mexico = '99.1332,19.4326'
    mumbai = '72.8777,19.0707'
    kyoto = '135.7681,35.0116'
    moscow = '37.6173,55.7558'
    dhaka = '90.4125,23.8103'
    cairo = '31.2357,30.0444'
    losangelis = '241.7563,34.0522'
    bangkok = '10.5018,13.7563'
    kolkata = '88.3639,22.5726'

    //fetching Data

    urls = [tokyo, jakarta, delhi, manila, seoul, shanghai, karachi, bejing, newyork, guangzhou, saoPaulo, mexico, mumbai, kyoto, moscow, dhaka, cairo, losangelis, bangkok, kolkata
    ].map(city => baseurl + city),
        Promise.all(
            urls.map(url => fetch(url).then(response => response.json()))
        ).then((responses) => {
            [
                [responses[0][0] == undefined ? -1 : responses[0][0].value.average, 'Tokyo'],
                [responses[1][0] == undefined ? -1 : responses[1][0].value.average, 'Jakarta'],
                [responses[2][0] == undefined ? -1 : responses[2][0].value.average, 'Delhi'],
                [responses[3][0] == undefined ? -1 : responses[3][0].value.average, 'Manila'],
                [responses[4][0] == undefined ? -1 : responses[4][0].value.average, 'Seoul'],
                [responses[5][0] == undefined ? -1 : responses[5][0].value.average, 'Shanghai'],
                [responses[6][0] == undefined ? -1 : responses[6][0].value.average, 'Karachi'],
                [responses[7][0] == undefined ? -1 : responses[7][0].value.average, 'Bejing'],
                [responses[8][0] == undefined ? -1 : responses[8][0].value.average, 'New York'],
                [responses[9][0] == undefined ? -1 : responses[9][0].value.average, 'Guangzhou'],
                [responses[10][0] == undefined ? -1 : responses[10][0].value.average, 'Sao Paulo'],
                [responses[11][0] == undefined ? -1 : responses[11][0].value.average, 'Mexico City'],
                [responses[12][0] == undefined ? -1 : responses[12][0].value.average, 'Mumbai'],
                [responses[13][0] == undefined ? -1 : responses[13][0].value.average, 'Kyoto'],
                [responses[14][0] == undefined ? -1 : responses[14][0].value.average, 'Moscow'],
                [responses[15][0] == undefined ? -1 : responses[15][0].value.average, 'Dhaka'],
                [responses[16][0] == undefined ? -1 : responses[16][0].value.average, 'Cairo'],
                [responses[17][0] == undefined ? -1 : responses[17][0].value.average, 'Los Angelis'],
                [responses[18][0] == undefined ? -1 : responses[18][0].value.average, 'Bangkok'],
                [responses[19][0] == undefined ? -1 : responses[19][0].value.average, 'Kolkata'],
            ].sort(function (a, b) {
                return b[0] - a[0]
            }).forEach(city => {
                var tr = document.createElement('tr'),
                    td_l = document.createElement('td'),
                    td_r = document.createElement('td');
                td_l.innerText = city[1];
                td_r.innerText = city[0].toFixed(4) + 'mol/\u33A1';
                tr.appendChild(td_l);
                tr.appendChild(td_r);
                randtable.appendChild(tr);
            });
            table.appendChild(randtable);
        });
}