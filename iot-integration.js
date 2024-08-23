// This is a simplified IoT integration for demonstration purposes
// In a real-world scenario, this would interact with actual IoT devices and APIs

class IoTDevice {
    constructor(type, id) {
        this.type = type;
        this.id = id;
        this.data = [];
    }

    generateMockData() {
        // Generate mock data based on device type
        switch (this.type) {
            case 'smartwatch':
            case 'fitness-tracker':
                return {
                    steps: Math.floor(Math.random() * 10000),
                    heartRate: Math.floor(Math.random() * 40) + 60,
                    caloriesBurned: Math.floor(Math.random() * 500)
                };
            case 'smartphone':
                return {
                    screenTime: Math.floor(Math.random() * 240),
                    appUsage: {
                        social: Math.floor(Math.random() * 120),
                        productivity: Math.floor(Math.random() * 120)
                    }
                };
            case 'smart-scale':
                return {
                    weight: 70 + (Math.random() * 10 - 5),
                    bodyFat: 20 + (Math.random() * 4 - 2)
                };
            default:
                return {};
        }
    }

    collectData() {
        const newData = this.generateMockData();
        this.data.push({
            timestamp: new Date().toISOString(),
            ...newData
        });
        console.log(`Data collected from ${this.type} (ID: ${this.id}):`, newData);
    }

    getLatestData() {
        return this.data[this.data.length - 1];
    }
}

const devices = new Map();

function registerDevice(type, id) {
    const device = new IoTDevice(type, id);
    devices.set(id, device);
    console.log(`Device registered: ${type} (ID: ${id})`);
    return device;
}

function getDevice(id) {
    return devices.get(id);
}

function collectDataFromAllDevices() {
    devices.forEach(device => device.collectData());
}

// Simulate data collection every 5 minutes
setInterval(collectDataFromAllDevices, 5 * 60 * 1000);

// Example usage:
// const smartwatch = registerDevice('smartwatch', 'SW001');
// const smartphone = registerDevice('smartphone', 'SP001');
// 
// setInterval(() => {
//     console.log('Smartwatch latest data:', smartwatch.getLatestData());
//     console.log('Smartphone latest data:', smartphone.getLatestData());
// }, 10000);