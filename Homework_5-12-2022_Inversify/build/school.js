"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.School = exports.Student = void 0;
var inversify_1 = require("inversify");
var types_1 = require("./types");
var Student = /** @class */ (function () {
    function Student() {
    }
    Student.prototype.getName = function (name) {
        return name;
    };
    Student.prototype.getAge = function (age) {
        return age;
    };
    Student = __decorate([
        (0, inversify_1.injectable)()
    ], Student);
    return Student;
}());
exports.Student = Student;
var School = /** @class */ (function () {
    function School(student) {
        this.student = student;
    }
    School.prototype.getStudent = function () {
        console.log(this.student.getName('Hernan') + ' ' + this.student.getAge(30));
    };
    School = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.USER)),
        __metadata("design:paramtypes", [Object])
    ], School);
    return School;
}());
exports.School = School;
