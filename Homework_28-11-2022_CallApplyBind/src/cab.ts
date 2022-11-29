const cafeConLeche = { 
    a: "Cafe",
    b: "Leche"
};
const moccha = { 
    a: "Cafe",
    b: "Cacao"
};

const capuccino = { 
    a: "Cafe",
    b: "Crema"
};

function mixCafe(clientName: string) {
   return clientName + ", this is your coffee: " + this.a + " con " + this.b;
}

const cafeCall = mixCafe.call(cafeConLeche, "Viviana");
console.log(cafeCall);

const cafeApply = mixCafe.apply(moccha, ["Valetina"]);
console.log(cafeApply);

const otroCafe = mixCafe.bind(capuccino, "Valeria");
console.log(otroCafe());
