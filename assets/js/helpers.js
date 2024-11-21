function mergeObjects(target, source) {
    for (let key of Object.keys(source)) {
        if (source.hasOwnProperty(key)) {
            if (typeof source[key] === 'object' && source[key] !== null) {
                if (target[key] === undefined) {
                    target[key] = {};
                }
                mergeObjects(target[key], source[key]);
            } else {
                target[key] = source[key];
            }
        }
    }
    return target;
}

function objectToString(obj, indentLevel = 0) {
    const indent = ' '.repeat(indentLevel * 2);  // Количество пробелов для отступа

    if (typeof obj === 'string') {
        return `"${obj.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
    }

    if (obj === null || typeof obj !== 'object') {
        return String(obj);
    }

    let result = '';

    if (Array.isArray(obj)) {
        result += '[\n';

        for (let i = 0; i < obj.length; i++) {
            result += `${indent}  ${objectToString(obj[i], indentLevel + 1)}`;

            if (i < obj.length - 1) {
                result += ',\n';
            } else {
                result += '\n';
            }
        }

        result += `${indent}]`;
    } else {
        result += '{\n';

        const keys = Object.keys(obj);

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            result += `${indent}  "${key}": ${objectToString(obj[key], indentLevel + 1)}`;

            if (i < keys.length - 1) {
                result += ',\n';
            } else {
                result += '\n';
            }
        }

        result += `${indent}}`;
    }

    return result;
}
