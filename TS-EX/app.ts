interface student {
  stdId : number,
  stdName : string,
  age : number,
  gender : string,
  course : string,
  completed : boolean
}

function getInfo(id : number) : student {
  return {
    stdId : id,
    stdName : 'Jang',
    age : 20,
    gender : 'male',
    course : 'Ts',
    completed : false
  }
}

console.log(getInfo(5678));