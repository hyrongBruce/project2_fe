export const updateObject = (oldobj, newprops) => {
    return {
        ...oldobj,
        ...newprops
    };
};