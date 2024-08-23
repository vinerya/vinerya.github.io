document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('habit-form');
    const assetList = document.getElementById('asset-list');
    const futuresList = document.getElementById('futures-list');
    const optionsList = document.getElementById('options-list');
    const swapsList = document.getElementById('swaps-list');
    const tradeForm = document.getElementById('trade-form');
    const lendingForm = document.getElementById('lending-form');

    // Add test habit contracts
    addTestHabitContracts();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const habit = document.getElementById('habit').value;
        const frequency = parseInt(document.getElementById('frequency').value);
        const duration = parseInt(document.getElementById('duration').value);
        const stake = parseFloat(document.getElementById('stake').value);
        const device = document.getElementById('device').value;

        // AI Prediction
        const successProbability = await predictSuccess(habit, frequency, duration, stake);

        // Blockchain integration
        const contractAddress = await createSmartContract(habit, frequency, duration, stake);

        // Generate financial instruments
        const tokenId = generateToken(contractAddress, stake, successProbability);
        const futureId = generateFuture(tokenId, duration);
        const optionId = generateOption(tokenId, duration);
        const swapId = generateSwap(tokenId, duration);

        // Add the new contract and financial instruments to the platform
        addContractToTrading(habit, frequency, duration, stake, tokenId, contractAddress, device);
        addFutureToMarket(futureId, tokenId, duration);
        addOptionToMarket(optionId, tokenId, duration);
        addSwapToMarket(swapId, tokenId, duration);

        // Update financial dashboard
        updateFinancialDashboard();

        alert('Habit contract created successfully!');
    });

    tradeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const assetType = document.getElementById('asset-type').value;
        const assetId = document.getElementById('asset-id').value;
        const tradeType = document.getElementById('trade-type').value;
        const amount = parseFloat(document.getElementById('trade-amount').value);
        const price = parseFloat(document.getElementById('trade-price').value);

        executeTrade(assetType, assetId, tradeType, amount, price);
    });

    lendingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const action = document.getElementById('lending-action').value;
        const amount = parseFloat(document.getElementById('lending-amount').value);

        executeLendingAction(action, amount);
    });

    // Add event listeners for simulating progress
    assetList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Simulate Progress') {
            const tokenId = e.target.dataset.tokenId;
            simulateProgress(tokenId);
        }
    });
});

function addTestHabitContracts() {
    const testContracts = [
        { habit: "Daily Meditation", frequency: 7, duration: 4, stake: 0.5, device: "smartphone" },
        { habit: "Gym Workout", frequency: 3, duration: 12, stake: 1.2, device: "fitness-tracker" },
        { habit: "Read 30 Minutes", frequency: 5, duration: 8, stake: 0.8, device: "smartphone" },
        { habit: "Learn a New Language", frequency: 4, duration: 24, stake: 2.5, device: "smartphone" },
        { habit: "Healthy Meal Prep", frequency: 2, duration: 16, stake: 1.0, device: "smart-scale" }
    ];

    testContracts.forEach(async (contract) => {
        const successProbability = await predictSuccess(contract.habit, contract.frequency, contract.duration, contract.stake);
        const contractAddress = await createSmartContract(contract.habit, contract.frequency, contract.duration, contract.stake);
        const tokenId = generateToken(contractAddress, contract.stake, successProbability);
        const futureId = generateFuture(tokenId, contract.duration);
        const optionId = generateOption(tokenId, contract.duration);
        const swapId = generateSwap(tokenId, contract.duration);

        addContractToTrading(contract.habit, contract.frequency, contract.duration, contract.stake, tokenId, contractAddress, contract.device);
        addFutureToMarket(futureId, tokenId, contract.duration);
        addOptionToMarket(optionId, tokenId, contract.duration);
        addSwapToMarket(swapId, tokenId, contract.duration);
    });

    updateFinancialDashboard();
}

function addContractToTrading(habit, frequency, duration, stake, tokenId, contractAddress, device) {
    const assetList = document.getElementById('asset-list');
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <strong>Token ID:</strong> ${tokenId}<br>
        <strong>Habit:</strong> ${habit}<br>
        <strong>Frequency:</strong> ${frequency} times/week<br>
        <strong>Duration:</strong> ${duration} weeks<br>
        <strong>Stake:</strong> ${stake} ETH<br>
        <strong>Contract Address:</strong> ${contractAddress}<br>
        <strong>Tracking Device:</strong> ${device}<br>
        <button data-token-id="${tokenId}" onclick="simulateProgress('${tokenId}')">Simulate Progress</button>
    `;
    assetList.appendChild(listItem);
}

function addFutureToMarket(futureId, tokenId, duration) {
    const futuresList = document.getElementById('futures-list');
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <strong>Future ID:</strong> ${futureId}<br>
        <strong>Underlying Token:</strong> ${tokenId}<br>
        <strong>Expiry:</strong> ${duration} weeks<br>
        <strong>Current Price:</strong> ${(Math.random() * 0.1 + 0.9).toFixed(4)} ETH
    `;
    futuresList.appendChild(listItem);
}

