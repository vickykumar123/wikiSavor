import {GraphQLScalarType, Kind} from "graphql";

const DeliveryDetailsScalar = new GraphQLScalarType({
  name: "DeliveryDetailsInput",
  description: "Custom scalar representing delivery details",
  serialize(value) {
    if (
      typeof value === "object" &&
      value !== null &&
      "name" in value &&
      "addressLine1" in value &&
      "city" in value &&
      "country" in value &&
      "email" in value
    ) {
      return value;
    }
    throw new Error(
      "DeliveryDetails must be an object with name, addressLine1, city, and country fields"
    );
  },
  parseValue(value) {
    if (
      typeof value === "object" &&
      value !== null &&
      "name" in value &&
      "addressLine1" in value &&
      "city" in value &&
      "country" in value
    ) {
      return value;
    }
    throw new Error(
      "DeliveryDetails must be an object with name, addressLine1, city, and country fields"
    );
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.OBJECT) {
      // @ts-ignore
      const {name, addressLine1, city, country} = ast.value;
      return {name, addressLine1, city, country};
    }
    throw new Error(
      "DeliveryDetails must be an object with name, addressLine1, city, and country fields"
    );
  },
});

export default DeliveryDetailsScalar;
