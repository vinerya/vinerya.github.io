document.addEventListener('DOMContentLoaded', () => {
    const tradeForm = document.getElementById('trade-form');
    
    tradeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const tokenId = document.getElementById('token-id').value;
        const action = document.getElementById('trade-action').value;
        const amount = parseFloat(document.getElementById('trade-amount').value);

        executeTrade(tokenId, action, amount);
    });
});

function executeTrade(tokenId, action, amount) {
    // In a real application, this would involve more complex logic and interaction with a backend
    const tradeResult = simulateTrade(tokenId, action, amount);
    
    if (tradeResult.success) {
        alert(`Trade executed successfully. ${action.toUpperCase()} ${amount} of token ${tokenId} at $${tradeResult.price.toFixed(2)} per token.`);
        updateMarketOverview(amount * tradeResult.price);
    } else {
        alert('Trade failed. Please check the token ID and try again.');
    }
}

function simulateTrade(tokenId, action, amount) {
    // This is a simplified simulation and should be much more complex in a real trading platform
    const success = Math.random() > 0.1; // 90% success rate
    const basePrice = 10; // Base price of $10 per token
    const volatility = 0.2; // 20% volatility

    const randomFactor = 1 + (Math.random() * volatility * 2 - volatility);
    const price = basePrice * randomFactor;

    return {
        success: success,
        price: price
    };
}

function updateMarketOverview(tradeValue) {
    const tradingVolumeElement = document.getElementById('trading-volume');
    const currentVolume = parseFloat(tradingVolumeElement.textContent);
    tradingVolumeElement.textContent = (currentVolume + tradeValue).toFixed(2);
}