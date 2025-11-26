// Client Management System
const CLIENTS_STORAGE_KEY = 'fifto_clients';
const SELECTED_CLIENTS_KEY = 'fifto_selected_clients';

// Default clients - 3 Verified P&L Links
const DEFAULT_CLIENTS = [
    {
        id: 'client-1',
        name: 'SUNKULA PUSHPAVATHI',
        url: 'https://wall.flattrade.in/pnl/PO48d06e2272034b9e85d476c7fbd58057',
        capital: 10000000, // 1 Crore
        createdAt: new Date().toISOString()
    },
    {
        id: 'client-2',
        name: 'Client 2',
        url: 'https://verified.flattrade.in/pnl/PO48d06e2272034b9e85d476c7fbd58057',
        capital: 17000000, // 1.7 Crore
        createdAt: new Date().toISOString()
    },
    {
        id: 'client-3',
        name: 'Client 3',
        url: 'https://verified.flattrade.in/pnl/PO05ba52fb8bee4f85918dc48e4ac88c54',
        capital: 10000000, // 1 Crore
        createdAt: new Date().toISOString()
    }
];

// Initialize clients
let clients = [];
let selectedClientIds = [];

// Load clients from localStorage
function loadClients() {
    const stored = localStorage.getItem(CLIENTS_STORAGE_KEY);
    if (stored) {
        try {
            clients = JSON.parse(stored);
            // If we have stored clients, check if we need to add new default clients
            const existingUrls = clients.map(c => c.url);
            DEFAULT_CLIENTS.forEach(defaultClient => {
                if (!existingUrls.includes(defaultClient.url)) {
                    clients.push(defaultClient);
                }
            });
            saveClients();
        } catch (e) {
            console.error('Error loading clients:', e);
            clients = [...DEFAULT_CLIENTS];
            saveClients();
        }
    } else {
        // Initialize with default clients
        clients = [...DEFAULT_CLIENTS];
        saveClients();
    }
    
    // Load selected clients
    const selected = localStorage.getItem(SELECTED_CLIENTS_KEY);
    if (selected) {
        try {
            selectedClientIds = JSON.parse(selected);
            // Ensure at least one client is selected
            if (selectedClientIds.length === 0 && clients.length > 0) {
                selectedClientIds = [clients[0].id];
                saveSelectedClients();
            }
        } catch (e) {
            selectedClientIds = clients.length > 0 ? [clients[0].id] : [];
            saveSelectedClients();
        }
    } else {
        selectedClientIds = clients.length > 0 ? [clients[0].id] : [];
        saveSelectedClients();
    }
}

// Save clients to localStorage
function saveClients() {
    localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(clients));
}

// Save selected clients
function saveSelectedClients() {
    localStorage.setItem(SELECTED_CLIENTS_KEY, JSON.stringify(selectedClientIds));
}

