// Client Management System
const CLIENTS_STORAGE_KEY = 'fifto_clients';
const SELECTED_CLIENTS_KEY = 'fifto_selected_clients';

// Default clients - 3 Clients with Hardcoded Data
const DEFAULT_CLIENTS = [
    {
        id: 'client-1',
        name: 'SUNKULA PUSHPAVATHI', // Default client name
        url: 'https://verified.flattrade.in/pnl/PO48d06e2272034b9e85d476c7fbd58057',
        capital: 10000000, // ₹1 Crore
        createdAt: new Date().toISOString()
    },
    {
        id: 'client-2',
        name: 'SACHIN GUPTA',
        url: 'https://verified.flattrade.in/pnl/4a217d80d07d4c49af16c77db99946fd',
        capital: 10000000, // ₹1 Crore
        createdAt: new Date().toISOString()
    },
    {
        id: 'client-3',
        name: 'RISHU GARG',
        url: 'https://verified.flattrade.in/pnl/PO05ba52fb8bee4f85918dc48e4ac88c54',
        capital: 10000000, // ₹1 Crore
        createdAt: new Date().toISOString()
    }
];

// Initialize clients
let clients = [];
let selectedClientIds = [];

// Load clients from localStorage
function loadClients() {
    // Clear all old client data from localStorage
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
        if (key.startsWith('fifto_')) {
            localStorage.removeItem(key);
        }
    });
    
    // Always use hardcoded default clients
    clients = JSON.parse(JSON.stringify(DEFAULT_CLIENTS)); // Deep copy
    saveClients();
    
    // Auto-select only the first client (SUNKULA PUSHPAVATHI)
    if (clients.length > 0) {
        selectedClientIds = [clients[0].id]; // Select only first client
    } else {
        selectedClientIds = [];
    }
    saveSelectedClients();
    
    console.log('Loaded hardcoded clients:', clients.length);
    console.log('Auto-selected first client:', selectedClientIds[0]);
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
    if (!name || !name.trim() || !url || !url.trim()) {
        throw new Error('Client name and URL are required');
    }
    
    // Validate URL
    if (!url.includes('flattrade.in')) {
        throw new Error('Invalid Flattrade URL');
    }
    
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
    if (confirm('Are you sure you want to delete this client?')) {
        clients = clients.filter(c => c.id !== clientId);
        selectedClientIds = selectedClientIds.filter(id => id !== clientId);
        
        // Clear P&L data for this client
        const storageKey = `fifto_pnl_data_${clientId}`;
        localStorage.removeItem(storageKey);
        localStorage.removeItem(`${storageKey}_time`);
        
        saveClients();
        saveSelectedClients();
        updateClientsList();
        updateClientSelector();
        
        // Load data if clients remain, otherwise clear UI
        if (clients.length > 0 && selectedClientIds.length > 0) {
            loadSelectedClientsData();
        } else {
            // Clear P&L data display
            if (typeof pnlData !== 'undefined') {
                pnlData = {
                    daily: [],
                    summary: { today: { pnl: 0, percent: 0 }, mtd: { pnl: 0, percent: 0 }, total: { pnl: 0, percent: 0 } },
                    capital: 0,
                    clientName: 'SUNKULA PUSHPAVATHI',
                    clientInfo: ''
                };
                if (typeof updateUI === 'function') {
                    updateUI();
                }
            }
        }
    }
}

// Clear all clients
function clearAllClients() {
    if (clients.length === 0) {
        alert('No clients to clear.');
        return;
    }
    
    if (confirm(`Are you sure you want to remove ALL ${clients.length} client(s)?\n\nThis will:\n- Delete all client records\n- Clear all cached P&L data\n- Reset all performance metrics\n\nThis action cannot be undone!`)) {
        // Clear all clients
        clients = [];
        selectedClientIds = [];
        
        // Clear all client-related localStorage data
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith('fifto_pnl_data_') || key === CLIENTS_STORAGE_KEY || key === SELECTED_CLIENTS_KEY) {
                localStorage.removeItem(key);
            }
        });
        
        // Clear main P&L data
        localStorage.removeItem('fifto_pnl_data');
        localStorage.removeItem('fifto_last_update');
        
        saveClients();
        saveSelectedClients();
        updateClientsList();
        updateClientSelector();
        
        // Clear P&L data display
        if (typeof pnlData !== 'undefined') {
            pnlData = {
                daily: [],
                summary: { today: { pnl: 0, percent: 0 }, mtd: { pnl: 0, percent: 0 }, total: { pnl: 0, percent: 0 } },
                capital: 0,
                clientName: 'SUNKULA PUSHPAVATHI',
                clientInfo: 'Please add a client to view P&L data'
            };
            if (typeof updateUI === 'function') {
                updateUI();
            }
        }
        
        // Update quick stats
        if (typeof updateQuickStats === 'function') {
            updateQuickStats();
        }
        
        alert('✅ All clients have been removed successfully!');
    }
}

