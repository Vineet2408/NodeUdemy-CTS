const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;

  }

  save() {
    this.id = Math.random().toString();

    getProductsFromFile(products => {
      if(this.id)
      {
        const existingProductIndex = products.findIndex(prod=>prod.id === id);
        const updateProducts = [...products];
        updateProducts[existingProductIndex] = this;
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static FindById(id,cb)
  {
    getProductsFromFile(products=>{
      const product = products.find(p=>p.id==id);
      cb(product);
    });
  }
};
