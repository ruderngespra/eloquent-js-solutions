// My solution:

(function() {
    const MOUNTAINS = [
        { name: 'Kilimanjaro', height: 5895, place: 'Tanzania' },
        { name: 'Everest', height: 8848, place: 'Nepal' },
        { name: 'Mount Fuji', height: 3776, place: 'Japan' },
        { name: 'Vaalserberg', height: 323, place: 'Netherlands' },
        { name: 'Denali', height: 6168, place: 'United States' },
        { name: 'Popocatepetl', height: 5465, place: 'Mexico' },
        { name: 'Mont Blanc', height: 4808, place: 'Italy/France' },
    ];

    const headers = ['name', 'height', 'place'];

    function buildRow(data, headers) {
        const row = document.createElement('tr');
        headers.forEach(value => {
            const td = document.createElement('td');
            if (Number.isInteger(data[value])) {
                td.style.textAlign = 'right';
            }
            td.textContent = data[value];
            row.appendChild(td);
        });
        return row;
    }

    function buildHeaderRow(headers) {
        const headerRow = document.createElement('tr');
        headers.forEach(value => {
            const th = document.createElement('th');
            th.textContent = value;
            headerRow.appendChild(th);
        });
        return headerRow;
    }

    const mountainsDiv = document.getElementById('mountains');
    const table = document.createElement('table');
    table.appendChild(buildHeaderRow(headers));
    MOUNTAINS.forEach(mountainObject => {
        table.appendChild(buildRow(mountainObject, headers));
    });
    mountainsDiv.appendChild(table);
})();
