const { do_induct_of } = require('../src/doInductOf');

describe('testing do_induct_of', () => {
    it('should return failure for a bad id', () => {
        const input = {
            packageId: 'PKG8675309',
            receivingWarehouseId: 'WH456',
            receivedOn: 1723459200
        };
        const result = do_induct_of(input);
        expect(result).not.toBeNull();
        expect(result.success).toBe(false);
        expect(result.message).toContain(input.packageId);
        expect(result.message).toContain("not found");
    });

    it('should fail on a non READY status', () => {
        const input = {
            packageId: 'PKGINDUCTED',
            receivingWarehouseId: 'WH456',
            receivedOn: 1723459200
        };
        const result = do_induct_of(input);
        expect(result).not.toBeNull();
        expect(result.success).toBe(false);
        expect(result.message).toContain(input.packageId);
        expect(result.message).toContain("not in READY status");
    });
});
