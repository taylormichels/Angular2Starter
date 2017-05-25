"use strict";
var ExceptionsDB = (function () {
    function ExceptionsDB() {
    }
    ExceptionsDB.prototype.createDb = function () {
        var exceptions = [
            { id: 1, name: 'Item Total', inOrder: 9600, description: 'desc 1' },
            { id: 2, name: 'Item Total', inOrder: 8300, description: 'desc 2' },
            { id: 3, name: 'Mismatch xyz', inOrder: 300, description: 'desc 3' }
        ];
        return { exceptions: exceptions };
    };
    return ExceptionsDB;
}());
exports.ExceptionsDB = ExceptionsDB;
//# sourceMappingURL=exceptions_db.js.map