// Generate unique client ID
function generateClientId() {
    return 'client-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

// Add new client
function addClient(name, url, capital) {
    const newClient = {
        id: generateClientId(),
        name: name.trim(),
        url: url.trim(),
        capital: parseInt(capital) || 10000000,
        createdAt: new Date().toISOString()
    };
    
    clients.push(newClient);
    saveClients();
    updateClientsList();
    updateClientSelector();
    
    // Auto-select new client
    selectedClientIds = [newClient.id];
    saveSelectedClients();
    updateClientSelector();
    loadSelectedClientsData();
    
    return newClient;
}

// Delete client
function deleteClient(clientId) {
    if (clients.length <= 1) {
        alert('Cannot delete the last client. Please add another client first.');
        return;
    }
    
    if (confirm('Are you sure you want to delete this client?')) {
        clients = clients.filter(c => c.id !== clientId);
        selectedClientIds = selectedClientIds.filter(id => id !== clientId);
        
        // If no clients selected, select the first one
        if (selectedClientIds.length === 0 && clients.length > 0) {
            selectedClientIds = [clients[0].id];
        }
        
        saveClients();
        saveSelectedClients();
        updateClientsList();
        updateClientSelector();
        loadSelectedClientsData();
    }
}

// Update clients list in modal
function updateClientsList() {
    const container = document.getElementById('clients-list-container');
    if (!container) return;
    
    if (clients.length === 0) {
        container.innerHTML = '<p>No clients added yet.</p>';
        return;
    }
    
    container.innerHTML = clients.map(client => `
        <div class="client-item">
            <div class="client-item-info">
                <strong>${client.name}</strong>
                <div class="client-url-container">
                    <label>Verified P&L Link:</label>
                    <a href="${client.url}" target="_blank" rel="noopener" class="client-url-link">${client.url}</a>
                </div>
                <span class="client-capital">Capital: ₹${(client.capital / 10000000).toFixed(2)}Cr</span>
            </div>
            <div class="client-item-actions">
                <button class="btn btn-secondary btn-small" onclick="editClient('${client.id}')">Edit</button>
                <button class="btn btn-warning btn-small" onclick="clearClientData('${client.id}')" title="Clear cached P&L data for this client">Clear Data</button>
                <button class="btn btn-danger btn-small" onclick="deleteClient('${client.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

// Edit client
function editClient(clientId) {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;
    
    // Populate edit form
    document.getElementById('edit-client-id').value = client.id;
    document.getElementById('edit-client-name-input').value = client.name;
    document.getElementById('edit-client-url-input').value = client.url;
    document.getElementById('edit-client-capital-input').value = client.capital;
    
    // Show edit form, hide add form
    document.querySelector('.add-client-form').style.display = 'none';
    document.getElementById('edit-client-form-container').style.display = 'block';
    
    // Scroll to edit form
    document.getElementById('edit-client-form-container').scrollIntoView({ behavior: 'smooth' });
}

// Save edited client
function saveEditedClient() {
    const clientId = document.getElementById('edit-client-id').value;
    const name = document.getElementById('edit-client-name-input').value.trim();
    const url = document.getElementById('edit-client-url-input').value.trim();
    const capital = parseInt(document.getElementById('edit-client-capital-input').value) || 10000000;
    
    const clientIndex = clients.findIndex(c => c.id === clientId);
    if (clientIndex === -1) return;
    
    // Update client
    clients[clientIndex] = {
        ...clients[clientIndex],
        name: name,
        url: url,
        capital: capital
    };
    
    saveClients();
    updateClientsList();
    updateClientSelector();
    
    // Reset form
    document.getElementById('edit-client-form').reset();
    document.querySelector('.add-client-form').style.display = 'block';
    document.getElementById('edit-client-form-container').style.display = 'none';
    
    // Reload data if this client is selected
    if (selectedClientIds.includes(clientId)) {
        loadSelectedClientsData();
    }
}

// Clear cached data for a specific client
function clearClientData(clientId) {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;
    
    if (confirm(`Clear all cached P&L data for "${client.name}"? This will force a fresh fetch on next refresh.`)) {
        // Clear localStorage data related to this client
        const storageKey = `fifto_pnl_data_${clientId}`;
        localStorage.removeItem(storageKey);
        
        // Also clear the main storage if it contains this client's data
        const mainData = localStorage.getItem('fifto_pnl_data');
        if (mainData) {
            try {
                const data = JSON.parse(mainData);
                // If current data is for this client, clear it
                if (data.clientId === clientId || 
                    (data.clientName === client.name && data.daily && data.daily.length > 0)) {
                    localStorage.removeItem('fifto_pnl_data');
                    localStorage.removeItem('fifto_last_update');
                }
            } catch (e) {
                // Ignore parse errors
            }
        }
        
        alert(`Cached data cleared for "${client.name}". Click "Refresh Data" to fetch fresh data.`);
        
        // If this client is currently selected, reload data
        if (selectedClientIds.includes(clientId)) {
            loadSelectedClientsData();
        }
    }
}

// Make functions available globally
window.editClient = editClient;
window.clearClientData = clearClientData;

// Update client selector checkboxes
function updateClientSelector() {
    const container = document.getElementById('client-checkboxes-list');
    if (!container) return;
    
    // Clear existing checkboxes
    container.innerHTML = '';
    
    // Add checkbox for each client
    clients.forEach(client => {
        const label = document.createElement('label');
        label.className = 'client-checkbox-label';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = client.id;
        checkbox.id = `client-${client.id}`;
        checkbox.checked = selectedClientIds.includes(client.id);
        checkbox.addEventListener('change', handleClientCheckboxChange);
        
        const span = document.createElement('span');
        span.textContent = client.name;
        
        label.appendChild(checkbox);
        label.appendChild(span);
        container.appendChild(label);
    });
    
    // Update "Select All" checkbox
    const selectAll = document.getElementById('select-all-clients');
    if (selectAll) {
        selectAll.checked = selectedClientIds.length === clients.length && clients.length > 0;
        selectAll.addEventListener('change', handleSelectAllChange);
    }
    
    // Update selected count
    updateSelectedCount();
}

// Handle individual client checkbox change
function handleClientCheckboxChange(e) {
    const clientId = e.target.value;
    
    if (e.target.checked) {
        if (!selectedClientIds.includes(clientId)) {
            selectedClientIds.push(clientId);
        }
    } else {
        selectedClientIds = selectedClientIds.filter(id => id !== clientId);
    }
    
    // Uncheck "Select All" if not all are selected
    const selectAll = document.getElementById('select-all-clients');
    if (selectAll) {
        selectAll.checked = selectedClientIds.length === clients.length;
    }
    
    saveSelectedClients();
    updateSelectedCount();
    loadSelectedClientsData();
}

// Handle "Select All" checkbox change
function handleSelectAllChange(e) {
    if (e.target.checked) {
        selectedClientIds = clients.map(c => c.id);
        // Check all client checkboxes
        clients.forEach(client => {
            const checkbox = document.getElementById(`client-${client.id}`);
            if (checkbox) checkbox.checked = true;
        });
    } else {
        selectedClientIds = [];
        // Uncheck all client checkboxes
        clients.forEach(client => {
            const checkbox = document.getElementById(`client-${client.id}`);
            if (checkbox) checkbox.checked = false;
        });
    }
    
    saveSelectedClients();
    updateSelectedCount();
    loadSelectedClientsData();
}

// Update selected clients count
function updateSelectedCount() {
    const countEl = document.getElementById('selected-clients-count');
    if (!countEl) return;
    
    const count = selectedClientIds.length;
    if (selectedClientIds.includes('all') || count === clients.length) {
        countEl.textContent = 'All clients selected';
    } else {
        countEl.textContent = `${count} client${count !== 1 ? 's' : ''} selected`;
    }
}

// Clear selection
function clearSelection() {
    selectedClientIds = clients.length > 0 ? [clients[0].id] : [];
    saveSelectedClients();
    updateClientSelector();
    loadSelectedClientsData();
}

// Load data for selected clients
async function loadSelectedClientsData() {
    if (selectedClientIds.length === 0) {
        console.warn('No clients selected');
        return;
    }
    
    const selectedClients = clients.filter(c => selectedClientIds.includes(c.id));
    
    if (selectedClients.length === 0) {
        console.warn('No valid clients found');
        return;
    }
    
    // Show loading state
    const refreshBtn = document.getElementById('refresh-pnl');
    if (refreshBtn) {
        refreshBtn.disabled = true;
        refreshBtn.textContent = 'Loading...';
    }
    
    try {
        // Fetch data for all selected clients
        const clientDataPromises = selectedClients.map(client => fetchClientData(client));
        const clientDataArray = await Promise.all(clientDataPromises);
        
        // Combine data if multiple clients
        const combinedData = combineClientData(clientDataArray, selectedClients);
        
        // Update global pnlData
        if (typeof pnlData !== 'undefined') {
            pnlData = combinedData;
            if (typeof saveData === 'function') {
                saveData();
            }
            if (typeof updateUI === 'function') {
                updateUI();
            }
        }
        
        // Update verified source link
        const sourceLink = document.getElementById('verified-source-link');
        if (sourceLink && selectedClients.length === 1) {
            sourceLink.href = selectedClients[0].url;
            sourceLink.textContent = 'Flattrade Wall P&L';
        } else {
            sourceLink.href = '#';
            sourceLink.textContent = `${selectedClients.length} Clients`;
        }
        
        // Update quick stats after data is loaded
        if (typeof updateQuickStats === 'function') {
            setTimeout(() => updateQuickStats(), 300);
        }
        
    } catch (error) {
        console.error('Error loading client data:', error);
        alert('Error loading client data. Please try again.');
    } finally {
        if (refreshBtn) {
            refreshBtn.disabled = false;
            refreshBtn.textContent = 'Refresh Data';
        }
    }
}

// Fetch client name from verified P&L URL
async function fetchClientNameFromUrl(url) {
    if (!url || !url.includes('flattrade.in')) {
        return null;
    }
    
    try {
        const response = await fetch('/api/fetch-pnl', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: url })
        });
        
        if (response.ok) {
            const data = await response.json();
            return data.clientName || null;
        }
    } catch (error) {
        console.error('Error fetching client name:', error);
    }
    
    return null;
}

// Fetch data for a single client
async function fetchClientData(client) {
    try {
        // Check for cached data first
        const cacheKey = `fifto_pnl_data_${client.id}`;
        const cached = localStorage.getItem(cacheKey);
        const cacheTime = localStorage.getItem(`${cacheKey}_time`);
        
        // Use cache if less than 1 hour old
        if (cached && cacheTime) {
            const cacheAge = Date.now() - parseInt(cacheTime);
            if (cacheAge < 3600000) { // 1 hour
                try {
                    const cachedData = JSON.parse(cached);
                    console.log(`Using cached data for ${client.name}`);
                    
                    // Update client name if it's different in the fetched data
                    if (cachedData.clientName && cachedData.clientName.trim() && 
                        cachedData.clientName.trim() !== client.name.trim()) {
                        console.log(`Updating client name from "${client.name}" to "${cachedData.clientName}"`);
                        const clientIndex = clients.findIndex(c => c.id === client.id);
                        if (clientIndex !== -1) {
                            clients[clientIndex].name = cachedData.clientName.trim();
                            saveClients();
                            updateClientsList();
                        }
                    }
                    
                    return {
                        client: client,
                        data: cachedData
                    };
                } catch (e) {
                    // Cache corrupted, fetch fresh
                }
            }
        }
        
        const response = await fetch('/api/fetch-pnl', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: client.url })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Update client name if it's different in the fetched data
        if (data.clientName && data.clientName.trim() && 
            data.clientName.trim() !== client.name.trim()) {
            console.log(`Updating client name from "${client.name}" to "${data.clientName}"`);
            const clientIndex = clients.findIndex(c => c.id === client.id);
            if (clientIndex !== -1) {
                clients[clientIndex].name = data.clientName.trim();
                saveClients();
                updateClientsList();
                updateClientSelector();
            }
        }
        
        // Store in cache with client ID
        data.clientId = client.id;
        localStorage.setItem(cacheKey, JSON.stringify(data));
        localStorage.setItem(`${cacheKey}_time`, Date.now().toString());
        
        return {
            client: client,
            data: data
        };
    } catch (error) {
        console.error(`Error fetching data for ${client.name}:`, error);
        throw error;
    }
}

// Combine data from multiple clients
function combineClientData(clientDataArray, selectedClients) {
    if (clientDataArray.length === 1) {
        // Single client - return as is, ensure capital is set
        const singleData = clientDataArray[0].data;
        const clientCapital = selectedClients[0].capital || singleData.capital || 10000000;
        // Prioritize client name from verified P&L, fallback to stored name
        const clientName = (singleData.clientName && singleData.clientName.trim()) 
            ? singleData.clientName.trim() 
            : selectedClients[0].name;
        return {
            ...singleData,
            clientName: clientName,
            capital: clientCapital,
            clientInfo: singleData.clientInfo || `Capital: ₹${clientCapital >= 10000000 ? (clientCapital / 10000000).toFixed(2) + 'Cr' : (clientCapital / 100000).toFixed(2) + 'L'}`
        };
    }
    
    // Multiple clients - combine data
    const totalCapital = selectedClients.reduce((sum, c) => sum + (c.capital || 0), 0);
    const combined = {
        daily: [],
        summary: {
            today: { pnl: 0, percent: 0 },
            mtd: { pnl: 0, percent: 0 },
            total: { pnl: 0, percent: 0 }
        },
        capital: totalCapital,
        clientName: `${selectedClients.length} Clients (Combined)`,
        clientInfo: `Capital: ₹${totalCapital >= 10000000 ? (totalCapital / 10000000).toFixed(2) + 'Cr' : (totalCapital / 100000).toFixed(2) + 'L'} | ${selectedClients.map(c => c.name).join(', ')}`
    };
    
    // Combine daily P&L by date
    const dailyByDate = {};
    
    clientDataArray.forEach(({ client, data }) => {
        if (data.daily && Array.isArray(data.daily)) {
            data.daily.forEach(day => {
                const dateKey = day.date.split('T')[0]; // YYYY-MM-DD
                if (!dailyByDate[dateKey]) {
                    dailyByDate[dateKey] = {
                        date: day.date,
                        pnl: 0,
                        percent: 0
                    };
                }
                dailyByDate[dateKey].pnl += day.pnl;
            });
        }
        
        // Combine summaries
        if (data.summary) {
            combined.summary.today.pnl += data.summary.today.pnl || 0;
            combined.summary.mtd.pnl += data.summary.mtd.pnl || 0;
            combined.summary.total.pnl += data.summary.total.pnl || 0;
        }
    });
    
    // Convert to array and calculate percentages
    combined.daily = Object.values(dailyByDate)
        .map(day => ({
            ...day,
            percent: combined.capital ? (day.pnl / combined.capital) * 100 : 0
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Calculate summary percentages
    combined.summary.today.percent = combined.capital ? (combined.summary.today.pnl / combined.capital) * 100 : 0;
    combined.summary.mtd.percent = combined.capital ? (combined.summary.mtd.pnl / combined.capital) * 100 : 0;
    combined.summary.total.percent = combined.capital ? (combined.summary.total.pnl / combined.capital) * 100 : 0;
    
    return combined;
}

// Initialize client management
function initClientManagement() {
    loadClients();
    
    // Ensure all 3 verified P&L links are included
    const verifiedLinks = [
        'https://wall.flattrade.in/pnl/PO48d06e2272034b9e85d476c7fbd58057',
        'https://verified.flattrade.in/pnl/PO48d06e2272034b9e85d476c7fbd58057',
        'https://verified.flattrade.in/pnl/PO05ba52fb8bee4f85918dc48e4ac88c54'
    ];
    
    const existingUrls = clients.map(c => c.url);
    let addedNew = false;
    
    // Add any missing verified links
    DEFAULT_CLIENTS.forEach(defaultClient => {
        if (!existingUrls.includes(defaultClient.url)) {
            clients.push({
                ...defaultClient,
                createdAt: new Date().toISOString()
            });
            addedNew = true;
        }
    });
    
    if (addedNew) {
        saveClients();
    }
    
    updateClientsList();
    updateClientSelector();
    
    // Setup event listeners
    const addForm = document.getElementById('add-client-form');
    if (addForm) {
        // Auto-fetch client name when URL is entered
        const urlInput = document.getElementById('client-url-input');
        const nameInput = document.getElementById('client-name-input');
        const fetchNameBtn = document.getElementById('fetch-name-btn');
        
        if (urlInput && nameInput) {
            // Add fetch name button functionality
            if (fetchNameBtn) {
                fetchNameBtn.addEventListener('click', async () => {
                    const url = urlInput.value.trim();
                    if (!url) {
                        alert('Please enter a P&L URL first');
                        return;
                    }
                    
                    fetchNameBtn.disabled = true;
                    fetchNameBtn.textContent = 'Fetching...';
                    
                    const clientName = await fetchClientNameFromUrl(url);
                    if (clientName) {
                        nameInput.value = clientName;
                        alert(`Client name fetched: ${clientName}`);
                    } else {
                        alert('Could not fetch client name. Please enter manually.');
                    }
                    
                    fetchNameBtn.disabled = false;
                    fetchNameBtn.textContent = 'Fetch Name';
                });
            }
            
            // Auto-fetch name when URL loses focus (if name is empty)
            urlInput.addEventListener('blur', async () => {
                const url = urlInput.value.trim();
                const name = nameInput.value.trim();
                
                if (url && !name && url.includes('flattrade.in')) {
                    const clientName = await fetchClientNameFromUrl(url);
                    if (clientName) {
                        nameInput.value = clientName;
                    }
                }
            });
        }
        
        addForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('client-name-input').value;
            const url = document.getElementById('client-url-input').value;
            const capital = document.getElementById('client-capital-input').value;
            
            addClient(name, url, capital);
            
            // Reset form
            addForm.reset();
            document.getElementById('client-capital-input').value = '10000000';
        });
    }
    
    const editForm = document.getElementById('edit-client-form');
    if (editForm) {
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveEditedClient();
        });
    }
    
    const cancelEditBtn = document.getElementById('cancel-edit');
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', () => {
            document.getElementById('edit-client-form').reset();
            document.querySelector('.add-client-form').style.display = 'block';
            document.getElementById('edit-client-form-container').style.display = 'none';
        });
    }
    
    const clearBtn = document.getElementById('clear-selection');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearSelection);
    }
    
    const manageBtn = document.getElementById('manage-clients');
    const modal = document.getElementById('client-management-modal');
    const closeBtn = document.getElementById('close-modal');
    
    if (manageBtn && modal) {
        manageBtn.addEventListener('click', () => {
            modal.style.display = 'block';
        });
    }
    
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    // Close modal on outside click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Load data for selected clients on init
    loadSelectedClientsData();
}

// Make deleteClient available globally
window.deleteClient = deleteClient;

// Initialize on page load
document.addEventListener('DOMContentLoaded', initClientManagement);

