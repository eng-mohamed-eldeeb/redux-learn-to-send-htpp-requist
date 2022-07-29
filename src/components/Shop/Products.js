import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
const DUNNY = [
  {
    id: "p1",
    price: 6,
    title: "my first book",
    description: "the alkdjfv ;okermof dfkjvnqiejr",
  },
  {
    id: "p2",
    price: 5,
    title: "my second book",
    description: "the alkdjfv ;okermof dfkjvnqiejr",
  }
];
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUNNY.map((p) => <ProductItem
            key={p.id}
            id={p.id}
            title={p.title}
            price={p.price}
            description={p.description}
          />
        )}
      </ul>
    </section>
  );
};

export default Products;
