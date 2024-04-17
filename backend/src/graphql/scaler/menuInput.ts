import {GraphQLScalarType, Kind} from "graphql";
const MenuInputType = new GraphQLScalarType({
  name: "MenuInputs",
  description: "Custom scalar type for menu input",
  serialize(value: any) {
    // Check if the value is a valid object with name and price fields
    if (
      typeof value === "object" &&
      value !== null &&
      "name" in value &&
      "price" in value
    ) {
      return value; // If it's valid, return the object as is
    }
    throw new Error(
      'MenuInput must be an object with "name" and "price" fields'
    );
  },
  parseValue(value: any) {
    // Parse the value from variables
    return this.serialize!(value);
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

export default MenuInputType;
