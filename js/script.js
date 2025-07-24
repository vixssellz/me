const tools = [
    {
        name: "Tool 1",
        category: "Writing",
        description: "A great tool for writing.",
        link: "https://example.com",
        rating: 4,
        cost: "Free"
    },
    {
        name: "Tool 2",
        category: "Coding",
        description: "A great tool for coding.",
        link: "https://example.com",
        rating: 5,
        cost: "Freemium"
    },
    {
        name: "Tool 3",
        category: "Image Generation",
        description: "A great tool for image generation.",
        link: "https://example.com",
        rating: 3,
        cost: "Subscription"
    },
    {
        name: "Tool 4",
        category: "Writing",
        description: "Another great tool for writing.",
        link: "https://example.com",
        rating: 5,
        cost: "Free"
    }
];

const tableContainer = document.getElementById("table-container");

function renderTable(data) {
    let tableHTML = `
        <input type="text" id="search-bar" placeholder="Search for tools...">
        <div id="filter-buttons"></div>
        <table>
            <thead>
                <tr>
                    <th data-sort="name">Tool Name</th>
                    <th data-sort="category">Category</th>
                    <th data-sort="description">Description</th>
                    <th data-sort="link">Link</th>
                    <th data-sort="rating">User Rating</th>
                    <th data-sort="cost">Cost</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (const item of data) {
        tableHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.description}</td>
                <td><a href="${item.link}" target="_blank">Visit</a></td>
                <td>${"⭐".repeat(item.rating)}</td>
                <td>${item.cost}</td>
            </tr>
        `;
    }

    tableHTML += `
            </tbody>
        </table>
    `;

    tableContainer.innerHTML = tableHTML;
}

let currentData = [...tools];
let activeFilters = [];

let sortColumn = null;
let sortDirection = 'asc';

function renderTable(data) {
    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th data-sort="name">Tool Name ${sortColumn === 'name' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                    <th data-sort="category">Category ${sortColumn === 'category' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                    <th data-sort="description">Description</th>
                    <th data-sort="link">Link</th>
                    <th data-sort="rating">User Rating ${sortColumn === 'rating' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                    <th data-sort="cost">Cost ${sortColumn === 'cost' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                </tr>
            </thead>
            <tbody>
    `;

    const sortedData = [...data].sort((a, b) => {
        if (sortColumn) {
            const aValue = a[sortColumn];
            const bValue = b[sortColumn];
            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
    });

    for (const item of sortedData) {
        tableHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.description}</td>
                <td><a href="${item.link}" target="_blank">Visit</a></td>
                <td>${"⭐".repeat(item.rating)}</td>
                <td>${item.cost}</td>
            </tr>
        `;
    }

    tableHTML += `
            </tbody>
        </table>
    `;

    table.innerHTML = tableHTML;

    const headers = document.querySelectorAll('th');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const newSortColumn = header.dataset.sort;
            if (sortColumn === newSortColumn) {
                sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                sortColumn = newSortColumn;
                sortDirection = 'asc';
            }
            renderTable(currentData);
        });
    });
}

function renderFilterButtons() {
    const filterButtonsContainer = document.getElementById('filter-buttons');
    if (!filterButtonsContainer) {
        const newFilterButtonsContainer = document.createElement('div');
        newFilterButtonsContainer.id = 'filter-buttons';
        tableContainer.insertBefore(newFilterButtonsContainer, table);
    }

    const categories = [...new Set(tools.map(tool => tool.category))];
    let buttonsHTML = '';
    for (const category of categories) {
        buttonsHTML += `<button class="filter-btn ${activeFilters.includes(category) ? 'active' : ''}" data-category="${category}">${category}</button>`;
    }
    document.getElementById('filter-buttons').innerHTML = buttonsHTML;

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            if (activeFilters.includes(category)) {
                activeFilters = activeFilters.filter(filter => filter !== category);
            } else {
                activeFilters.push(category);
            }
            applyFilters();
            renderFilterButtons();
        });
    });
}

function applyFilters() {
    let filteredData = [...tools];

    // Filter by search
    const searchString = searchBar.value.toLowerCase();
    if (searchString) {
        filteredData = filteredData.filter(tool => {
            return (
                tool.name.toLowerCase().includes(searchString) ||
                tool.description.toLowerCase().includes(searchString)
            );
        });
    }

    // Filter by category
    if (activeFilters.length > 0) {
        filteredData = filteredData.filter(tool => activeFilters.includes(tool.category));
    }

    currentData = filteredData;
    renderTable(currentData);
}

const searchBar = document.createElement('input');
searchBar.type = 'text';
searchBar.id = 'search-bar';
searchBar.placeholder = 'Search for tools...';
tableContainer.appendChild(searchBar);

const table = document.createElement('div');
tableContainer.appendChild(table);

searchBar.addEventListener("keyup", applyFilters);

renderFilterButtons();
renderTable(tools);