function addOptionToMarket(optionId, tokenId, duration) {
    const optionsList = document.getElementById('options-list');
    const listItem = document.createElement('li');
    const strikePrice = (Math.random() * 0.5 + 0.5).toFixed(4);
    listItem.innerHTML = `
        <strong>Option ID:</strong> ${optionId}<br>
        <strong>Type:</strong> ${Math.random() > 0.5 ? 'Call' : 'Put'}<br>
        <strong>Underlying Token:</strong> ${tokenId}<br>
        <strong>Strike Price:</strong> ${strikePrice} ETH<br>
        <strong>Expiry:</strong> ${duration} weeks<br>
        <strong>Premium:</strong> ${(strikePrice * 0.1).toFixed(4)} ETH
    `;
    optionsList.appendChild(listItem);
}

function addSwapToMarket(swapId, tokenId, duration) {
    const swapsList = document.getElementById('swaps-list');
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <strong>Swap ID:</strong> ${swapId}<br>
        <strong>Token 1:</strong> ${tokenId}<br>
        <strong>Token 2:</strong> ETH<br>
        <strong>Duration:</strong> ${duration} weeks<br>
        <strong>Exchange Rate:</strong> 1 ${tokenId} = ${(Math.random() * 0.5 + 0.5).toFixed(4)} ETH
    `;
    swapsList.appendChild(listItem);
}

function updateFinancialDashboard() {
    const totalContracts = document.querySelectorAll('#asset-list li').length;
    const totalValueLocked = (Math.random() * 100 + 50).toFixed(2);
    const tradingVolume = (Math.random() * 20 + 10).toFixed(2);
    const habitIndex = (1000 + (Math.random() * 200 - 100)).toFixed(2);
    const portfolioValue = (Math.random() * 10 + 5).toFixed(2);
    const unrealizedPL = ((Math.random() * 2 - 1) * 2).toFixed(2);

    document.getElementById('total-contracts').textContent = totalContracts;
    document.getElementById('total-value-locked').textContent = totalValueLocked;
    document.getElementById('trading-volume').textContent = tradingVolume;
    document.getElementById('habit-index').textContent = habitIndex;
    document.getElementById('portfolio-value').textContent = portfolioValue;
    document.getElementById('unrealized-pl').textContent = unrealizedPL;

    updateOrderBook();
}

function updateOrderBook() {
    const bids = document.getElementById('bids');
    const asks = document.getElementById('asks');

    bids.innerHTML = '<h4>Bids</h4>';
    asks.innerHTML = '<h4>Asks</h4>';

    for (let i = 0; i < 5; i++) {
        const bidPrice = (1 - i * 0.01).toFixed(6);
        const askPrice = (1 + i * 0.01).toFixed(6);
        const volume = (Math.random() * 10).toFixed(2);

        bids.innerHTML += `<p>${bidPrice} ETH - ${volume} units</p>`;
        asks.innerHTML += `<p>${askPrice} ETH - ${volume} units</p>`;
    }
}

function simulateProgress(tokenId) {
    console.log(`Simulating progress for token ${tokenId}`);
    
    const progress = Math.random() * 0.09 + 0.01;
    
    alert(`Progress simulated! Token ${tokenId} value increased by ${(progress * 100).toFixed(2)}%`);
    updateFinancialDashboard();
}

function executeTrade(assetType, assetId, tradeType, amount, price) {
    console.log(`Executing trade: ${tradeType} ${amount} of ${assetType} ${assetId} at ${price} ETH`);
    alert(`Trade executed: ${tradeType} ${amount} of ${assetType} ${assetId} at ${price} ETH`);
    updateFinancialDashboard();
}

function executeLendingAction(action, amount) {
    console.log(`Executing lending action: ${action} ${amount} ETH`);
    alert(`Lending action executed: ${action} ${amount} ETH`);
    updateFinancialDashboard();
}

// Placeholder functions for financial instrument generation
function generateToken(contractAddress, stake, successProbability) {
    return `TKN-${contractAddress.slice(0, 8)}`;
}

function generateFuture(tokenId, duration) {
    return `FUT-${tokenId}-${duration}W`;
}

function generateOption(tokenId, duration) {
    return `OPT-${tokenId}-${duration}W`;
}

function generateSwap(tokenId, duration) {
    return `SWP-${tokenId}-${duration}W`;
}

// Simulated AI prediction function
async function predictSuccess(habit, frequency, duration, stake) {
    // Simulate an API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return Math.random() * 0.5 + 0.5; // Return a random probability between 0.5 and 1
}

// Simulated blockchain interaction
async function createSmartContract(habit, frequency, duration, stake) {
    // Simulate an API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return '0x' + Math.random().toString(16).substr(2, 40); // Return a random Ethereum address
}