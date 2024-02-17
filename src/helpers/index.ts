export const formatearDinero = (cantidad: number): string => {
    return cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
}