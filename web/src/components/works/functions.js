/**
 * 
 * @param {works.progress} progresses 
 * @description Groups by Category the Array of progress of works
 * @returns 
 */
export const GroupByCategoryProgress = (progresses) => {
    const data = progresses

    const groupedData = data.reduce((result, item) => {
        const category = item.category.name
        if (!result[category]) {
            result[category] = {
                category: category,
                totalPercentage: 0,
                maxWeight: item.weight,
            }
        } else {
            if (
                item.weight !== null &&
                (result[category].maxWeight === null ||
                    item.weight > result[category].maxWeight)
            ) {
                result[category].maxWeight = item.weight
            }
        }
        result[category].totalPercentage += item.value
        return result
    }, {})

    const groupedArray = Object.values(groupedData)

    let arrayfinal = []
    groupedArray.map((element) => {
        const total = (element.totalPercentage * element.maxWeight) / 100
        const elemento = {
            category: element.category,
            Percentage: element.totalPercentage,
            Weight: element.maxWeight,
            total: total,
        }
        arrayfinal.push(elemento)
    })
    return (arrayfinal);
}

/**
 * 
 * @param {array result of the before function} arrayfinal 
 * @description Calculate the total percentage of the work
 * @returns 
 */
export const totalProcProgress = (arrayfinal) => {
    const totalAcumulado = arrayfinal.reduce((accumulator, element) => {
        return accumulator + element.total;
    }, 0);
    return totalAcumulado;
}