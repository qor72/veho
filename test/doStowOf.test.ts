const { stow_packages } = require('../src/doStowOf')

describe('test stow_packages', () => {
    it('should return false because there are no packages', () => {
        const input = {
            palletId: "PHxx",
            stowedOn: 8675309,
            packageIds: []
        };
        const result = stow_packages(input);
        expect(result).not.toBeNull();
        expect(result.success).toBe(false);
        expect(result.message).toContain("No packages");
    })
})
