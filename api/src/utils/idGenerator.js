import { v4 as uuidv4 } from 'uuid';

export const generateId = (prefix) => { 
    const uuid = uuidv4().replace(/-/g, '').substring(0, 16);
    return `${prefix}_${uuid}`;
};

export const generateRevendaId = () => generateId('rev');
export const generateClienteId = () => generateId('cli');
export const generatePedidoId = () => generateId('ped');

export default {
    generateId,
    generateRevendaId,
    generateClienteId,
    generatePedidoId
};