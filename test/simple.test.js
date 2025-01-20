const assert = require('assert');

describe('Sample Test Suite', () => {
    // Basic truthy test
    it('should return true for true', () => {
        assert.strictEqual(true, true);
    });

    // Test for string equality
    it('should return "Hello, World!" when both strings are equal', () => {
        const greeting = "Hello, World!";
        assert.strictEqual(greeting, "Hello, World!");
    });

    // Test for addition
    it('should correctly add two numbers', () => {
        const result = 2 + 3;
        assert.strictEqual(result, 5);
    });

    // Test for array length
    it('should return the correct length of an array', () => {
        const arr = [1, 2, 3, 4, 5];
        assert.strictEqual(arr.length, 5);
    });

    // Test for object property
    it('should have a name property in the object', () => {
        const obj = { name: "Ganesh", age: 25 };
        assert.strictEqual(obj.name, "Ganesh");
    });

    // Test for value existence
    it('should include the number 3 in the array', () => {
        const arr = [1, 2, 3, 4, 5];
        assert.ok(arr.includes(3));
    });

    // Test for function output
    it('should return the square of a number', () => {
        const square = (x) => x * x;
        assert.strictEqual(square(4), 16);
    });
});
