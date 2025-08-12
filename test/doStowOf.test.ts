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
    });

    it('should return false because pallet does not exist', () => {
        const input = {
            palletId: "PHINVALIDTHINGY",
            stowedOn: 8675309,
            packageIds: ["PKGREADY"]
        };
        const result = stow_packages(input);
        expect(result).not.toBeNull();
        expect(result.success).toBe(false);
        expect(result.message).toContain("Pallet with ID PHINVALIDTHINGY not found");
    });

    it('should return false because package does not exist', () => {
        const input = {
            palletId: "PAL01",
            stowedOn: 8675309,
            packageIds: ["PKGINVALIDTHINGY"]
        };
        const result = stow_packages(input);
        expect(result).not.toBeNull();
        expect(result.success).toBe(false);
        expect(result.message).toContain("The following packages are not in the database: PKGINVALIDTHINGY");
    });

    it('should return false because package is already on a different pallet', () => {
        const input = {
            palletId: "PAL01",
            stowedOn: 8675309,
            packageIds: ["PKGBADDATA"]
        };
        const result = stow_packages(input);
        expect(result).not.toBeNull();
        expect(result.success).toBe(false);
        expect(result.message).toContain("already stowed on a pallet ");
    });
});
