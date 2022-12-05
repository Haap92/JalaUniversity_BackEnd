import { inject, injectable } from 'inversify';
import { SchoolInteface, UserInerface } from './interface';
import { USER } from './types';

@injectable()
class Student implements UserInerface{

  public getName(name:string):string{
    return name;
  }

  public getAge(age:number):number{
    return age;
  }
}

@injectable()
class School implements SchoolInteface {
  public student:UserInerface
  constructor(
    @inject(USER) student:UserInerface
  ){
    this.student = student
  }

  public getStudent():void{
    console.log(this.student.getName('Hernan')+' '+this.student.getAge(30))
  }
}

export { Student, School }