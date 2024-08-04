// predictiveModel.js
import * as tf from '@tensorflow/tfjs';

export const createModel = () => {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [3] }));
    model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 3 })); // Output: waterUsage, electricityUsage, carUsage
    model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
    return model;
};

export const trainModel = async (model, inputs, outputs) => {
    const xs = tf.tensor2d(inputs);
    const ys = tf.tensor2d(outputs);
    await model.fit(xs, ys, { epochs: 100 });
};

export const predict = (model, input) => {
    const xs = tf.tensor2d([input]);
    return model.predict(xs).dataSync();
};
