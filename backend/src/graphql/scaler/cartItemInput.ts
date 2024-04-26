import {GraphQLScalarType, Kind} from "graphql";

const CartItemScalar = new GraphQLScalarType({
  name: "CartItem",
  description: "Custom scalar type representing a cart item",
  serialize(value: any): string {
    // The value should be a JavaScript object containing menuItemId, name, and quantity
    // Serialize it to a JSON string
    return JSON.stringify(value);
  },
  parseValue(value: any): any {
    // Parse the JSON string into a JavaScript object
    try {
      return JSON.parse(value);
    } catch (error) {
      throw new Error("Invalid JSON string for CartItem scalar");
    }
  },
  parseLiteral(ast) {
    // Parse the value from inline input in the GraphQL query
    if (ast.kind === Kind.OBJECT) {
      const value: {[key: string]: any} = {};
      ast.fields.forEach((field: any) => {
        value[field.name.value] = field.value.value;
      });
      return this.serialize!(value);
    }
    throw new Error("MenuInput must be specified as an object literal");
  },
});

export default CartItemScalar;
