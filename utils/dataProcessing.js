function calculateMean(data) {
    const sum = data.reduce((acc, value) => acc + value, 0);
    return sum / data.length;
}

function calculateStandardDeviation(data, mean) {
    const squareDiffs = data.map(value => Math.pow(value - mean, 2));
    const avgSquareDiff = calculateMean(squareDiffs);
    return Math.sqrt(avgSquareDiff);
}

function calculateZScores(data, mean, stdDev) {
    return data.map(value => (value - mean) / stdDev);
}

function calculateMeanWithoutOutliers(data, zScores, threshold = 2) {
    const filteredData = data.filter((_, index) => Math.abs(zScores[index]) < threshold);
    return calculateMean(filteredData);
}

function removeOutliers(data) {
    const xValues = data.map(point => point.x);
    const yValues = data.map(point => point.y);
    const zValues = data.map(point => point.z);

    const xMean = calculateMean(xValues);
    const yMean = calculateMean(yValues);
    const zMean = calculateMean(zValues);

    const xStdDev = calculateStandardDeviation(xValues, xMean);
    const yStdDev = calculateStandardDeviation(yValues, yMean);
    const zStdDev = calculateStandardDeviation(zValues, zMean);

    const xZScores = calculateZScores(xValues, xMean, xStdDev);
    const yZScores = calculateZScores(yValues, yMean, yStdDev);
    const zZScores = calculateZScores(zValues, zMean, zStdDev);

    const last10XValues = xValues.slice(-10);
    const last10YValues = yValues.slice(-10);
    const last10ZValues = zValues.slice(-10);
    const last10XZScores = xZScores.slice(-10);
    const last10YZScores = yZScores.slice(-10);
    const last10ZZScores = zZScores.slice(-10);

    const xMeanWithoutOutliers = calculateMeanWithoutOutliers(last10XValues, last10XZScores);
    const yMeanWithoutOutliers = calculateMeanWithoutOutliers(last10YValues, last10YZScores);
    const zMeanWithoutOutliers = calculateMeanWithoutOutliers(last10ZValues, last10ZZScores);

    return data.map((point, index) => ({
        x: Math.abs(xZScores[index]) < 2 ? point.x : xMeanWithoutOutliers,
        y: Math.abs(yZScores[index]) < 2 ? point.y : yMeanWithoutOutliers,
        z: Math.abs(zZScores[index]) < 2 ? point.z : zMeanWithoutOutliers,
        time: point.time
    }));
}

module.exports = {
    calculateMean,
    calculateStandardDeviation,
    calculateZScores,
    removeOutliers
};
