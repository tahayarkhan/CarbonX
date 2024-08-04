import * as tf from '@tensorflow/tfjs';
import axios from 'axios';

// Create the model
export const createModel = () => {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [3] }));
    model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 3 })); // Output: waterUsage, electricityUsage, carUsage
    model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
    return model;
};

// Train the model
export const trainModel = async (model, inputs, outputs) => {
    const xs = tf.tensor2d(inputs);
    const ys = tf.tensor2d(outputs);
    await model.fit(xs, ys, { epochs: 100 });
    // Save the model after training for future predictions
    await model.save('localstorage://my-model'); // Save model to local storage
    return model; // Return the trained model
};

// Load the model if it exists
export const loadModel = async () => {
    try {
        const model = await tf.loadLayersModel('localstorage://my-model');
        return model; // Return the loaded model
    } catch (error) {
        console.error('Model not found, creating a new one.');
        return createModel(); // Return a new model if loading fails
    }
};

// Fetch data, prepare it, and train the model
export const fetchDataAndTrainModel = async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    };

    // Fetch footprints data
    const { data } = await axios.get('/api/footprints', config);
    
    // Prepare inputs and outputs
    const inputs = [];
    const outputs = [];

    for (let i = 0; i < data.length - 1; i++) {
        const currentFootprint = data[i];
        const nextFootprint = data[i + 1];
        
        // Use current values as inputs
        inputs.push([currentFootprint.waterUsage, currentFootprint.electricityUsage, currentFootprint.carUsage]);
        
        // Use the next values as outputs
        outputs.push([nextFootprint.waterUsage, nextFootprint.electricityUsage, nextFootprint.carUsage]);
    }

    const model = await loadModel(); // Load existing model or create a new one
    await trainModel(model, inputs, outputs); // Train the model
};

// Make a prediction
export const predict = (model, input) => {
    const xs = tf.tensor2d([input]);
    return model.predict(xs).dataSync();
};


// import * as tf from '@tensorflow/tfjs';
// import fs from 'fs';
// import path from 'path';
// import csvParser from 'csv-parser';

// // Create the model
// export const createModel = () => {
//     const model = tf.sequential();
//     model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [1] })); // Only one input feature (AEP_MW)
//     model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
//     model.add(tf.layers.dense({ units: 1 })); // Output: predicted AEP_MW
//     model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
//     return model;
// };

// // Train the model
// export const trainModel = async (model, inputs, outputs) => {
//     const xs = tf.tensor2d(inputs);
//     const ys = tf.tensor2d(outputs);
//     await model.fit(xs, ys, { epochs: 100 });
//     // Save the model after training for future predictions
//     await model.save('localstorage://my-model'); // Save model to local storage
//     return model; // Return the trained model
// };

// // Load the model if it exists
// export const loadModel = async () => {
//     try {
//         const model = await tf.loadLayersModel('localstorage://my-model');
//         return model; // Return the loaded model
//     } catch (error) {
//         console.error('Model not found, creating a new one.');
//         return createModel(); // Return a new model if loading fails
//     }
// };

// // Load data from CSV file
// const loadDataFromCSV = async (filePath) => {
//     const inputs = [];
//     const outputs = [];

//     const data = await new Promise((resolve, reject) => {
//         const rows = [];
//         fs.createReadStream(filePath)
//             .pipe(csvParser())
//             .on('data', (row) => {
//                 rows.push(row);
//             })
//             .on('end', () => {
//                 resolve(rows);
//             })
//             .on('error', (error) => {
//                 reject(error);
//             });
//     });

//     data.forEach((row, index) => {
//         // Parse the AEP_MW values, and handle next values for outputs
//         const currentAEP = parseFloat(row.AEP_MW);
//         inputs.push([currentAEP]); // Current AEP_MW as input

//         // Use the next value for output if it exists
//         if (index < data.length - 1) {
//             const nextAEP = parseFloat(data[index + 1].AEP_MW);
//             outputs.push([nextAEP]); // Next AEP_MW as output
//         }
//     });

//     return { inputs, outputs };
// };

// // Fetch data, prepare it, and train the model
// export const fetchDataAndTrainModel = async () => {
//     // Define the file path to your CSV file
//     const filePath = path.join(__dirname, 'datasets', 'AEP_hourly.csv');

//     const { inputs, outputs } = await loadDataFromCSV(filePath);
    
//     const model = await loadModel(); // Load existing model or create a new one
//     await trainModel(model, inputs, outputs); // Train the model
// };

// // Make a prediction
// export const predict = (model, input) => {
//     const xs = tf.tensor2d([input]);
//     return model.predict(xs).dataSync();
// };