// Update clients list in modal
function updateClientsList() {
    const container = document.getElementById('clients-list-container');
    if (!container) return;
    
    // Update clients count
    const countEl = document.getElementById('clients-count');
    if (countEl) {
        countEl.textContent = clients.length;
    }
    
    // Update clear all button visibility
    const clearAllBtn = document.getElementById('clear-all-clients-btn');
    if (clearAllBtn) {
        clearAllBtn.style.display = clients.length > 0 ? 'block' : 'none';
    }
    
    if (clients.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 3rem; color: var(--text-tertiary);"><p>No clients added yet.</p><p style="font-size: 0.9rem; margin-top: 0.5rem;">Use the "Add Client" tab to add your first client.</p></div>';
        return;
    }
    
    container.innerHTML = clients.map(client => `
        <div class="client-item">
            <div class="client-item-info">
                <strong>${client.name}</strong>
                <div class="client-url-container">
                    <label>Verified P&L Link</label>
                    <a href="${client.url}" target="_blank" rel="noopener" class="client-url-link">${client.url}</a>
                </div>
                <span class="client-capital">💰 Capital: ₹${(client.capital / 10000000).toFixed(2)}Cr</span>
            </div>
            <div class="client-item-actions">
                <button class="btn btn-secondary btn-small" onclick="editClient('${client.id}')" title="Edit client details">
                    ✏️ Edit
                </button>
                <button class="btn btn-warning btn-small" onclick="clearClientData('${client.id}')" title="Clear cached P&L data">
                    🗑️ Clear Data
                </button>
                <button class="btn btn-danger btn-small" onclick="deleteClient('${client.id}')" title="Delete client">
                    ❌ Delete
                </button>
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
    
    // Hide tabs and show edit form
    document.querySelector('.client-tabs').style.display = 'none';
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
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
    
    if (!name || !url) {
        alert('Please fill in all required fields');
        return;
    }
    
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
    
    // Reset form and show tabs again
    document.getElementById('edit-client-form').reset();
    document.getElementById('edit-client-form-container').style.display = 'none';
    document.querySelector('.client-tabs').style.display = 'flex';
    document.querySelector('[data-tab="list"]').click();
    
    // Show success message
    const container = document.getElementById('clients-list-container');
    if (container) {
        const successMsg = document.createElement('div');
        successMsg.style.cssText = 'background: #10b981; color: white; padding: 0.75rem; border-radius: 0.5rem; margin-bottom: 1rem; text-align: center;';
        successMsg.textContent = '✅ Client updated successfully!';
        container.insertBefore(successMsg, container.firstChild);
        setTimeout(() => successMsg.remove(), 3000);
    }
    
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

// Update client selector cards
function updateClientSelector() {
    const container = document.getElementById('client-selector-grid');
    if (!container) return;
    
    // Clear existing cards
    container.innerHTML = '';
    
    if (clients.length === 0) {
        return;
    }
    
    // Add card for each client
    clients.forEach((client, index) => {
        const card = document.createElement('div');
        card.className = 'client-selection-card';
        const isFirstClient = index === 0;
        const isSelected = selectedClientIds.includes(client.id);
        
        if (isSelected) {
            card.classList.add('selected');
        }
        
        // Get initials for avatar
        const initials = client.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
        
        // Format capital
        const capitalText = client.capital >= 10000000 
            ? `₹${(client.capital / 10000000).toFixed(2)}Cr`
            : `₹${(client.capital / 100000).toFixed(2)}L`;
        
        card.innerHTML = `
            <div class="client-card-header">
                <div class="client-card-avatar">${initials}</div>
                <div class="client-card-info">
                    <h4 class="client-card-name">${client.name}</h4>
                    <div class="client-card-capital">${capitalText}</div>
                </div>
            </div>
            <div class="client-card-url">
                <span class="client-card-url-label">Verified P&L Link</span>
                <a href="${client.url}" target="_blank" rel="noopener" class="client-card-url-link" onclick="event.stopPropagation()">${client.url}</a>
            </div>
        `;
        
        // Add click handler for all clients
        card.addEventListener('click', (e) => {
            // Don't toggle if clicking on link
            if (e.target.tagName === 'A') return;
            
            handleClientCardClick(client.id);
        });
        
        container.appendChild(card);
    });
    
    // Update "Select All" button
    const selectAllBtn = document.getElementById('select-all-clients');
    if (selectAllBtn) {
        const allSelected = selectedClientIds.length === clients.length && clients.length > 0;
        selectAllBtn.innerHTML = allSelected 
            ? '<span>✕</span> Deselect All'
            : '<span>✓</span> Select All';
    }
    
    // Update selected count
    updateSelectedCount();
}

// Handle client card click
function handleClientCardClick(clientId) {
    const index = selectedClientIds.indexOf(clientId);
    
    if (index > -1) {
        // Deselect
        selectedClientIds.splice(index, 1);
    } else {
        // Select
        selectedClientIds.push(clientId);
    }
    
    saveSelectedClients();
    updateClientSelector();
    updateSelectedCount();
    loadSelectedClientsData();
}

// Handle "Select All" button click
function handleSelectAllClick() {
    const allSelected = selectedClientIds.length === clients.length && clients.length > 0;
    
    if (allSelected) {
        // Deselect all
        selectedClientIds = [];
    } else {
        // Select all
        selectedClientIds = clients.map(c => c.id);
    }
    
    saveSelectedClients();
    updateClientSelector();
    updateSelectedCount();
    loadSelectedClientsData();
}

// Update selected clients count
function updateSelectedCount() {
    const countEl = document.getElementById('selected-clients-count');
    if (!countEl) return;
    
    const count = selectedClientIds.length;
    if (clients.length === 0) {
        countEl.textContent = 'No clients added';
    } else if (count === 0) {
        countEl.textContent = 'No clients selected';
    } else if (count === clients.length) {
        countEl.textContent = `All ${count} client${count !== 1 ? 's' : ''} selected (Combined View)`;
    } else {
        const selectedNames = clients
            .filter(c => selectedClientIds.includes(c.id))
            .map(c => c.name)
            .join(', ');
        countEl.textContent = `${count} client${count !== 1 ? 's' : ''} selected: ${selectedNames}`;
    }
}

// Clear selection function (kept for compatibility)
function clearSelection() {
    selectedClientIds = [];
    saveSelectedClients();
    updateClientSelector();
    updateSelectedCount();
    loadSelectedClientsData();
}

// Load data for selected clients
async function loadSelectedClientsData() {
    if (selectedClientIds.length === 0 || clients.length === 0) {
        console.warn('No clients selected');
        // Clear P&L data display if no clients
        if (typeof pnlData !== 'undefined') {
            pnlData = {
                daily: [],
                summary: { today: { pnl: 0, percent: 0 }, mtd: { pnl: 0, percent: 0 }, total: { pnl: 0, percent: 0 } },
                capital: 0,
                clientName: 'SUNKULA PUSHPAVATHI',
                clientInfo: 'Please add a client to view P&L data'
            };
            if (typeof updateUI === 'function') {
                updateUI();
            }
        }
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
        // With hardcoded data, errors should be rare, but show a message if needed
        alert('Error loading client data. Please refresh the page.');
    } finally {
        if (refreshBtn) {
            refreshBtn.disabled = false;
            refreshBtn.textContent = 'Refresh Data';
        }
    }
}

// Fetch client name from verified P&L URL - Now uses hardcoded data
async function fetchClientNameFromUrl(url) {
    // No longer fetching from API - return null to use default names
    // Client names are now set in DEFAULT_CLIENTS
    return null;
}

// Fetch data for a single client - Now uses hardcoded data (no API calls)
async function fetchClientData(client) {
    try {
        // Use hardcoded data if available
        if (typeof window !== 'undefined' && window.HARDCODED_CLIENT_DATA) {
            const hardcodedData = window.HARDCODED_CLIENT_DATA[client.id];
            if (hardcodedData) {
                console.log(`Using hardcoded data for ${client.name}`);
                
                // Update client name from hardcoded data
                const clientIndex = clients.findIndex(c => c.id === client.id);
                if (clientIndex !== -1 && hardcodedData.clientName) {
                    if (hardcodedData.clientName !== clients[clientIndex].name) {
                        clients[clientIndex].name = hardcodedData.clientName;
                        saveClients();
                        updateClientsList();
                    }
                    if (hardcodedData.capital && hardcodedData.capital !== clients[clientIndex].capital) {
                        clients[clientIndex].capital = hardcodedData.capital;
                        saveClients();
                    }
                }
                
                // Ensure data structure is correct
                const dataToStore = {
                    daily: hardcodedData.daily || [],
                    summary: hardcodedData.summary || {
                        today: { pnl: 0, percent: 0 },
                        mtd: { pnl: 0, percent: 0 },
                        total: { pnl: 0, percent: 0 }
                    },
                    capital: hardcodedData.capital || client.capital || 10000000,
                    clientName: hardcodedData.clientName || client.name,
                    clientInfo: hardcodedData.clientInfo || `Capital: ₹${(hardcodedData.capital || client.capital || 10000000) >= 10000000 ? ((hardcodedData.capital || client.capital || 10000000) / 10000000).toFixed(2) + 'Cr' : ((hardcodedData.capital || client.capital || 10000000) / 100000).toFixed(2) + 'L'}`,
                    clientId: client.id,
                    // Preserve metadata from verified URL if available
                    period: hardcodedData.period || null,
                    lastUpdated: hardcodedData.lastUpdated || null,
                    verifiedUrl: hardcodedData.verifiedUrl || client.url || null,
                    expectedPnl: hardcodedData.expectedPnl || null
                };
                
                // Recalculate summary from daily data to ensure accuracy
                if (dataToStore.daily && dataToStore.daily.length > 0) {
                    const today = dataToStore.daily[dataToStore.daily.length - 1];
                    const currentMonth = new Date().getMonth();
                    const currentYear = new Date().getFullYear();
                    
                    const mtdDays = dataToStore.daily.filter(d => {
                        const date = new Date(d.date);
                        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
                    });
                    
                    const totalPnl = dataToStore.daily.reduce((sum, d) => sum + d.pnl, 0);
                    const mtdPnl = mtdDays.reduce((sum, d) => sum + d.pnl, 0);
                    
                    dataToStore.summary = {
                        today: {
                            pnl: today.pnl,
                            percent: parseFloat(((today.pnl / dataToStore.capital) * 100).toFixed(2))
                        },
                        mtd: {
                            pnl: mtdPnl,
                            percent: parseFloat(((mtdPnl / dataToStore.capital) * 100).toFixed(2))
                        },
                        total: {
                            pnl: totalPnl,
                            percent: parseFloat(((totalPnl / dataToStore.capital) * 100).toFixed(2))
                        }
                    };
                }
                
                // Store in cache for consistency
                const cacheKey = `fifto_pnl_data_${client.id}`;
                localStorage.setItem(cacheKey, JSON.stringify(dataToStore));
                localStorage.setItem(`${cacheKey}_time`, Date.now().toString());
                
                return {
                    client: client,
                    data: dataToStore
                };
            }
        }
        
        // Fallback: Return empty data structure if hardcoded data not found
        console.warn(`No hardcoded data found for ${client.id}, returning empty data`);
        return {
            client: client,
            data: {
                daily: [],
                summary: {
                    today: { pnl: 0, percent: 0 },
                    mtd: { pnl: 0, percent: 0 },
                    total: { pnl: 0, percent: 0 }
                },
                capital: client.capital || 10000000,
                clientName: client.name,
                clientInfo: `Capital: ₹${client.capital >= 10000000 ? (client.capital / 10000000).toFixed(2) + 'Cr' : (client.capital / 100000).toFixed(2) + 'L'}`
            }
        };
    } catch (error) {
        console.error(`Error loading data for ${client.name}:`, error);
        throw error;
    }
}

// Combine data from multiple clients
function combineClientData(clientDataArray, selectedClients) {
    if (clientDataArray.length === 1) {
        // Single client - return as is, ensure capital is set
        const singleData = clientDataArray[0].data;
        const clientCapital = selectedClients[0].capital || singleData.capital || 10000000;
        // Prioritize client name from verified P&L, fallback to stored name, but default to SUNKULA PUSHPAVATHI
        let clientName = (singleData.clientName && singleData.clientName.trim()) 
            ? singleData.clientName.trim() 
            : selectedClients[0].name;
        
        // If name is generic (client1, client2, etc.) or empty, use default
        if (!clientName || 
            clientName.toLowerCase().startsWith('client') || 
            clientName === 'No clients added' ||
            clientName === 'Verified P&L Performance') {
            clientName = 'SUNKULA PUSHPAVATHI';
        }
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
    
    // Recalculate total P&L from combined daily data to ensure accuracy
    const recalculatedTotalPnl = combined.daily.reduce((sum, day) => sum + day.pnl, 0);
    
    // Calculate summary percentages based on combined capital
    if (combined.capital > 0) {
        combined.summary.today.percent = (combined.summary.today.pnl / combined.capital) * 100;
        combined.summary.mtd.percent = (combined.summary.mtd.pnl / combined.capital) * 100;
        combined.summary.total.pnl = recalculatedTotalPnl; // Use recalculated total for accuracy
        combined.summary.total.percent = (recalculatedTotalPnl / combined.capital) * 100;
    } else {
        combined.summary.today.percent = 0;
        combined.summary.mtd.percent = 0;
        combined.summary.total.percent = 0;
    }
    
    return combined;
}

// Initialize client management
function initClientManagement() {
    loadClients();
    
    // No longer forcing first client to be selected
    
    updateClientsList();
    updateClientSelector();
    
    // Setup tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTab = btn.getAttribute('data-tab');
            
            if (!targetTab) return;
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update active tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `tab-${targetTab}`) {
                    content.classList.add('active');
                }
            });
        });
    });
    
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
                fetchNameBtn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const url = urlInput.value.trim();
                    if (!url) {
                        alert('Please enter a P&L URL first');
                        urlInput.focus();
                        return;
                    }
                    
                    if (!url.includes('flattrade.in')) {
                        alert('Please enter a valid Flattrade P&L URL');
                        urlInput.focus();
                        return;
                    }
                    
                    // Disable button and show loading
                    fetchNameBtn.disabled = true;
                    const btnSpan = fetchNameBtn.querySelector('span');
                    if (btnSpan) {
                        btnSpan.textContent = '⏳';
                    }
                    
                    try {
                        const clientName = await fetchClientNameFromUrl(url);
                        if (clientName) {
                            nameInput.value = clientName;
                            // Show success
                            if (btnSpan) {
                                btnSpan.textContent = '✓';
                                setTimeout(() => {
                                    if (btnSpan) btnSpan.textContent = '🔍';
                                }, 2000);
                            }
                            // Show success message
                            const successMsg = document.createElement('div');
                            successMsg.style.cssText = 'background: #10b981; color: white; padding: 0.5rem; border-radius: 0.5rem; margin-top: 0.5rem; text-align: center; font-size: 0.875rem;';
                            successMsg.textContent = `✅ Name fetched: ${clientName}`;
                            const formGroup = nameInput.closest('.form-group');
                            if (formGroup) {
                                const existingMsg = formGroup.querySelector('.fetch-success-msg');
                                if (existingMsg) existingMsg.remove();
                                successMsg.className = 'fetch-success-msg';
                                formGroup.appendChild(successMsg);
                                setTimeout(() => successMsg.remove(), 3000);
                            }
                        } else {
                            alert('Could not fetch client name. Please enter manually.');
                            if (btnSpan) {
                                btnSpan.textContent = '🔍';
                            }
                        }
                    } catch (error) {
                        console.error('Error fetching name:', error);
                        alert('Error fetching client name. Please enter manually.');
                        if (btnSpan) {
                            btnSpan.textContent = '🔍';
                        }
                    } finally {
                        fetchNameBtn.disabled = false;
                    }
                });
            }
            
            // Auto-fetch name when URL loses focus (if name is empty) - Optional feature
            // Commented out to avoid automatic fetching without user action
            // urlInput.addEventListener('blur', async () => {
            //     const url = urlInput.value.trim();
            //     const name = nameInput.value.trim();
            //     
            //     if (url && !name && url.includes('flattrade.in')) {
            //         const clientName = await fetchClientNameFromUrl(url);
            //         if (clientName) {
            //             nameInput.value = clientName;
            //         }
            //     }
            // });
        }
        
        addForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('client-name-input');
            const urlInput = document.getElementById('client-url-input');
            const capitalInput = document.getElementById('client-capital-input');
            
            if (!nameInput || !urlInput || !capitalInput) {
                console.error('Form inputs not found');
                alert('Form error. Please refresh the page.');
                return;
            }
            
            const name = nameInput.value.trim();
            const url = urlInput.value.trim();
            const capital = capitalInput.value.trim();
            
            if (!name || !url) {
                alert('Please fill in all required fields');
                return;
            }
            
            try {
                addClient(name, url, capital);
                
                // Reset form
                addForm.reset();
                capitalInput.value = '10000000';
                
                // Switch to clients list tab
                const listTabBtn = document.querySelector('[data-tab="list"]');
                if (listTabBtn) {
                    listTabBtn.click();
                }
                
                // Show success message
                const formContainer = addForm.closest('.tab-content');
                if (formContainer) {
                    const successMsg = document.createElement('div');
                    successMsg.style.cssText = 'background: #10b981; color: white; padding: 0.75rem; border-radius: 0.5rem; margin-top: 1rem; text-align: center; font-weight: 600;';
                    successMsg.textContent = '✅ Client added successfully!';
                    formContainer.insertBefore(successMsg, formContainer.firstChild);
                    setTimeout(() => successMsg.remove(), 3000);
                }
            } catch (error) {
                console.error('Error adding client:', error);
                alert(error.message || 'Error adding client. Please try again.');
            }
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
    const cancelEditBtn2 = document.getElementById('cancel-edit-2');
    
    function hideEditForm() {
        const editForm = document.getElementById('edit-client-form');
        const editContainer = document.getElementById('edit-client-form-container');
        const tabs = document.querySelector('.client-tabs');
        
        if (editForm) editForm.reset();
        if (editContainer) editContainer.style.display = 'none';
        
        // Show tabs again
        if (tabs) tabs.style.display = 'flex';
        
        // Activate list tab
        const listTabBtn = document.querySelector('[data-tab="list"]');
        const listTabContent = document.getElementById('tab-list');
        const addTabBtn = document.querySelector('[data-tab="add"]');
        const addTabContent = document.getElementById('tab-add');
        
        if (listTabBtn && listTabContent) {
            listTabBtn.classList.add('active');
            if (addTabBtn) addTabBtn.classList.remove('active');
            listTabContent.classList.add('active');
            if (addTabContent) addTabContent.classList.remove('active');
        }
    }
    
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', hideEditForm);
    }
    if (cancelEditBtn2) {
        cancelEditBtn2.addEventListener('click', hideEditForm);
    }
    
    const clearBtn = document.getElementById('clear-selection');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            selectedClientIds = [];
            saveSelectedClients();
            updateClientSelector();
            updateSelectedCount();
            loadSelectedClientsData();
        });
    }
    
    const selectAllBtn = document.getElementById('select-all-clients');
    if (selectAllBtn) {
        selectAllBtn.addEventListener('click', handleSelectAllClick);
    }
    
    const manageBtn = document.getElementById('manage-clients');
    const modal = document.getElementById('client-management-modal');
    const closeBtn = document.getElementById('close-modal');
    
    if (manageBtn && modal) {
        manageBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
            modal.classList.add('active');
            // Switch to list tab if clients exist
            if (clients.length > 0) {
                const listTabBtn = document.querySelector('[data-tab="list"]');
                if (listTabBtn) {
                    listTabBtn.click();
                }
            } else {
                // Switch to add tab if no clients
                const addTabBtn = document.querySelector('[data-tab="add"]');
                if (addTabBtn) {
                    addTabBtn.click();
                }
            }
        });
    }
    
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            modal.classList.remove('active');
        });
    }
    
    // Close modal on outside click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                modal.classList.remove('active');
            }
        });
    }
    
    // Clear all clients button
    const clearAllBtn = document.getElementById('clear-all-clients-btn');
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', () => {
            clearAllClients();
            // Update UI after clearing
            updateClientsList();
            updateClientSelector();
        });
    }
    
    // Load data for selected clients on init
    loadSelectedClientsData();
}

// Make functions available globally
window.deleteClient = deleteClient;
window.clearAllClients = clearAllClients;

// Initialize on page load
document.addEventListener('DOMContentLoaded', initClientManagement);

